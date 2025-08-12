import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-base/70 backdrop-blur border-b border-white/10">
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="text-white font-bold text-xl">Sharings</Link>
        <div className="hidden md:flex space-x-6 text-white">
          <a href="#features">Fonctionnalités</a>
          <a href="#how">Comment ça marche</a>
          <Link to="/login">Se connecter</Link>
          <Link to="/signup" className="btn-primary">Créer un compte</Link>
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-base p-4 space-y-4 text-white">
          <a href="#features" onClick={() => setOpen(false)}>Fonctionnalités</a>
          <a href="#how" onClick={() => setOpen(false)}>Comment ça marche</a>
          <Link to="/login" onClick={() => setOpen(false)}>Se connecter</Link>
          <Link to="/signup" onClick={() => setOpen(false)}>Créer un compte</Link>
        </div>
      )}
    </nav>
  );
}
