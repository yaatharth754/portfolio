import { useId } from 'react';

type Props = { variant?: 'full' | 'compact' | 'footer' | 'loading'; className?: string; title?: string; decorative?: boolean };

export default function AngelLogo({ variant = 'full', className = '', title = 'Yaatharth Bawankar glass winged Y logo', decorative = false }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const wing = 'M198 230 C164 185 105 159 42 160 C76 199 124 233 179 251 C133 229 87 229 55 241 C92 276 145 284 197 261 Z';
  const feather = 'M196 240 C153 213 105 188 61 174 M187 246 C139 234 98 242 69 248 M186 253 C142 264 110 264 82 255';
  return <svg viewBox="0 0 420 420" className={`angel-logo glass-logo glass-logo--${variant} ${className}`} role={decorative ? 'presentation' : 'img'} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : title}>
    <defs>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".95"/><stop offset=".28" stopColor="#c8f6ed" stopOpacity=".6"/><stop offset=".55" stopColor="#738b9c" stopOpacity=".28"/><stop offset=".78" stopColor="#edffff" stopOpacity=".8"/><stop offset="1" stopColor="#6d8598" stopOpacity=".4"/></linearGradient>
      <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset=".5" stopColor="#9aff65"/><stop offset="1" stopColor="#a9d9ee"/></linearGradient>
      <filter id={`${id}-glow`} x="-80%" y="-200%" width="260%" height="500%"><feGaussianBlur stdDeviation="5"/></filter>
    </defs>
    <ellipse cx="210" cy="101" rx="69" ry="19" fill="none" stroke="#183b88" strokeWidth="12" opacity=".55" filter={`url(#${id}-glow)`}/>
    <ellipse cx="210" cy="101" rx="69" ry="19" fill="none" stroke="#244c9a" strokeWidth="6"/>
    <ellipse cx="210" cy="99" rx="69" ry="19" fill="none" stroke="#a4caff" strokeWidth="1.5" opacity=".9"/>
    <g fill={`url(#${id}-glass)`} stroke={`url(#${id}-edge)`} strokeWidth="1.5" strokeLinejoin="round">
      <path d={wing}/><path d={wing} transform="translate(420 0) scale(-1 1)"/>
      <path d="M160 150 H187 L210 188 L233 150 H260 L224 221 V322 L210 334 L196 322 V221 Z"/>
    </g>
    <g fill="none" stroke="#edffff" strokeWidth="1.3" opacity=".7"><path d={feather}/><path d={feather} transform="translate(420 0) scale(-1 1)"/><path d="M170 156 L209 210 L210 316 M250 156 L217 210"/></g>
    <path d="M196 221 L210 242 L210 324" fill="none" stroke="#fff" strokeWidth="2" opacity=".5"/>
  </svg>;
}
