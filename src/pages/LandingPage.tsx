import Navbar from "../components/Navbar";
import BackgroundCarousel from "../components/BackgroundCarousel";
import { HERO_BG_IMAGES } from "../assets/landingImages";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <section className="relative overflow-hidden">
        <div className="h-[520px] md:h-[640px] relative">
          {/* Carrousel en background */}
          <BackgroundCarousel images={HERO_BG_IMAGES} />

          {/* Overlays pour contraste */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />

          {/* Contenu */}
          <div className="relative z-10 h-full">
            <div className="container-page h-full flex flex-col items-start justify-center text-white pt-safe-top">
              <h1 className="title-hero max-w-[16ch] drop-shadow-hero animate-fade-in-up">
                Réservez votre siège et trouvez les{" "}
                <span className="text-accent">meilleurs prestataires</span>
              </h1>
              <p className="text-lead mt-4 max-w-prose animate-fade-in-up delay-150">
                Sharings connecte instituts, indépendants et organisateurs
                d’événements pour des collaborations uniques et rentables.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-300">
                <Link to="/signup?role=salon" className="btn-primary">
                  Je suis un Salon
                </Link>
                <Link to="/signup?role=indep" className="btn-ghost">
                  Je suis un Indépendant
                </Link>
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
    </>
  );
}
