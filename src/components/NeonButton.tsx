import { Link } from "react-router-dom";
type Props = {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};
export default function NeonButton({
  to,
  children,
  variant = "primary",
  className = "",
}: Props) {
  const base =
    "relative inline-flex items-center justify-center min-h-[48px] px-5 py-3 rounded-xl font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition";
  if (variant === "ghost") {
    return (
      <Link
        to={to}
        className={`${base} border border-white/20 text-white hover:bg-white/5 ${className}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link to={to} className={`${base} text-black`}>
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-400 via-indigo-300 to-pink-300 opacity-90" />
      <span className="absolute inset-0 rounded-xl blur-md bg-gradient-to-r from-sky-400 via-indigo-300 to-pink-300 opacity-70" />
      <span className={`relative z-10 ${className}`}>{children}</span>
    </Link>
  );
}
