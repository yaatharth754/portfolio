type ProjectArtworkProps = {
  art: 'face' | 'pose' | 'docs';
  id: string;
};

export default function ProjectArtwork({ art, id }: ProjectArtworkProps) {
  const patternId = `art-${id}-grid`;

  return (
    <div className={`project-art project-art--${art}`} aria-hidden="true">
      <svg viewBox="0 0 560 300" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.16)" />
          </pattern>
        </defs>
        <rect width="560" height="300" fill={`url(#${patternId})`} opacity="0.6" />
        {art === 'face' ? <FaceArt /> : null}
        {art === 'pose' ? <PoseArt /> : null}
        {art === 'docs' ? <DocsArt /> : null}
        <text x="28" y="278" className="project-art__label">
          {art === 'face' ? 'IDENTITY / FACE + VOICE' : art === 'pose' ? 'POSE / 30 FPS' : 'RETRIEVE / GENERATE'}
        </text>
        <text x="532" y="278" textAnchor="end" className="project-art__label">
          {art === 'face' ? '98% ACC.' : art === 'pose' ? 'REAL-TIME' : 'RAG / 01'}
        </text>
      </svg>
    </div>
  );
}

function FaceArt() {
  return (
    <g>
      <ellipse cx="280" cy="140" rx="76" ry="98" fill="none" stroke="rgba(255,255,255,0.36)" strokeWidth="1" />
      <ellipse cx="280" cy="140" rx="58" ry="78" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="0.7" strokeDasharray="2 5" />
      <path d="M280 42 V238 M204 140 H356" stroke="rgba(255,255,255,0.13)" strokeWidth="0.7" strokeDasharray="2 6" />
      <path d="M280 42 C260 96 258 186 280 238 C302 186 300 96 280 42" fill="none" stroke="rgba(244,166,193,0.7)" strokeWidth="0.9" />
      <g fill="#36c96a">
        <circle cx="250" cy="112" r="2.2" />
        <circle cx="310" cy="112" r="2.2" />
        <circle cx="280" cy="138" r="1.6" />
        <circle cx="252" cy="172" r="1.6" />
        <circle cx="308" cy="172" r="1.6" />
      </g>
      <g stroke="rgba(255,255,255,0.55)" strokeWidth="0.8" fill="none">
        <path d="M230 96 L210 78 M330 96 L350 78 M242 134 L210 128 M318 134 L350 128 M260 188 L232 204 M300 188 L328 204" />
      </g>
      <g stroke="rgba(255,255,255,0.14)" strokeWidth="0.8">
        {[0, 1, 2, 3, 4, 5].map((row) =>
          [0, 1, 2, 3, 4, 5, 6].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={48 + col * 12}
              y={68 + row * 12}
              width="3"
              height="3"
              fill={row === 2 && col === 2 ? '#36c96a' : 'rgba(255,255,255,0.2)'}
              stroke="none"
            />
          ))
        )}
      </g>
      <g stroke="rgba(255,255,255,0.14)" strokeWidth="0.8" fill="none">
        {[0, 1, 2, 3, 4, 5].map((row) =>
          [0, 1, 2, 3, 4, 5, 6].map((col) => (
            <rect
              key={`r-${row}-${col}`}
              x={416 + col * 12}
              y={68 + row * 12}
              width="3"
              height="3"
              fill={row === 4 && col === 5 ? '#36c96a' : 'rgba(255,255,255,0.2)'}
              stroke="none"
            />
          ))
        )}
      </g>
      <rect x="188" y="26" width="184" height="248" rx="4" fill="none" stroke="rgba(244,166,193,0.32)" strokeWidth="0.8" strokeDasharray="14 5 2 5" />
      <line x1="52" y1="76" x2="508" y2="76" className="project-art__scan" stroke="#36c96a" strokeWidth="1" opacity="0.5" />
      <circle cx="188" cy="26" r="3" fill="#36c96a" />
      <circle cx="372" cy="274" r="3" fill="#36c96a" />
      <text x="188" y="20" className="project-art__label">01 / FACE MATCH</text>
    </g>
  );
}

