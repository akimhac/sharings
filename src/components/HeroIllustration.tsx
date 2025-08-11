export default function HeroIllustration() {
  return (
    <svg
      className="w-32 h-64 mx-auto"
      viewBox="0 0 80 160"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pole" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EEEEEE" />
        </linearGradient>
      </defs>
      <rect x="30" y="20" width="20" height="120" fill="url(#pole)" stroke="#000" strokeWidth="2" />
      <path d="M30 40 L50 50 L30 60 L50 70 L30 80 L50 90 L30 100 L50 110 L30 120 L50 130" stroke="#C1121F" strokeWidth="10" fill="none" />
      <path d="M30 50 L50 60 L30 70 L50 80 L30 90 L50 100 L30 110 L50 120" stroke="#1F4B99" strokeWidth="10" fill="none" />
      <circle cx="40" cy="20" r="10" fill="#1F4B99" stroke="#000" strokeWidth="2" />
      <circle cx="40" cy="140" r="10" fill="#C1121F" stroke="#000" strokeWidth="2" />
    </svg>
  );
}
