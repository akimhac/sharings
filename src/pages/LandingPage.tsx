import Navbar from "../components/Navbar";
import BackgroundCarousel from "../components/BackgroundCarousel";
import StickyActions from "../components/StickyActions";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import { HERO_BG_IMAGES } from "../assets/landingImages";
import { Link } from "react-router-dom";

export default function LandingPage(){
  return (
    <>
      <Navbar />
      {/* HERO */}
      <section className="relative overflow-hidden bg-base text-white">
        <div className="relative h-[520px] md:h-[640px]">
          <BackgroundCarousel images={HERO_BG_IMAGES} pauseOnHover />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/65" />
          <div className="relative z-10 h-full">
            <div className="container-page h-full flex flex-col items-start justify-center pt-4 sm:pt-10">
              <h1 className="title-hero max-w-[16ch] drop-shadow-hero reveal">
                Réservez votre siège et trouvez les <span className="text-accent">meilleurs prestataires</span>
              </h1>
              <p className="text-lead mt-4 max-w-prose reveal delay-150">
                Sharings connecte salons, indépendants et organisateurs d’événements pour créer des collaborations uniques et rentables.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 reveal delay-300">
                <Link to="/signup?role=salon" className="btn-primary">Je suis un Salon</Link>
                <Link to="/signup?role=indep" className="btn-ghost">Je suis un Indépendant</Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 reveal delay-500">
                <span className="chip">Réservation de sièges</span>
                <span className="chip">Messagerie intégrée</span>
                <span className="chip">Contrats simplifiés</span>
              </div>
            </div>
          </div>
          <StickyActions />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section bg-base text-white">
        <div className="container-page">
          <h2 className="title-h2 text-center mb-10">Pourquoi Sharings ?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <h2 className="title-h2 text-center mb-10">Comment ça marche</h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <li className="card">1. Créez un compte et complétez votre profil.</li>
            <li className="card">2. Recherchez ou publiez une annonce avec vos critères.</li>
            <li className="card">3. Réservez, échangez et collaborez en toute confiance.</li>
          </ol>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section bg-base text-white">
        <div className="container-page">
          <div className="card flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold">Prêt(e) à commencer ?</h3>
              <p className="text-white/80 mt-1">Rejoignez la communauté Sharings dès aujourd’hui.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/signup?role=salon" className="btn-primary">Je suis un Salon</Link>
              <Link to="/signup?role=indep" className="btn-ghost">Je suis un Indépendant</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
