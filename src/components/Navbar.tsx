import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-base/80 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-serif text-ink">
          Sharings
        </Link>
        <nav className="hidden md:flex gap-8 text-sm">
          <a href="#features" className="hover:text-primary transition-colors">Pourquoi</a>
          <a href="#how" className="hover:text-primary transition-colors">Comment</a>
          <a href="#cta" className="btn-primary">Rejoindre</a>
        </nav>
        <button
          className="md:hidden p-2 rounded-lg hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              d={open ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"}
            />
          </svg>
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" className="md:hidden border-t border-white/10 bg-base">
          <ul className="container flex flex-col py-4 space-y-3">
            <li>
              <a href="#features" className="hover:text-primary transition-colors" onClick={() => setOpen(false)}>
                Pourquoi
              </a>
            </li>
            <li>
              <a href="#how" className="hover:text-primary transition-colors" onClick={() => setOpen(false)}>
                Comment
              </a>
            </li>
            <li>
              <a href="#cta" className="btn-primary" onClick={() => setOpen(false)}>
                Rejoindre
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
