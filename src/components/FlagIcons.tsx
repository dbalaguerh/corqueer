// SVG flag components

export const FlagCA = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size * 0.625} viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 3 }}>
    <rect width="32" height="20" fill="#FCDD09"/>
    <rect y="2.857" width="32" height="2.857" fill="#DA121A"/>
    <rect y="8.571" width="32" height="2.857" fill="#DA121A"/>
    <rect y="14.286" width="32" height="2.857" fill="#DA121A"/>
  </svg>
);

export const FlagES = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size * 0.667} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 3 }}>
    <rect width="3" height="2" fill="#c60b1e"/>
    <rect y="0.5" width="3" height="1" fill="#ffc400"/>
  </svg>
);

export const FlagFR = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size * 0.667} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 3 }}>
    <rect width="3" height="2" fill="#ED2939"/>
    <rect width="2" height="2" fill="#fff"/>
    <rect width="1" height="2" fill="#002395"/>
  </svg>
);

export const FlagGB = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 3 }}>
    <rect width="60" height="30" fill="#012169"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
    <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
    <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
  </svg>
);
