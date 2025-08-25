import React from "react";
import { HeroBackgroundCarousel } from "../components/HeroBackgroundCarousel";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* HERO */}
      <section className="relative h-dvh pt-safe-top flex items-center">
        <HeroBackgroundCarousel />
        <div className="relative z-10 container-page">
          <div className="max-w-3xl">
            <h1 className="title-hero text-white drop-shadow-hero">
              Réservez un siège. <br className="hidden sm:block" />
              Trouvez les meilleurs prestataires.
            </h1>
            <p className="mt-4 text-lead drop-shadow-hero">
              Sharings connecte salons et indépendants partout en France, avec réservation, messagerie et contrats
              simplifiés — le tout en quelques clics.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/register" className="btn-primary neon-glow">Créer un compte</Link>
              <Link to="/recherche" className="btn-ghost">Voir les annonces</Link>
            </div>
            <div className="mt-6 flex gap-4 text-white/80 text-sm">
              <span>✅ Contrats numériques</span>
              <span>✅ Messagerie intégrée</span>
              <span>✅ Recherche par ville</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi */}
      <section id="features" className="section">
        <div className="container-page">
          <h2 className="title-h2 text-white mb-6">Pourquoi Sharings</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Réservation de sièges", "Des places vérifiées dans des salons qualifiés."],
              ["Messagerie intégrée", "Échangez en direct, centralisé et sécurisé."],
              ["Contrats simplifiés", "Générez, signez, conservez. Zéro paperasse."],
            ].map(([title, desc]) => (
              <article key={title} className="card fade-in-up">
                <h3 className="text-white font-semibold text-lg">{title}</h3>
                <p className="mt-2 text-white/80">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="how-it-works" className="section">
        <div className="container-page">
          <h2 className="title-h2 text-white mb-6">Comment ça marche</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              ["Créez votre compte", "Salon ou indépendant."],
              ["Publiez / recherchez", "Postez une annonce ou trouvez une place."],
              ["Réservez & signez", "Discutez, confirmez, signez le contrat."],
            ].map(([title, desc], i) => (
              <article key={title} className="card fade-in-up">
                <div className="chip mb-3"> {i + 1} </div>
                <h3 className="text-white font-semibold">{title}</h3>
                <p className="mt-2 text-white/80">{desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <Link to="/register" className="btn-primary">Commencer</Link>
            <Link to="/recherche" className="btn-ghost">Explorer</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

