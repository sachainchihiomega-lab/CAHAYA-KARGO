import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'icon-only' | 'white';
  customLogoUrl?: string;
}

export const CahayaKargoLogo: React.FC<LogoProps> = ({
  className = 'h-10',
  variant = 'full',
  customLogoUrl
}) => {
  if (customLogoUrl) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img 
          src={customLogoUrl} 
          alt="Cahaya Kargo Logo" 
          className="h-full object-contain max-h-12" 
        />
        {variant !== 'icon-only' && (
          <div className="flex flex-col">
            <span className={`font-black tracking-tight leading-none text-xl ${variant === 'white' ? 'text-white' : 'text-slate-900'}`}>
              MITRA <span className="text-amber-500">KARGO</span>
            </span>
            <span className={`text-[9px] tracking-widest font-semibold uppercase mt-0.5 ${variant === 'white' ? 'text-slate-300' : 'text-slate-500'}`}>
              PT Samudra Lintas Artha
            </span>
          </div>
        )}
      </div>
    );
  }

  // Ultra-crisp vector SVG logo
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Dynamic Emblem: Radiant Starburst + Fast Cargo Box Cube */}
      <div className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="cahayaGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <linearGradient id="cahayaGradNavy" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="cahayaGradGold" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Hexagonal Cargo Shield Base */}
          <polygon
            points="50,4 92,26 92,74 50,96 8,74 8,26"
            fill="url(#cahayaGradNavy)"
            stroke={variant === 'white' ? '#FFFFFF' : '#0F172A'}
            strokeWidth="2.5"
          />

          {/* Speed Chevrons / Ray of Light (Cahaya) */}
          <path
            d="M50 12 L84 30 L50 48 L16 30 Z"
            fill="url(#cahayaGradPrimary)"
            opacity="0.95"
          />
          <path
            d="M50 48 L84 30 L84 68 L50 86 Z"
            fill="url(#cahayaGradGold)"
          />
          <path
            d="M50 48 L16 30 L16 68 L50 86 Z"
            fill="#D97706"
          />

          {/* Dynamic Cargo Forward Arrow / Lighting Bolt in negative space */}
          <polygon
            points="50,22 64,30 54,30 60,42 42,34 50,34"
            fill="#FFFFFF"
            className="filter drop-shadow"
          />
          
          {/* Speed line overlay */}
          <line x1="28" y1="52" x2="44" y2="60" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <line x1="28" y1="60" x2="38" y2="65" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      </div>

      {variant !== 'icon-only' && (
        <div className="flex flex-col text-left">
          <div className="flex items-center tracking-tight font-black leading-none text-xl sm:text-2xl">
            <span className={variant === 'white' ? 'text-white' : 'text-slate-900'}>
              MITRA
            </span>
            <span className="text-amber-500 ml-1.5 font-extrabold tracking-normal">
              KARGO
            </span>
          </div>
          <span className={`text-[9px] sm:text-[10px] font-bold tracking-[0.16em] uppercase mt-1 ${variant === 'white' ? 'text-slate-300' : 'text-slate-500'}`}>
            PT Samudra Lintas Artha
          </span>
        </div>
      )}
    </div>
  );
};
export const MitraKargoLogo = CahayaKargoLogo;
export default CahayaKargoLogo;
