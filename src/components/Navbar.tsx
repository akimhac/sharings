import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Empêche le scroll du body quand le menu est ouvert (mobile)
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = prev || "";
    return () => { document.body.style.overflow = prev || ""; };
  }, [open]);

  // Fermer au press Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="navbar-glass">
      <div className="container-page flex h-14 items-center justify-between">
        <a href="/" className="font-semibold text-ink">Sharings</a>

        {/* Desktop */}
        <nav className="hidden sm:flex items-center gap-3">
          <a href="#how" className="btn btn-ghost">Comment ça marche</a>
          <a href="/login" className="btn btn-light">Se connecter</a>
          <a href="/register" className="btn btn-primary">Créer un compte</a>
        </nav>

        {/* Burger */}
        <button
          className="sm:hidden inline-flex items-center justify-center rounded-xl p-2 border border-line"
          aria-label="Ouvrir le menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span className="sr-only">Menu</span>
          {/* Icône burger / close */}
          {!open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Overlay + panneau mobile */}
      <div
        className={`sm:hidden fixed inset-0 z-40 transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
        <nav
          id="mobile-menu"
          className={`absolute top-0 right-0 h-full w-[84%] max-w-[360px] bg-white shadow-2xl border-l border-line transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5 space-y-3">
            <a href="#how" className="btn btn-ghost w-full justify-start text-left">Comment ça marche</a>
            <a href="/login" className="btn btn-light w-full justify-start">Se connecter</a>
            <a href="/register" className="btn btn-primary w-full justify-center">Créer un compte</a>
          </div>
        </nav>
      </div>
    </header>
  );
}

