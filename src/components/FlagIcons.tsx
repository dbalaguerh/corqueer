// SVG flag components

export const FlagCA = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <clipPath id="circle-ca">
        <circle cx="50" cy="50" r="50"/>
      </clipPath>
    </defs>
    <g clipPath="url(#circle-ca)">
      <rect width="100" height="100" fill="#FCDD09"/>
      {/* 4 red stripes: 9 equal bands, red at positions 1,3,5,7 (0-indexed) */}
      <rect y="11.11" width="100" height="11.11" fill="#DA121A"/>
      <rect y="33.33" width="100" height="11.11" fill="#DA121A"/>
      <rect y="55.55" width="100" height="11.11" fill="#DA121A"/>
      <rect y="77.77" width="100" height="11.11" fill="#DA121A"/>
    </g>
  </svg>
);

export const FlagES = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs><clipPath id="circle-es"><circle cx="50" cy="50" r="50"/></clipPath></defs>
    <g clipPath="url(#circle-es)">
      <rect width="100" height="100" fill="#c60b1e"/>
      <rect y="25" width="100" height="50" fill="#ffc400"/>
    </g>
  </svg>
);

export const FlagFR = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs><clipPath id="circle-fr"><circle cx="50" cy="50" r="50"/></clipPath></defs>
    <g clipPath="url(#circle-fr)">
      <rect width="100" height="100" fill="#ED2939"/>
      <rect width="67" height="100" fill="#fff"/>
      <rect width="33" height="100" fill="#002395"/>
    </g>
  </svg>
);

export const FlagGB = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs><clipPath id="circle-gb"><circle cx="30" cy="30" r="30"/></clipPath></defs>
    <g clipPath="url(#circle-gb)">
      <rect width="60" height="60" fill="#012169"/>
      <path d="M0,0 L60,60 M60,0 L0,60" stroke="#fff" strokeWidth="12"/>
      <path d="M0,0 L60,60 M60,0 L0,60" stroke="#C8102E" strokeWidth="8"/>
      <path d="M30,0 V60 M0,30 H60" stroke="#fff" strokeWidth="20"/>
      <path d="M30,0 V60 M0,30 H60" stroke="#C8102E" strokeWidth="12"/>
    </g>
  </svg>
);
