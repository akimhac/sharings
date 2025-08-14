import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const item = "sg-px-3 sg-py-2 sg-rounded-lg sg-text-black/85 hover:sg-text-black hover:sg-bg-black/5 sg-transition";

  return (
    <header className="sg-sticky sg-top-0 sg-z-50 sg-border-b sg-border-black/10 sg-bg-base/70 sg-backdrop-blur">
      <div className="sg-container sg-flex sg-items-center sg-justify-between sg-h-16">
        <Link to="/" className="sg-flex sg-items-center sg-gap-2 sg-font-semibold">Sharings</Link>

        <nav className="sg-hidden md:sg-flex sg-items-center sg-gap-1">
          <a href="#features" className={item}>Fonctionnalités</a>
          <a href="#how" className={item}>Comment ça marche</a>
          <NavLink to="/login" className={item}>Se connecter</NavLink>
          <NavLink to="/signup" className="sg-btn-primary sg-ml-1">Créer un compte</NavLink>
        </nav>

        <button
          className="md:sg-hidden sg-inline-flex sg-h-10 sg-w-10 sg-items-center sg-justify-center sg-rounded-lg sg-border sg-border-black/15"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >☰</button>
      </div>

      {open && (
        <div className="md:sg-hidden sg-border-t sg-border-black/10 sg-bg-base">
          <div className="sg-container sg-py-3 sg-flex sg-flex-col">
            <a href="#features" onClick={() => setOpen(false)} className="sg-py-2">Fonctionnalités</a>
            <a href="#how" onClick={() => setOpen(false)} className="sg-py-2">Comment ça marche</a>
            <Link to="/login" onClick={() => setOpen(false)} className="sg-py-2">Se connecter</Link>
            <Link to="/signup" onClick={() => setOpen(false)} className="sg-btn-primary sg-mt-2 sg-w-full sg-text-center">Créer un compte</Link>
          </div>
        </div>
      )}
    </header>
  );
}
