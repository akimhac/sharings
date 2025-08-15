import Navbar from "../components/Navbar";
import CarouselPro from "../components/CarouselPro";
import { HERO_IMAGES } from "../assets/images";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="sg-section">
        <div className="sg-container sg-grid sg-items-center sg-gap-10 lg:sg-grid-cols-12">
          <div className="lg:sg-col-span-6">
            <h1 className="sg-title-hero sg-max-w-[18ch] sg-font-serif">
              Réservez votre siège et trouvez les <span className="sg-text-accent">meilleurs prestataires</span>
            </h1>
            <p className="sg-text-lead sg-mt-4 sg-max-w-prose">
              Sharings connecte instituts, indépendants et organisateurs d’événements pour louer des places disponibles et créer des collaborations uniques et rentables.
            </p>
            <div className="sg-mt-6 sg-flex sg-flex-col sm:sg-flex-row sg-gap-3">
              <Link to="/signup?role=salon" className="sg-btn-primary">Je suis un Salon</Link>
              <Link to="/signup?role=indep" className="sg-btn-ghost">Je suis un Indépendant</Link>
            </div>
            <div className="sg-mt-6 sg-flex sg-flex-wrap sg-gap-2">
              <span className="sg-chip">Réservation de sièges</span>
              <span className="sg-chip">Messagerie intégrée</span>
              <span className="sg-chip">Contrats simplifiés</span>
            </div>
          </div>

          <div className="lg:sg-col-span-6">
            <CarouselPro images={HERO_IMAGES} intervalMs={5000} />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="sg-section">
        <div className="sg-container">
          <h2 className="sg-title-h2">Pourquoi Sharings</h2>
          <div className="sg-mt-8 sg-grid sg-gap-5 sm:sg-grid-cols-2 lg:sg-grid-cols-3">
            {[
              { t: "Gagnez du temps", d: "Des recherches simples, rapides et ciblées." },
              { t: "Boostez vos revenus", d: "Rentabilisez vos espaces ou services vacants." },
              { t: "Sécurité assurée", d: "Des échanges sécurisés et vérifiés." },
            ].map((c, i) => (
              <div key={i} className="sg-card hover:sg-scale-[1.01] sg-transition-transform">
                <div className="sg-mb-3 sg-text-accent">★</div>
                <h3 className="sg-font-semibold sg-text-lg">{c.t}</h3>
                <p className="sg-mt-2 sg-text-black/80">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="sg-section">
        <div className="sg-container">
          <h2 className="sg-title-h2">Comment ça marche</h2>
          <ol className="sg-mt-8 sg-grid sg-gap-5 sm:sg-grid-cols-3">
            {[
              { n: 1, t: "Inscrivez-vous", d: "Créez un compte en quelques secondes." },
              { n: 2, t: "Publiez / Recherchez", d: "Ajoutez une annonce ou trouvez un prestataire." },
              { n: 3, t: "Collaborez", d: "Finalisez vos accords en toute confiance." },
            ].map(step => (
              <li key={step.n} className="sg-card sg-relative">
                <span className="sg-absolute -sg-top-3 -sg-left-3 sg-h-8 sg-w-8 sg-rounded-full sg-bg-accent sg-text-base sg-flex sg-items-center sg-justify-center sg-font-bold"> {step.n} </span>
                <h3 className="sg-font-semibold sg-text-lg">{step.t}</h3>
                <p className="sg-mt-2 sg-text-black/80">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="sg-section">
        <div className="sg-container">
          <div className="sg-card sg-flex sg-flex-col sg-items-start sg-justify-between sg-gap-6 sm:sg-flex-row sm:sg-items-center">
            <div>
              <h3 className="sg-text-2xl sg-font-semibold">Prêt à commencer ?</h3>
              <p className="sg-text-black/80 sg-mt-1">Créez votre compte en moins d’une minute.</p>
            </div>
            <div className="sg-flex sg-gap-3">
              <Link to="/signup?role=salon" className="sg-btn-primary">Je suis un Salon</Link>
              <Link to="/signup?role=indep" className="sg-btn-ghost">Je suis un Indépendant</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="sg-border-t sg-border-black/10 sg-py-8 sg-text-black/70">
        <div className="sg-container sg-flex sg-flex-col sm:sg-flex-row sg-items-center sg-justify-between sg-gap-4">
          <p>© {new Date().getFullYear()} Sharings — Tous droits réservés.</p>
          <nav className="sg-flex sg-gap-4">
            <a href="#features" className="hover:sg-text-primary">Fonctionnalités</a>
            <a href="#how" className="hover:sg-text-primary">Comment ça marche</a>
            <Link to="/login" className="hover:sg-text-primary">Se connecter</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
