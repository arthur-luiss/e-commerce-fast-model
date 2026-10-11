import { Link } from 'react-router-dom';
import { brand } from '../config/brand';

// Botão de costura com linha em X. Usa a cor do texto (currentColor),
// então se adapta ao cabeçalho transparente (branco) e ao branco (escuro).
export function LogoMark({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <defs>
        <mask id="trama-button">
          <rect width="36" height="36" fill="#fff" />
          <circle cx="18" cy="18" r="11" fill="none" stroke="#000" strokeWidth="1.6" />
          <path
            d="M14.5 14.5 21.5 21.5M21.5 14.5 14.5 21.5"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="14.5" cy="14.5" r="2.1" fill="#000" />
          <circle cx="21.5" cy="14.5" r="2.1" fill="#000" />
          <circle cx="14.5" cy="21.5" r="2.1" fill="#000" />
          <circle cx="21.5" cy="21.5" r="2.1" fill="#000" />
        </mask>
      </defs>
      <circle cx="18" cy="18" r="17" fill="currentColor" mask="url(#trama-button)" />
    </svg>
  );
}

export default function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label={`${brand.name} - página inicial`}
      className={`flex items-center gap-2 ${className}`}
    >
      <LogoMark />
      <span className="hidden text-2xl font-semibold lowercase tracking-tight sm:inline">
        {brand.name}
      </span>
    </Link>
  );
}