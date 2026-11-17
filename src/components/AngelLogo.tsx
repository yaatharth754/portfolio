import { useId } from 'react';

type Props = { variant?: 'full' | 'compact' | 'footer' | 'loading'; className?: string; title?: string; decorative?: boolean };

/* Sculpted mirror-chrome Y: capped arms, wide red V, long stem, dark plinth.
   Geometry is authored on the 750 Ã— 1000 reference grid and displayed through a
   square, centred viewBox so every placement (nav, hero, footer, loader) shares
   one consistent mark. */
const PLATE =
  'M166 328 L342 328 L342 346 C316 348 316 368 330 392 L392 514 L420 392 C434 368 434 348 408 346 L408 328 L584 328 L584 346 C552 348 538 362 522 388 L432 578 L432 766 C432 788 448 796 495 798 L495 816 L275 816 L275 798 C326 796 342 788 342 766 L342 578 L228 388 C212 362 198 348 166 346 Z';

const CORE =
  'M 343 336 L 343 339 L 343 344 L 335 350 L 329 356 L 324 362 L 322 368 L 323 374 L 325 380 L 328 386 L 331 392 L 334 398 L 337 404 L 340 410 L 344 416 L 347 422 L 350 428 L 353 434 L 356 440 L 359 446 L 362 452 L 365 458 L 368 464 L 371 470 L 374 476 L 377 482 L 380 488 L 383 494 L 386 500 L 391 505 L 392 505 L 391 500 L 394 494 L 396 488 L 397 482 L 398 476 L 400 470 L 401 464 L 403 458 L 404 452 L 405 446 L 407 440 L 408 434 L 409 428 L 411 422 L 412 416 L 414 410 L 415 404 L 416 398 L 418 392 L 421 386 L 424 380 L 426 374 L 427 368 L 427 362 L 426 356 L 420 350 L 406 344 L 406 339 L 406 336 C 407 330 398 332 375 334 C 358 336 345 337 343 339 Z';

const RED_LEFT =
  'M183 336 L193 340 L208 350 L229 374 L325 528 L392 530 L387 528 L310 377 L308 367 L310 351 L313 346 L325 336 Z';

const RED_RIGHT =
  'M566 336 L424 336 L429 339 L438 349 L441 359 L441 367 L437 383 L430 396 L395 528 L392 530 L442 528 L514 383 L529 362 L541 350 L549 344 Z';

const STEM_CLIP =
  'M330 512 L440 512 L432 600 L432 766 C432 788 448 796 495 798 L495 818 L275 818 L275 798 C326 796 342 788 342 766 L342 600 Z';

