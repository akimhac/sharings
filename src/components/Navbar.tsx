import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabase";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const item = "sg-px-3 sg-py-2 sg-rounded-lg sg-text-black/85 hover:sg-text-black hover:sg-bg-black/5 sg-transition";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
  };

  return (
    <header className="sg-sticky sg-top-0 sg-z-50 sg-border-b sg-border-black/10 sg-bg-base/70 sg-backdrop-blur">
      <div className="sg-container sg-flex sg-items-center sg-justify-between sg-h-16">
        <Link to="/" className="sg-flex sg-items-center sg-gap-2 sg-font-semibold">Sharings</Link>

        <nav className="sg-hidden md:sg-flex sg-items-center sg-gap-1">
          <a href="#features" className={item}>Fonctionnalités</a>
          <a href="#how" className={item}>Comment ça marche</a>
          {user ? (
            <>
              <NavLink to="/annonces" className={item}>Annonces</NavLink>
              <NavLink to="/reservations" className={item}>Réservations</NavLink>
              <NavLink to="/messages" className={item}>Messages</NavLink>
              <NavLink to="/contrat" className={item}>Contrat</NavLink>
              <NavLink to="/dashboard" className={item}>Dashboard</NavLink>
              <button onClick={handleLogout} className={item}>Se déconnecter</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={item}>Se connecter</NavLink>
              <NavLink to="/signup" className="sg-btn-primary sg-ml-1">Créer un compte</NavLink>
            </>
          )}
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
            {user ? (
              <>
                <Link to="/annonces" onClick={() => setOpen(false)} className="sg-py-2">Annonces</Link>
                <Link to="/reservations" onClick={() => setOpen(false)} className="sg-py-2">Réservations</Link>
                <Link to="/messages" onClick={() => setOpen(false)} className="sg-py-2">Messages</Link>
                <Link to="/contrat" onClick={() => setOpen(false)} className="sg-py-2">Contrat</Link>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="sg-py-2">Dashboard</Link>
                <button onClick={handleLogout} className="sg-py-2 sg-text-left">Se déconnecter</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="sg-py-2">Se connecter</Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="sg-btn-primary sg-mt-2 sg-w-full sg-text-center">Créer un compte</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
