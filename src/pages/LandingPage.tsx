import Navbar from "../components/Navbar";
import BackgroundCarousel from "../components/BackgroundCarousel";
import { HERO_BG_IMAGES } from "../assets/landingImages";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="h-[520px] md:h-[640px] relative">
          <BackgroundCarousel images={HERO_BG_IMAGES} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/55" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />
          <div className="relative z-10 h-full">
            <div className="container-page h-full flex flex-col items-start justify-center text-white pt-safe-top">
              <h1 className="title-hero max-w-[16ch] drop-shadow-hero animate-fade-in-up">
                Réservez votre siège et trouvez les <span className="text-accent">meilleurs prestataires</span>
              </h1>
              <p className="text-lead mt-4 max-w-prose animate-fade-in-up delay-150">
                Sharings connecte instituts, indépendants et organisateurs d’événements pour des collaborations uniques et rentables.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-300">
                <Link to="/signup?role=salon" className="btn-primary">Je suis un Salon</Link>
                <Link to="/signup?role=indep" className="btn-ghost">Je suis un Indépendant</Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 animate-fade-in-up delay-500">
                <span className="chip">Réservation de sièges</span>
                <span className="chip">Messagerie intégrée</span>
                <span className="chip">Contrats simplifiés</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI */}
      <section id="features" className="section">
        <div className="container-page">
          <h2 className="title-h2">Pourquoi Sharings</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Gagnez du temps", d: "Des recherches simples, rapides et ciblées." },
              { t: "Boostez vos revenus", d: "Rentabilisez vos espaces ou services vacants." },
              { t: "Sécurité assurée", d: "Des échanges sécurisés et vérifiés." },
            ].map((c, i) => (
              <div key={i} className="card hover:scale-[1.01] transition-transform">
                <div className="mb-3 text-accent">★</div>
                <h3 className="font-semibold text-lg">{c.t}</h3>
                <p className="mt-2 text-white/80">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT */}
      <section id="how" className="section">
        <div className="container-page">
          <h2 className="title-h2">Comment ça marche</h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              { n: 1, t: "Inscrivez-vous", d: "Créez un compte en quelques secondes." },
              { n: 2, t: "Publiez / Recherchez", d: "Ajoutez une annonce ou trouvez un prestataire." },
              { n: 3, t: "Réservez", d: "Finalisez vos accords en toute confiance." },
            ].map(step => (
              <li key={step.n} className="card relative">
                <span className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-accent text-base flex items-center justify-center font-bold"> {step.n} </span>
                <h3 className="font-semibold text-lg">{step.t}</h3>
                <p className="mt-2 text-white/80">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-page">
          <div className="card flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-semibold">Prêt à commencer ?</h3>
              <p className="text-white/80 mt-1">Créez votre compte en moins d’une minute.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/signup?role=salon" className="btn-primary">Je suis un Salon</Link>
              <Link to="/signup?role=indep" className="btn-ghost">Je suis un Indépendant</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-white/70">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Sharings — Tous droits réservés.</p>
          <nav className="flex gap-4">
            <a href="#features" className="hover:text-white">Fonctionnalités</a>
            <a href="#how" className="hover:text-white">Comment ça marche</a>
            <Link to="/login" className="hover:text-white">Se connecter</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