export default function AngelLogo({ variant = 'full', className = '', title = 'Yaatharth Bawankar sculpted mirror-chrome Y crowned by a neon-red halo', decorative = false }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  const ref = (name: string) => `url(#${id}-${name})`;

  return (
    <svg
      viewBox="45 176 660 660"
      className={`angel-logo glass-logo glass-logo--${variant} ${className}`}
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
    >
      <defs>
        <linearGradient id={`${id}-slab`} gradientUnits="userSpaceOnUse" x1="146" y1="500" x2="604" y2="500">
          <stop stopColor="#b8b8b8" />
          <stop offset=".08" stopColor="#a4a4a4" />
          <stop offset=".22" stopColor="#747474" />
          <stop offset=".42" stopColor="#4a4a4a" />
          <stop offset=".58" stopColor="#5c5c5c" />
          <stop offset=".78" stopColor="#383838" />
          <stop offset=".92" stopColor="#8a8a8a" />
          <stop offset="1" stopColor="#5a5a5a" />
        </linearGradient>
        <linearGradient id={`${id}-chrome`} gradientUnits="userSpaceOnUse" x1="200" y1="328" x2="560" y2="816">
          <stop stopColor="#f6f6f6" />
          <stop offset=".1" stopColor="#cfcfcf" />
          <stop offset=".2" stopColor="#6a6a6a" />
          <stop offset=".3" stopColor="#161616" />
          <stop offset=".4" stopColor="#dcdcdc" />
          <stop offset=".47" stopColor="#ffffff" />
          <stop offset=".55" stopColor="#8a8a8a" />
          <stop offset=".66" stopColor="#232323" />
          <stop offset=".78" stopColor="#b8b8b8" />
          <stop offset=".87" stopColor="#ececec" />
          <stop offset=".95" stopColor="#5c5c5c" />
          <stop offset="1" stopColor="#191919" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} gradientUnits="userSpaceOnUse" x1="180" y1="328" x2="560" y2="816">
          <stop stopColor="#ffffff" />
          <stop offset=".08" stopColor="#f0f0f0" />
          <stop offset=".18" stopColor="#c8c8c8" />
          <stop offset=".28" stopColor="#8a8a8a" />
          <stop offset=".38" stopColor="#b0b0b0" />
          <stop offset=".48" stopColor="#e8e8e8" />
          <stop offset=".58" stopColor="#ffffff" />
          <stop offset=".68" stopColor="#d0d0d0" />
          <stop offset=".78" stopColor="#a0a0a0" />
          <stop offset=".86" stopColor="#e0e0e0" />
          <stop offset=".94" stopColor="#f8f8f8" />
          <stop offset="1" stopColor="#b0b0b0" />
        </linearGradient>
        <linearGradient id={`${id}-red`} gradientUnits="userSpaceOnUse" x1="0" y1="336" x2="0" y2="531">
          <stop stopColor="#fc3a4d" />
          <stop offset=".247" stopColor="#e92135" />
          <stop offset=".5" stopColor="#cf0a1f" />
          <stop offset=".56" stopColor="#c80014" />
          <stop offset=".7" stopColor="#970314" />
          <stop offset=".85" stopColor="#65050f" />
          <stop offset="1" stopColor="#33070c" />
        </linearGradient>
        <linearGradient id={`${id}-core-rim`} gradientUnits="userSpaceOnUse" x1="322" y1="400" x2="430" y2="400">
          <stop stopColor="#888888" />
          <stop offset=".35" stopColor="#8c8c8c" />
          <stop offset=".62" stopColor="#a8a8a8" />
          <stop offset=".85" stopColor="#d8d8d8" />
          <stop offset="1" stopColor="#e6e6e6" />
        </linearGradient>
        <linearGradient id={`${id}-core`} gradientUnits="userSpaceOnUse" x1="374" y1="330" x2="378" y2="505">
          <stop stopColor="#151515" />
          <stop offset=".18" stopColor="#202020" />
          <stop offset=".36" stopColor="#383838" />
          <stop offset=".52" stopColor="#414141" />
          <stop offset=".74" stopColor="#4f4f4f" />
          <stop offset="1" stopColor="#3a3a3a" />
        </linearGradient>
        <linearGradient id={`${id}-core-lift`} gradientUnits="userSpaceOnUse" x1="374" y1="330" x2="386" y2="505">
          <stop stopColor="#000000" stopOpacity=".12" />
          <stop offset=".5" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#ffffff" stopOpacity=".08" />
        </linearGradient>
        <linearGradient id={`${id}-stem`} gradientUnits="userSpaceOnUse" x1="385" y1="518" x2="385" y2="800">
          <stop stopColor="#40080e" />
          <stop offset=".025" stopColor="#3e070c" />
          <stop offset=".06" stopColor="#310b0f" />
          <stop offset=".096" stopColor="#3c1a1d" />
          <stop offset=".131" stopColor="#46282c" />
          <stop offset=".167" stopColor="#51373a" />
          <stop offset=".202" stopColor="#5d4548" />
          <stop offset=".238" stopColor="#685456" />
          <stop offset=".273" stopColor="#736365" />
          <stop offset=".309" stopColor="#7e7273" />
          <stop offset=".344" stopColor="#898081" />
          <stop offset=".379" stopColor="#948f8f" />
          <stop offset=".415" stopColor="#9f9d9d" />
          <stop offset=".45" stopColor="#a0a0a0" />
          <stop offset=".486" stopColor="#919191" />
          <stop offset=".521" stopColor="#838383" />
          <stop offset=".557" stopColor="#747474" />
          <stop offset=".592" stopColor="#666666" />
          <stop offset=".628" stopColor="#565656" />
          <stop offset=".663" stopColor="#484848" />
          <stop offset=".699" stopColor="#3a3a3a" />
          <stop offset=".734" stopColor="#2b2b2b" />
          <stop offset=".77" stopColor="#1c1c1c" />
          <stop offset=".805" stopColor="#353535" />
          <stop offset=".84" stopColor="#4f4f4f" />
          <stop offset=".876" stopColor="#686868" />
          <stop offset=".911" stopColor="#818181" />
          <stop offset=".947" stopColor="#9b9b9b" />
          <stop offset="1" stopColor="#b4b4b4" />
        </linearGradient>
        <linearGradient id={`${id}-side-l`} gradientUnits="userSpaceOnUse" x1="0" y1="545" x2="0" y2="800">
          <stop stopColor="#5f5f5f" />
          <stop offset=".4" stopColor="#6d6d6d" />
          <stop offset=".7" stopColor="#7a7a7a" />
          <stop offset="1" stopColor="#909090" />
        </linearGradient>
        <linearGradient id={`${id}-side-r`} gradientUnits="userSpaceOnUse" x1="0" y1="545" x2="0" y2="800">
          <stop stopColor="#707070" />
          <stop offset=".5" stopColor="#7e7e7e" />
          <stop offset="1" stopColor="#8c8c8c" />
        </linearGradient>
        <linearGradient id={`${id}-rail-l`} gradientUnits="userSpaceOnUse" x1="0" y1="545" x2="0" y2="770">
          <stop stopColor="#3a3a3a" />
          <stop offset=".4" stopColor="#3a3a3a" />
          <stop offset=".55" stopColor="#6e6e6e" />
          <stop offset=".68" stopColor="#a8a8a8" />
          <stop offset=".85" stopColor="#c4c4c4" />
          <stop offset=".95" stopColor="#a8a8a8" />
          <stop offset="1" stopColor="#9a9a9a" />
        </linearGradient>
        <linearGradient id={`${id}-rail-r`} gradientUnits="userSpaceOnUse" x1="0" y1="545" x2="0" y2="770">
          <stop stopColor="#6a6a6a" />
          <stop offset=".3" stopColor="#a0a0a0" />
          <stop offset=".42" stopColor="#c8c8c8" />
          <stop offset=".5" stopColor="#d4d4d4" />
          <stop offset=".62" stopColor="#a0a0a0" />
          <stop offset=".72" stopColor="#7a7a7a" />
          <stop offset=".88" stopColor="#444444" />
          <stop offset="1" stopColor="#383838" />
        </linearGradient>
        <linearGradient id={`${id}-apex-grad`} gradientUnits="userSpaceOnUse" x1="0" y1="503" x2="0" y2="534">
          <stop stopColor="#b4b4b4" />
          <stop offset=".45" stopColor="#8e8e8e" />
          <stop offset="1" stopColor="#686868" />
        </linearGradient>
        <linearGradient id={`${id}-base-fade-grad`} gradientUnits="userSpaceOnUse" x1="0" y1="805" x2="0" y2="815">
          <stop stopColor="#000000" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <mask id={`${id}-base-fade`}>
          <rect x="257" y="805" width="246" height="10" fill={ref('base-fade-grad')} />
        </mask>
        <linearGradient id={`${id}-base-glow`} gradientUnits="userSpaceOnUse" x1="257" y1="0" x2="503" y2="0">
          <stop stopColor="#a6a6a6" />
          <stop offset=".14" stopColor="#8c8c8c" />
          <stop offset=".3" stopColor="#5e5e5e" />
          <stop offset=".47" stopColor="#333333" />
          <stop offset=".53" stopColor="#303030" />
          <stop offset=".7" stopColor="#6a6a6a" />
          <stop offset=".86" stopColor="#a8a8a8" />
          <stop offset="1" stopColor="#e2e2e2" />
        </linearGradient>
        <linearGradient id={`${id}-base`} gradientUnits="userSpaceOnUse" x1="255" y1="0" x2="505" y2="0">
          <stop stopColor="#898989" />
          <stop offset=".05" stopColor="#898989" />
          <stop offset=".109" stopColor="#c0c0c0" />
          <stop offset=".173" stopColor="#434343" />
          <stop offset=".238" stopColor="#2a2a2a" />
          <stop offset=".3" stopColor="#212121" />
          <stop offset=".367" stopColor="#191919" />
          <stop offset=".433" stopColor="#111111" />
          <stop offset=".496" stopColor="#0c0c0c" />
          <stop offset=".56" stopColor="#151515" />
          <stop offset=".625" stopColor="#1f1f1f" />
          <stop offset=".687" stopColor="#282828" />
          <stop offset=".754" stopColor="#313131" />
          <stop offset=".819" stopColor="#3a3a3a" />
          <stop offset=".883" stopColor="#575757" />
          <stop offset=".948" stopColor="#e6e6e6" />
          <stop offset="1" stopColor="#e6e6e6" />
        </linearGradient>
        <linearGradient id={`${id}-cap-l`} gradientUnits="userSpaceOnUse" x1="0" y1="328" x2="0" y2="337">
          <stop stopColor="#ffffff" />
          <stop offset=".75" stopColor="#fbfbfb" />
          <stop offset="1" stopColor="#ececec" />
        </linearGradient>
        <linearGradient id={`${id}-cap-r`} gradientUnits="userSpaceOnUse" x1="0" y1="328" x2="0" y2="337">
          <stop stopColor="#ffffff" />
          <stop offset=".6" stopColor="#f2f2f2" />
          <stop offset="1" stopColor="#dedede" />
        </linearGradient>
        <linearGradient id={`${id}-halo-core`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fff6f7" />
          <stop offset=".5" stopColor="#FFE8EC" />
          <stop offset="1" stopColor="#ffe1e6" />
        </linearGradient>
        <linearGradient id={`${id}-shine-stem`} gradientUnits="userSpaceOnUse" x1="362" y1="530" x2="400" y2="790">
          <stop stopColor="#ffffff" stopOpacity="0" />
          <stop offset=".35" stopColor="#ffffff" stopOpacity=".5" />
          <stop offset=".7" stopColor="#ffffff" stopOpacity=".18" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-shine-arm`} gradientUnits="userSpaceOnUse" x1="210" y1="340" x2="330" y2="520">
          <stop stopColor="#ffffff" stopOpacity=".28" />
          <stop offset=".6" stopColor="#ffffff" stopOpacity=".08" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-bloom`} filterUnits="userSpaceOnUse" x="80" y="70" width="590" height="340">
          <feGaussianBlur stdDeviation="26" />
        </filter>
        <filter id={`${id}-neon`} filterUnits="userSpaceOnUse" x="120" y="120" width="510" height="240">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id={`${id}-soft`} filterUnits="userSpaceOnUse" x="100" y="90" width="550" height="310">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <clipPath id={`${id}-front-clip`}>
          <path d={PLATE} />
        </clipPath>
        <clipPath id={`${id}-slab-clip`}>
          <rect x="120" y="346" width="520" height="470" />
        </clipPath>
        <clipPath id={`${id}-core-clip`}>
          <rect x="305" y="344" width="150" height="180" />
        </clipPath>
        <clipPath id={`${id}-stem-clip`}>
          <path d={STEM_CLIP} />
        </clipPath>
      </defs>

      {/* floating neon-red halo */}
      <g className="glass-logo__halo" fill="none">
        <ellipse cx="375" cy="234" rx="210.3" ry="50.4" stroke="#6e3336" strokeWidth="46" opacity=".5" filter={ref('bloom')} />
        <ellipse cx="375" cy="234" rx="210.3" ry="50.4" stroke="#B30012" strokeWidth="30" opacity=".55" filter={ref('bloom')} />
        <ellipse cx="375" cy="234" rx="210.3" ry="50.4" stroke="#FF1A2E" strokeWidth="20" opacity=".45" filter={ref('neon')} />
        <ellipse cx="375" cy="234" rx="210.3" ry="50.4" stroke="#9a6467" strokeWidth="36" opacity=".45" filter={ref('bloom')} />
        <ellipse cx="375" cy="234" rx="210.3" ry="50.4" stroke="#FF1A2E" strokeWidth="12" opacity=".98" />
        <ellipse cx="375" cy="234" rx="210.3" ry="50.4" stroke="#ff4a55" strokeWidth="9" opacity=".9" />
        <ellipse cx="375" cy="234" rx="210.3" ry="50.4" stroke={ref('halo-core')} strokeWidth="7" />
        <ellipse cx="375" cy="233.6" rx="210.3" ry="50.4" stroke="#ffffff" strokeWidth="3" opacity=".95" />
      </g>

      <g className="glass-logo__y" transform="matrix(0.93 0 0 1 26.25 0)">
        {/* extrusion */}
        <g clipPath={`url(#${id}-slab-clip)`}>
          <path d={PLATE} fill="none" stroke={ref('slab')} strokeWidth="26" strokeLinejoin="round" />
        </g>

        {/* front plate + bevelled rim */}
        <path d={PLATE} fill={ref('chrome')} />
        <g clipPath={`url(#${id}-front-clip)`}>
          <path d={PLATE} fill="none" stroke={ref('rim')} strokeWidth="38" strokeLinejoin="round" />
        </g>

        {/* stem face */}
        <g clipPath={`url(#${id}-stem-clip)`}>
          <rect x="315" y="512" width="135" height="308" fill={ref('stem')} />
        </g>

        {/* stem side faces: tapered tops flow out of the arm rails */}
        <path d="M334 544 C326 552 320 564 322 600 L322 762 C322 780 320 788 288 796 L296 796 C320 788 322 780 322 762 L342 600 Z" fill={ref('side-l')} />
        <path d="M438 544 C446 552 450 564 452 600 L452 762 C452 780 468 790 486 796 L478 796 C448 788 434 780 434 762 L432 600 Z" fill={ref('side-r')} />

        {/* stem rails */}
        <g fill="none">
          <path d="M328 526 L342 598 L342 762 C342 780 327 790 298 796" stroke="#b0b0b0" strokeWidth="1.6" opacity=".8" />
          <path d="M337 545 L348 600 L348 760 C348 776 334 786 305 792" stroke={ref('rail-l')} strokeWidth="7" opacity=".95" />
          <path d="M433 550 L421 600 L421 760 C421 776 434 786 464 792" stroke="#1f1f1f" strokeWidth="3.4" opacity=".9" />
          <path d="M430 552 L427 600 L427 758 C427 774 441 784 471 790" stroke={ref('rail-r')} strokeWidth="7" opacity=".95" />
          <path d="M435 552 L432 600 L432 700" stroke="#f0f0f0" strokeWidth="1.4" opacity=".55" />
          <path d="M296 794 C322 788 340 779 342 762" stroke="#ffffff" strokeWidth="2" opacity=".4" />
          <path d="M478 792 C452 788 434 780 432 762" stroke="#ffffff" strokeWidth="1.4" opacity=".26" />
        </g>

        {/* chrome V apex: tapered point flowing out of the rim */}
        <path d="M383 503 L397 503 L391.4 525 Z" fill={ref('apex-grad')} />
        <path d="M383 503 L391.4 525" stroke="#242424" strokeWidth="1.2" opacity=".55" fill="none" />
        <path d="M395 504 L391.7 523" stroke="#d6d6d6" strokeWidth="1" opacity=".4" fill="none" />

        {/* red fields */}
        <path d={RED_LEFT} fill={ref('red')} />
        <path d={RED_RIGHT} fill={ref('red')} />

        {/* chrome rim around the dark core */}
        <g clipPath={`url(#${id}-core-clip)`}>
          <path d={CORE} fill="none" stroke={ref('core-rim')} strokeWidth="16" strokeLinejoin="round" />
        </g>

        {/* dark V core + recessed ceiling */}
        <path d={CORE} fill={ref('core')} strokeLinejoin="round" />
        <path d={CORE} fill={ref('core-lift')} strokeLinejoin="round" />
        <path d="M340 328 L380 328 L378 334 L341 337 Z" fill="#150b0b" />
        <path d="M343 337 L368 335 L358 348 L345 344 Z" fill="#120a0a" filter={ref('soft')} />
        <path d="M344 338 L362 336 L355 345 L346 343 Z" fill="#0e0708" />

        {/* plinth */}
        <path d="M257 798 L503 798 L503 805 L257 805 Z" fill="#c2c2c2" />
        <path d="M257 805 L503 805 L503 815 L257 815 Z" fill={ref('base')} />
        <path
          d="M257 805 L503 805 L503 815 L257 815 Z"
          fill={ref('base-glow')}
          mask={`url(#${id}-base-fade)`}
        />
        <path d="M257 815 L503 815 L503 817 L257 817 Z" fill="#a6a6a6" />
        <g strokeLinecap="butt">
          <path d="M257 798 L503 798" stroke="#ffffff" strokeWidth="1.4" opacity=".9" />
          <path d="M257 805 L503 805" stroke="#101010" strokeWidth="1.4" opacity=".85" />
          <path d="M320 800 L320 803" stroke="#141414" strokeWidth="1.4" opacity=".6" />
          <path d="M450 800 L450 803" stroke="#141414" strokeWidth="1.4" opacity=".55" />
          <path d="M257 811 L503 811" stroke="#000000" strokeWidth=".8" opacity=".35" />
          <path d="M257 817 L503 817" stroke="#000000" strokeWidth="1" opacity=".8" />
          <path d="M257 816 L503 816" stroke="#c8c8c8" strokeWidth="1" opacity=".55" />
        </g>

        {/* angled top caps */}
        <path d="M166 328 L342 328 L342 335.5 L166 337.5 Z" fill={ref('cap-l')} />
        <path d="M408 328 L584 328 L584 337.5 L408 335.5 Z" fill={ref('cap-r')} />
        <path d="M166 328 L342 328" stroke="#ffffff" strokeWidth="1.6" />
        <path d="M408 328 L584 328" stroke="#ffffff" strokeWidth="1.6" />
        <path d="M166 337.5 L342 335.5" stroke="#3a0c12" strokeWidth="1.8" opacity=".85" />
        <path d="M408 335.5 L584 337.5" stroke="#3a0c12" strokeWidth="1.8" opacity=".85" />

        {/* serif bevels at the neck of the V */}
        <path d="M336 328 L346 328 L346 344 L336 346 Z" fill="#b0b0b0" />
        <path d="M336 328 L338 328 L338 345 L336 346 Z" fill="#dcdcdc" opacity=".85" />
        <path d="M406 328 L416 328 L416 345 L406 343 Z" fill="#a8a8a8" />
        <path d="M406 328 L408.5 328 L408.5 342 L406 343 Z" fill="#e8e8e8" opacity=".9" />

        {/* cap end blocks */}
        <path d="M146 328 L166 328 L166 346 L146 346 Z" fill="#b8b8b8" />
        <path d="M146 328 L166 328" stroke="#ffffff" strokeWidth="1.6" opacity=".9" />
        <path d="M146 346 L166 346" stroke="#121212" strokeWidth="2" opacity=".8" />
        <path d="M146 328 L146 346" stroke="#7a7a7a" strokeWidth="1.2" opacity=".8" />
        <path d="M584 328 L604 328 L604 346 L584 346 Z" fill="#323232" />
        <path d="M584 328 L604 328" stroke="#dedede" strokeWidth="1.4" opacity=".8" />
        <path d="M584 346 L604 346" stroke="#050505" strokeWidth="2" opacity=".85" />
        <path d="M604 328 L604 346" stroke="#6a6a6a" strokeWidth="1.1" opacity=".7" />

        {/* inner serif curves */}
        <path d="M318 336 C320 356 326 378 336 396" fill="none" stroke="#ffffff" strokeWidth="1.6" opacity=".5" />
        <path d="M432 336 C430 356 424 378 414 396" fill="none" stroke="#ffffff" strokeWidth="1.4" opacity=".45" />

        {/* silhouette definition */}
        <path
          d="M166 328 L342 328 M408 328 L584 328 M146 346 C160 347 176 350 188 356 M584 346 C568 347 552 351 540 358 M166 346 C198 348 212 362 228 388 L342 578 L342 766 C342 788 326 796 275 798 M604 346 C586 347 570 350 558 356 M584 346 C552 348 538 362 522 388 L432 578 L432 766 C432 788 448 796 495 798"
          fill="none"
          stroke="#f2f2f2"
          strokeWidth="1.2"
          opacity=".45"
        />

        {/* animated metal glint */}
        <g clipPath={`url(#${id}-front-clip)`}>
          <g className="glass-logo__shine">
            <path d="M362 530 L398 530 L398 792 L362 792 Z" fill={ref('shine-stem')} />
            <path d="M206 344 L236 366 L326 508 L326 528 L304 512 L212 366 Z" fill={ref('shine-arm')} />
          </g>
        </g>
      </g>
    </svg>
  );
}