function PoseArt() {
  return (
    <g>
      <circle cx="280" cy="66" r="19" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
      <g stroke="rgba(255,255,255,0.66)" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path d="M280 86 V162" />
        <path d="M280 104 L236 136 L218 182" />
        <path d="M280 104 L327 132 L347 176" />
        <path d="M280 162 L248 216 L238 264" />
        <path d="M280 162 L314 212 L336 252" />
      </g>
      <g fill="#36c96a">
        <circle cx="280" cy="104" r="3.2" />
        <circle cx="280" cy="162" r="3.2" />
        <circle cx="248" cy="216" r="2.6" />
        <circle cx="314" cy="212" r="2.6" />
        <circle cx="238" cy="264" r="2.4" />
        <circle cx="336" cy="252" r="2.4" />
      </g>
      <g stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" fill="none">
        <circle cx="280" cy="152" r="112" strokeDasharray="2 8" />
        <circle cx="280" cy="152" r="136" strokeDasharray="1 10" />
        <path d="M92 152 A188 188 0 0 1 468 152" />
      </g>
      <g stroke="rgba(244,166,193,0.8)" strokeWidth="1" fill="none">
        <path d="M82 104 Q72 86 82 70" />
        <path d="M96 116 Q82 88 96 60" opacity="0.5" />
        <path d="M478 104 Q488 86 478 70" />
        <path d="M464 116 Q478 88 464 60" opacity="0.5" />
      </g>
      <g stroke="rgba(255,255,255,0.16)" strokeWidth="0.8" fill="none">
        <path d="M62 248 H160" />
        <path d="M62 248 V210" />
        <path d="M400 248 H498" />
        <path d="M498 248 V210" />
      </g>
      <g fill="rgba(255,255,255,0.38)">
        {[18, 30, 22, 34, 26].map((height, index) => (
          <rect key={height + index} x={416 + index * 12} y={238 - height} width="6" height={height} rx="1" />
        ))}
      </g>
      <text x="64" y="196" className="project-art__label">FORM / FEEDBACK</text>
    </g>
  );
}

function DocsArt() {
  return (
    <g>
      <g transform="translate(96 48)">
        <rect width="142" height="182" rx="4" fill="rgba(16,28,54,0.6)" stroke="rgba(255,255,255,0.15)" />
        <rect x="18" y="22" width="72" height="5" rx="2" fill="rgba(255,255,255,0.32)" />
        <rect x="18" y="42" width="106" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
        <rect x="18" y="52" width="92" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
        <rect x="18" y="62" width="102" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
        <rect x="18" y="82" width="64" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
        <rect x="18" y="92" width="100" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
        <rect x="18" y="102" width="74" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
        <rect x="18" y="124" width="98" height="28" rx="2" fill="rgba(244,166,193,0.09)" stroke="rgba(244,166,193,0.4)" />
      </g>
      <g transform="translate(208 74)">
        <rect width="142" height="182" rx="4" fill="#162441" stroke="rgba(255,255,255,0.26)" />
        <rect x="18" y="22" width="72" height="5" rx="2" fill="rgba(255,255,255,0.48)" />
        <rect x="18" y="42" width="106" height="3" rx="1.5" fill="rgba(255,255,255,0.14)" />
        <rect x="18" y="52" width="92" height="3" rx="1.5" fill="rgba(255,255,255,0.14)" />
        <rect x="18" y="62" width="102" height="3" rx="1.5" fill="rgba(255,255,255,0.14)" />
        <rect x="18" y="82" width="64" height="3" rx="1.5" fill="rgba(244,166,193,0.75)" />
        <rect x="18" y="92" width="100" height="3" rx="1.5" fill="rgba(255,255,255,0.14)" />
        <rect x="18" y="102" width="74" height="3" rx="1.5" fill="rgba(255,255,255,0.14)" />
        <rect x="18" y="124" width="98" height="28" rx="2" fill="rgba(244,166,193,0.1)" stroke="rgba(244,166,193,0.5)" />
      </g>
      <g stroke="rgba(244,166,193,0.55)" strokeWidth="0.9" fill="none" strokeDasharray="3 5">
        <path d="M354 166 C394 166 398 98 444 98" />
        <path d="M354 166 C398 166 408 218 452 218" />
        <path d="M350 166 C396 166 392 262 432 262" opacity="0.5" />
      </g>
      <g>
        <circle cx="444" cy="98" r="3.4" fill="#36c96a" />
        <circle cx="452" cy="218" r="2.7" fill="#ffffff" opacity="0.8" />
        <circle cx="432" cy="262" r="2.2" fill="#ffffff" opacity="0.55" />
      </g>
      <g className="project-art__nodes" stroke="rgba(255,255,255,0.26)" strokeWidth="0.8" fill="none">
        <circle cx="444" cy="98" r="16" />
        <circle cx="452" cy="218" r="13" />
        <circle cx="432" cy="262" r="10" />
      </g>
      <text x="353" y="140" className="project-art__label">CONTEXT WINDOW</text>
      <text x="353" y="304" className="project-art__label">TOP-K / 04</text>
    </g>
  );
}
