import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-base/70 backdrop-blur border-b border-white/10">
      <div className="container-page flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-playfair font-bold">Sharings</Link>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white/30 rounded">Fonctionnalités</a>
          <a href="#how" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white/30 rounded">Comment ça marche</a>
          <Link to="/login" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white/30 rounded">Se connecter</Link>
          <Link to="/signup" className="btn-primary">Créer un compte</Link>
        </nav>
        <button
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white/30 p-2"
          aria-label="Menu"
          aria-expanded={open}
          onClick={toggle}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-base/70 backdrop-blur">
          <nav className="flex flex-col p-4 space-y-2">
            <a href="#features" onClick={close} className="btn-ghost text-left">Fonctionnalités</a>
            <a href="#how" onClick={close} className="btn-ghost text-left">Comment ça marche</a>
            <Link to="/login" onClick={close} className="btn-ghost text-left">Se connecter</Link>
            <Link to="/signup" onClick={close} className="btn-primary">Créer un compte</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
