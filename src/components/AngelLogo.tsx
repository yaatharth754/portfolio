import { useId } from 'react';

type Props = { variant?: 'full' | 'compact' | 'footer' | 'loading'; className?: string; title?: string; decorative?: boolean };

export default function AngelLogo({ variant = 'full', className = '', title = 'Yaatharth Bawankar rotating glass Y with glowing blue halo', decorative = false }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');

  return (
    <svg viewBox="0 0 420 420" className={`angel-logo glass-logo glass-logo--${variant} ${className}`} role={decorative ? 'presentation' : 'img'} aria-hidden={decorative || undefined} aria-label={decorative ? undefined : title}>
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fff" stopOpacity=".84" />
          <stop offset=".22" stopColor="#c6e4ed" stopOpacity=".35" />
          <stop offset=".52" stopColor="#7398aa" stopOpacity=".12" />
          <stop offset=".77" stopColor="#e4f9ff" stopOpacity=".48" />
          <stop offset="1" stopColor="#7ca6bb" stopOpacity=".22" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffffff" />
          <stop offset=".48" stopColor="#9ecbdc" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#708eac" stopOpacity=".65" />
          <stop offset="1" stopColor="#152b4b" stopOpacity=".48" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-100%" y="-250%" width="300%" height="600%"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>

      <g className="glass-logo__halo" fill="none">
        <ellipse cx="210" cy="89" rx="77" ry="24" stroke="#3467b8" strokeWidth="22" opacity=".62" filter={`url(#${id}-blur)`} />
        <ellipse cx="210" cy="89" rx="77" ry="24" stroke="#2957a8" strokeWidth="12" />
        <ellipse cx="210" cy="87" rx="77" ry="24" stroke="#b6d9ff" strokeWidth="3" opacity=".88" />
      </g>

      <g className="glass-logo__y">
        <path d="M145 146 H181 L210 193 L239 146 H275 L231 225 V324 L210 339 L210 214 Z" fill={`url(#${id}-side)`} opacity=".68" transform="translate(9 6)" />
        <path d="M145 146 H181 L210 193 L239 146 H275 L224 226 V326 L210 337 L196 326 V226 Z" fill={`url(#${id}-glass)`} stroke={`url(#${id}-edge)`} strokeWidth="3" strokeLinejoin="round" />
        <path d="M152 151 H178 L209 202 L242 151 H267 M210 208 V329" fill="none" stroke="#ffffff" strokeWidth="2" opacity=".72" strokeLinecap="round" />
        <path d="M196 226 L210 241 L224 226 M210 241 V334" fill="none" stroke="#c6eaff" strokeWidth="1.5" opacity=".55" />
      </g>
    </svg>
  );
}
