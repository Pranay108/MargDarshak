import React from 'react';

// Official State Emblem of India (National Emblem PNG)
export const AshokaEmblem = ({ className = "h-10 w-auto" }) => {
  return (
    <img
      src="/images/national-emblem.png"
      alt="State Emblem of India"
      className={`shrink-0 object-contain ${className}`}
    />
  );
};

// Official MargDarshak Compass & Document Emblem Icon
export const MargDarshakIcon = ({ className = "h-8 w-auto" }) => {
  return (
    <svg viewBox="0 0 120 105" className={`shrink-0 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mCompassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0070E0" />
          <stop offset="100%" stopColor="#0A2342" />
        </linearGradient>
      </defs>
      {/* Top Pin */}
      <polygon points="45,2 49,9 41,9" fill="#0A2342" />
      {/* Outer Ring */}
      <circle cx="45" cy="48" r="36" stroke="url(#mCompassGrad)" strokeWidth="7.5" fill="none" />
      {/* Document Stack on Right */}
      <path d="M 66 26 L 94 38 L 94 86 L 66 74 Z" fill="#0B2545" opacity="0.15" />
      <path d="M 66 26 L 94 38 L 94 86 L 66 74 Z" stroke="#0070E0" strokeWidth="3" fill="none" strokeLinejoin="round" />
      <path d="M 76 34 L 104 44 L 104 92 L 76 82 Z" fill="#FFFFFF" stroke="#0055B3" strokeWidth="3.2" strokeLinejoin="round" />
      <line x1="83" y1="53" x2="98" y2="59" stroke="#0070E0" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="83" y1="62" x2="98" y2="68" stroke="#0070E0" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="83" y1="71" x2="98" y2="77" stroke="#0070E0" strokeWidth="2.2" strokeLinecap="round" />
      {/* Center Direction Pointer Arrow */}
      <polygon points="45,15 26,68 45,59" fill="#0A2342" />
      <polygon points="45,15 45,59 64,68" fill="#0070E0" />
    </svg>
  );
};

// Full MargDarshak Logo with Icon, Wordmark & Tagline
export const MargDarshakFullLogo = ({ className = "h-16 w-auto" }) => {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <MargDarshakIcon className="h-14 w-auto mb-1" />
      <div className="flex items-baseline font-black tracking-tight text-2xl font-sans leading-none">
        <span className="text-[#0A2342]">Marg</span>
        <span className="text-[#0070E0]">Darshak</span>
      </div>
      <span className="text-[10px] font-semibold text-slate-600 mt-1 tracking-wide uppercase">
        Right Standards. Better Procurement.
      </span>
      <div className="w-8 h-0.5 bg-[#0070E0] rounded-full mt-1"></div>
    </div>
  );
};

// Compact MargDarshak Brand Lockup (for Navbar & Sidebar)
export const MargDarshakBrand = ({ isDark = false }) => {
  return (
    <div className="flex items-center select-none space-x-2.5">
      <div className="p-1 bg-white rounded-md shadow-2xs">
        <MargDarshakIcon className="h-8 w-auto" />
      </div>
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline space-x-1.5">
          <span className="text-base sm:text-lg font-black tracking-tight font-sans">
            <span className={isDark ? "text-white" : "text-[#0A2342]"}>Marg</span>
            <span className="text-[#0070E0]">Darshak</span>
          </span>
          <span className={`text-[10px] font-semibold ${isDark ? "text-blue-300" : "text-[#006699]"}`}>
            मार्गदर्शक
          </span>
        </div>
        <span className={`text-[9.5px] font-medium tracking-tight mt-0.5 ${isDark ? "text-slate-300" : "text-slate-500"}`}>
          Right Standards. Better Procurement.
        </span>
      </div>
    </div>
  );
};

// Official BIS Logo with Red Motto "मानक: पथप्रदर्शक:"
export const BisOfficialLogo = ({ className = "h-8" }) => {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 120 85"
        className="h-7 w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 60 4 L 114 74 L 88 74 L 60 38 L 32 74 L 6 74 Z"
          fill="#00529B"
        />
        <circle cx="60" cy="42" r="10.5" fill="#E11D48" />
        <path
          d="M 6 78 L 114 78 L 114 83 L 6 83 Z"
          fill="#00529B"
        />
      </svg>
      <span className="text-[7.5px] font-bold text-[#E11D48] tracking-wider -mt-0.5 font-sans">
        मानकः पथप्रदर्शकः
      </span>
    </div>
  );
};

// Official ISI Mark Badge SVG
export const IsiMarkLogo = ({ className = "h-8 w-auto" }) => {
  return (
    <svg viewBox="0 0 100 70" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="96" height="66" rx="4" stroke="#0B2545" strokeWidth="3" />
      <text x="50" y="26" textAnchor="middle" fill="#0B2545" fontSize="14" fontWeight="bold" fontFamily="sans-serif">IS:XXXX</text>
      <path d="M 30 35 L 70 35 M 50 35 L 50 55 M 35 55 L 65 55" stroke="#0B2545" strokeWidth="4" strokeLinecap="round" />
      <text x="50" y="65" textAnchor="middle" fill="#0B2545" fontSize="9" fontWeight="bold" fontFamily="sans-serif">CM/L-XXXXXXX</text>
    </svg>
  );
};

// Official CRS (Compulsory Registration Scheme) Logo SVG
export const CrsMarkLogo = ({ className = "h-8 w-auto" }) => {
  return (
    <svg viewBox="0 0 100 70" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="96" height="66" rx="4" stroke="#0B2545" strokeWidth="3" />
      <circle cx="50" cy="28" r="16" stroke="#0B2545" strokeWidth="2.5" />
      <text x="50" y="33" textAnchor="middle" fill="#0B2545" fontSize="13" fontWeight="bold" fontFamily="sans-serif">CRS</text>
      <text x="50" y="54" textAnchor="middle" fill="#0B2545" fontSize="8" fontWeight="bold" fontFamily="sans-serif">R-XXXXXXXX</text>
      <text x="50" y="64" textAnchor="middle" fill="#0B2545" fontSize="7" fontFamily="sans-serif">www.crsbis.in</text>
    </svg>
  );
};

// Official BIS Hallmarking Logo SVG
export const HallmarkGoldLogo = ({ className = "h-8 w-auto" }) => {
  return (
    <svg viewBox="0 0 100 70" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,6 92,62 8,62" stroke="#B45309" strokeWidth="3" fill="#FEF3C7" />
      <polygon points="50,18 78,56 22,56" stroke="#92400E" strokeWidth="2" fill="none" />
      <text x="50" y="48" textAnchor="middle" fill="#78350F" fontSize="12" fontWeight="bold" fontFamily="sans-serif">916</text>
      <text x="50" y="66" textAnchor="middle" fill="#92400E" fontSize="7" fontWeight="bold" fontFamily="sans-serif">HUID-XXXXXX</text>
    </svg>
  );
};

// Official AI Sarthi Logo
export const AiSarthiLogo = ({ className = "h-8 w-auto" }) => {
  return (
    <img
      src="/ai_sarthi_logo.png"
      alt="AI Sarthi"
      className={`shrink-0 object-contain ${className}`}
    />
  );
};

// Precise Monochrome Architectural Artwork of Rashtrapati Bhavan
export const RashtrapatiBhavanSilhouette = ({ className = "w-full h-auto" }) => {
  return (
    <img
      src="/images/rashtrapati_bhavan_sidebar_blue.png"
      alt="Rashtrapati Bhavan"
      className={`select-none pointer-events-none object-contain ${className}`}
    />
  );
};

// Compatibility aliases
export const BisSaathiHeaderBrand = MargDarshakBrand;
export const BisSaathiLogo = MargDarshakBrand;
export const SaathiMascot = MargDarshakIcon;

