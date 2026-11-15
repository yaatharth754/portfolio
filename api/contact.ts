import type { IncomingMessage, ServerResponse } from 'node:http';

type Contact = { name?: unknown; email?: unknown; subject?: unknown; message?: unknown; company?: unknown };

export default async function handler(req: IncomingMessage & { body?: Contact }, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.statusCode = 405; res.setHeader('Allow', 'POST'); res.end(JSON.stringify({ error: 'Method not allowed' })); return; }
  const body = req.body ?? {};
  if (body.company) { res.statusCode = 200; res.end(JSON.stringify({ ok: true })); return; }
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || subject.length > 160 || !message || message.length > 5000) {
    res.statusCode = 400; res.end(JSON.stringify({ error: 'Please check the form fields.' })); return;
  }
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) { res.statusCode = 503; res.end(JSON.stringify({ error: 'Contact delivery is not configured.' })); return; }
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: `Portfolio: ${subject || 'New message'}`, text: `From: ${name} <${email}>\n\n${message}` }),
    });
    if (!response.ok) throw new Error(`Delivery failed: ${response.status}`);
    res.statusCode = 200; res.end(JSON.stringify({ ok: true }));
  } catch {
    res.statusCode = 502; res.end(JSON.stringify({ error: 'Message could not be delivered.' }));
  }
}
