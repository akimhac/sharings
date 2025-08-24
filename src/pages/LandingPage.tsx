import { Link } from "react-router-dom";
import HeroBackgroundCarousel from "../components/BackgroundCarousel";
import TechGlow from "../components/TechGlow";
import NeonButton from "../components/NeonButton";

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2000&auto=format&fit=crop",
    alt: "Ambiance chaleureuse en salon",
  },
  {
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2000&auto=format&fit=crop",
    alt: "Poste de coiffure moderne",
  },
  {
    src: "https://images.unsplash.com/photo-1522335789203-9ed94a71b997?q=80&w=2000&auto=format&fit=crop",
    alt: "Événement beauté professionnel",
  },
];

import Navbar from "../components/Navbar"
import BackgroundCarousel from "../components/BackgroundCarousel"
import StickyActions from "../components/StickyActions"
import FeatureCard from "../components/FeatureCard"
import Footer from "../components/Footer"
import { HERO_BG_IMAGES } from "../assets/landingImages"
import { Link } from "react-router-dom"

 main
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white relative">
      <TechGlow />
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/60 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-xl font-semibold tracking-tight hover:opacity-90">
            Sharings
          </Link>
          <div className="hidden gap-6 md:flex">
            <a href="#features" className="text-white/80 hover:text-white">
              Fonctionnalités
            </a>
            <a href="#how" className="text-white/80 hover:text-white">
              Comment ça marche
            </a>
            <Link to="/recherche" className="text-white/80 hover:text-white">
              Rechercher
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/5">
              Se connecter
            </Link>
            <NeonButton to="/register">Créer un compte</NeonButton>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative h-[86svh] overflow-hidden">
        <HeroBackgroundCarousel images={HERO_IMAGES} intervalMs={5500} />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
              Nouveau • Marketplace coiffure & esthétique
            </p>
            <h1 className="title-hero drop-shadow-hero leading-[1.05]">
              Réservez un siège, trouvez <span className="gradient-text">les meilleurs prestataires</span>
            </h1>
            <p className="text-lead mt-4 max-w-xl">
              Salons, indépendants & organisateurs : louez des places disponibles, collaborez en toute simplicité et sécurisez vos échanges.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <NeonButton to="/creer-annonce">Je suis un Salon</NeonButton>
              <NeonButton to="/recherche" variant="ghost">
                Je suis un Indépendant
              </NeonButton>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 text-sm text-white/70">
              <span className="chip">Réservation de sièges</span>
              <span className="chip">Messagerie intégrée</span>
              <span className="chip">Contrats simplifiés</span>
              
      <section className="relative overflow-hidden bg-base text-white">
        <div className="relative h-[520px] md:h-[640px]">
          <BackgroundCarousel slides={HERO_BG_IMAGES} pauseOnHover />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/65" />
          <div className="relative z-10 h-full">
            <div className="container-page flex h-full flex-col items-start justify-center pt-4 sm:pt-10">
              <h1 className="title-hero max-w-[16ch] drop-shadow-hero reveal">
                Réservez votre siège et trouvez les <span className="text-accent">meilleurs prestataires</span>
              </h1>
              <p className="text-lead mt-4 max-w-prose reveal delay-150">
                Sharings connecte salons, indépendants et organisateurs d’événements pour créer des collaborations uniques et rentables.
              </p>
              <div className="mt-6 flex flex-col gap-3 reveal delay-300 sm:flex-row">
                <Link to="/register?role=salon" className="btn-primary">
                  Je suis un Salon
                </Link>
                <Link to="/register?role=indep" className="btn-ghost">
                  Je suis un Indépendant
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 reveal delay-500">
                <span className="chip">Réservation de sièges</span>
                <span className="chip">Messagerie intégrée</span>
                <span className="chip">Contrats simplifiés</span>
              </div>
 main
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI */}
      <section id="features" className="section container-page">
        <h2 className="title-h2 mb-6">Pourquoi Sharings</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Gagnez du temps",
              text: "Des recherches ciblées, des réponses rapides et un planning clair.",
            },
            {
              title: "Revenus boostés",
              text: "Rentabilisez vos espaces vacants en quelques clics.",
            },
            {
              title: "Sécurité assurée",
              text: "Profils vérifiés, contrats et messagerie intégrés.",
            },
          ].map((c) => (
            <div key={c.title} className="card hover:shadow-2xl transition">
              <h3 className="mb-2 text-lg font-semibold gradient-text">{c.title}</h3>
              <p className="text-white/75">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMMENT */}
      <section id="how" className="section container-page">
        <h2 className="title-h2 mb-6">Comment ça marche</h2>
        <ol className="grid gap-5 sm:grid-cols-3">
          {[
            { step: "1", text: "Créez votre compte (salon ou indépendant)." },
            { step: "2", text: "Publiez une annonce ou recherchez une place." },
            { step: "3", text: "Réservez, échangez par message, signez le contrat." },
          ].map((s) => (
            <li key={s.step} className="card">
              <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm">
                {s.step}
              </span>
              <p className="text-white/80">{s.text}</p>
            </li>
          ))}
        </ol>

      {/* FEATURES */}
      <section id="features" className="section bg-base text-white">
        <div className="container-page">
          <h2 className="title-h2 mb-10 text-center">Pourquoi Sharings ?</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={"🔍"} title="Recherche simple">
              Filtrez par ville, service et budget pour trouver rapidement le bon profil.
            </FeatureCard>
            <FeatureCard icon={"🤝"} title="Collaboration fluide">
              Échangez et réservez en toute simplicité, avec des profils vérifiés.
            </FeatureCard>
            <FeatureCard icon={"📣"} title="Visibilité">
              Publiez vos postes vacants et attirez rapidement les bons prestataires.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="section bg-base text-white/90">
        <div className="container-page">
          <h2 className="title-h2 mb-10 text-center">Comment ça marche</h2>
          <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <li className="card">1. Créez un compte et complétez votre profil.</li>
            <li className="card">2. Recherchez ou publiez une annonce avec vos critères.</li>
            <li className="card">3. Réservez, échangez et collaborez en toute confiance.</li>
          </ol>
        </div>
 main
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-page">
          <div className="card flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center hover:shadow-2xl transition">
            <div>
              <h3 className="text-xl font-semibold">Prêt à commencer ?</h3>
              <p className="text-white/70">Rejoignez des salons et indépendants partout en France.</p>
            </div>
            <div className="flex gap-3">
              <NeonButton to="/register">Créer un compte</NeonButton>
              <NeonButton to="/recherche" variant="ghost">
                Voir les annonces
              </NeonButton>

          <div className="card flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h3 className="text-2xl font-semibold">Prêt(e) à commencer ?</h3>
              <p className="mt-1 text-white/80">Rejoignez la communauté Sharings dès aujourd’hui.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/register?role=salon" className="btn-primary">
                Je suis un Salon
              </Link>
              <Link to="/register?role=indep" className="btn-ghost">
                Je suis un Indépendant
              </Link>
 main
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-white/60">
        <div className="container-page">© {new Date().getFullYear()} Sharings — Tous droits réservés.</div>
      </footer>
    </div>
  );

      <Footer />
    </>
  )
 main
}
