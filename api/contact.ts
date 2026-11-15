import { createHash } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';

type ContactBody = { name?: unknown; email?: unknown; subject?: unknown; message?: unknown; company?: unknown };
type Request = IncomingMessage & { body?: ContactBody };
type LimitEntry = { count: number; resetAt: number };

const WINDOW_MS = 15 * 60 * 1000;
const MAX_MESSAGES = 5;
const DUPLICATE_MS = 60 * 1000;
const localLimits = new Map<string, LimitEntry>();
const localDuplicates = new Map<string, number>();
const rateScript = [
  "local n = redis.call('INCR', KEYS[1])",
  "if n == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end",
  "if n > tonumber(ARGV[2]) then return 0 end",
  "local fresh = redis.call('SET', KEYS[2], '1', 'EX', ARGV[3], 'NX')",
  "if not fresh then return -1 end",
  'return n',
].join('\n');

function send(res: ServerResponse, status: number, value: object) {
  res.statusCode = status;
  res.end(JSON.stringify(value));
}

function clean(value: unknown, max: number, multiline = false): string {
  if (typeof value !== 'string') return '';
  const normalized = value.normalize('NFKC').replace(/\r\n?/g, '\n');
  const withoutControls = normalized.replace(multiline ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g : /[\u0000-\u001f\u007f]/g, '');
  return withoutControls.trim().slice(0, max + 1);
}

function hash(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

function pruneLocal(now: number) {
  if (localLimits.size < 1000 && localDuplicates.size < 1000) return;
  for (const [key, entry] of localLimits) if (entry.resetAt <= now) localLimits.delete(key);
  for (const [key, expires] of localDuplicates) if (expires <= now) localDuplicates.delete(key);
  while (localLimits.size > 5000) localLimits.delete(localLimits.keys().next().value!);
  while (localDuplicates.size > 5000) localDuplicates.delete(localDuplicates.keys().next().value!);
}

async function limit(ip: string, fingerprint: string): Promise<{ status: 'allow' | 'limited' | 'duplicate'; duplicateKey: string }> {
  const identity = hash(ip);
  const windowKey = 'portfolio:contact:rate:' + identity;
  const duplicateKey = 'portfolio:contact:duplicate:' + fingerprint;
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (redisUrl && redisToken) {
    const response = await fetch(redisUrl.replace(/\/$/, ''), {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + redisToken, 'Content-Type': 'application/json' },
      body: JSON.stringify(['EVAL', rateScript, 2, windowKey, duplicateKey, WINDOW_MS / 1000, MAX_MESSAGES, DUPLICATE_MS / 1000]),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error('Rate limiter unavailable');
    const payload: { result?: number; error?: string } = await response.json();
    if (payload.error || typeof payload.result !== 'number') throw new Error('Rate limiter unavailable');
    return { status: payload.result === 0 ? 'limited' : payload.result === -1 ? 'duplicate' : 'allow', duplicateKey };
  }

  // Local fallback keeps development usable; configure Upstash for a shared limit on serverless instances.
  const now = Date.now();
  pruneLocal(now);
  const current = localLimits.get(windowKey);
  const entry = current && current.resetAt > now ? current : { count: 0, resetAt: now + WINDOW_MS };
  entry.count += 1;
  localLimits.set(windowKey, entry);
  if (entry.count > MAX_MESSAGES) return { status: 'limited', duplicateKey };
  if ((localDuplicates.get(duplicateKey) ?? 0) > now) return { status: 'duplicate', duplicateKey };
  localDuplicates.set(duplicateKey, now + DUPLICATE_MS);
  return { status: 'allow', duplicateKey };
}

async function releaseDuplicate(key: string) {
  localDuplicates.delete(key);
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) return;
  try {
    await fetch(redisUrl.replace(/\/$/, ''), {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + redisToken, 'Content-Type': 'application/json' },
      body: JSON.stringify(['DEL', key]),
      signal: AbortSignal.timeout(3000),
    });
  } catch {
    // The key expires automatically.
  }
}

export default async function handler(req: Request, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    send(res, 405, { error: 'Method not allowed.' });
    return;
  }
  const contentType = req.headers?.['content-type'];
  if (contentType && !contentType.startsWith('application/json')) {
    send(res, 415, { error: 'Please send JSON.' });
    return;
  }
  if (Number(req.headers?.['content-length'] ?? 0) > 12_000) {
    send(res, 413, { error: 'Message is too large.' });
    return;
  }
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  if (body.company) {
    send(res, 200, { ok: true });
    return;
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 254).toLowerCase();
  const subject = clean(body.subject, 160);
  const message = clean(body.message, 5000, true);
  if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !subject || subject.length > 160 || !message || message.length > 5000) {
    send(res, 400, { error: 'Please check the form fields and try again.' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    send(res, 503, { error: 'Contact delivery is temporarily unavailable.' });
    return;
  }

  const ip = (req.headers?.['x-real-ip'] || req.headers?.['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').toString().split(',')[0].trim();
  const fingerprint = hash(email + '\n' + subject + '\n' + message);
  let duplicateKey = '';
  try {
    const decision = await limit(ip, fingerprint);
    duplicateKey = decision.duplicateKey;
    if (decision.status === 'limited') {
      res.setHeader('Retry-After', String(WINDOW_MS / 1000));
      send(res, 429, { error: 'Too many messages. Please try again later.' });
      return;
    }
    if (decision.status === 'duplicate') {
      send(res, 409, { error: 'This message was already submitted. Please wait before trying again.' });
      return;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: 'Portfolio: ' + subject,
        text: 'From: ' + name + ' <' + email + '>\n\n' + message,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error('Email provider rejected the message');
    const result: { id?: string } = await response.json();
    if (!result.id) throw new Error('Email provider did not confirm acceptance');
    send(res, 200, { ok: true });
  } catch {
    if (duplicateKey) await releaseDuplicate(duplicateKey);
    send(res, 502, { error: 'Message could not be delivered right now. Please try again or email me directly.' });
  }
}
