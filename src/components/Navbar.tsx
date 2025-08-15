import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const item = "px-3 py-2 rounded-lg text-white/85 hover:text-white hover:bg-white/5 transition";
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-base/70 backdrop-blur">
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="font-semibold">Sharings</Link>
        <nav className="hidden md:flex items-center gap-1">
          <a href="#features" className={item}>Fonctionnalités</a>
          <a href="#how" className={item}>Comment ça marche</a>
          <NavLink to="/login" className={item}>Se connecter</NavLink>
          <NavLink to="/signup" className="btn-primary ml-1">Créer un compte</NavLink>
        </nav>
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >☰</button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-base">
          <div className="container-page py-3 flex flex-col">
            <a href="#features" onClick={() => setOpen(false)} className="py-2">Fonctionnalités</a>
            <a href="#how" onClick={() => setOpen(false)} className="py-2">Comment ça marche</a>
            <Link to="/login" onClick={() => setOpen(false)} className="py-2">Se connecter</Link>
            <Link to="/signup" onClick={() => setOpen(false)} className="btn-primary mt-2 text-center">Créer un compte</Link>
          </div>
        </div>
      )}
    </header>
  );
}
