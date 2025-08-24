import HeroBackgroundCarousel from "../components/BackgroundCarousel";
import Navbar from "../components/Navbar";

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

export default function LandingPage() {
  return (
    <main className="relative bg-base">
      <Navbar />

      {/* HERO plein écran (texte blanc sur image) */}
      <section className="relative h-dvh sm:min-h-[82vh]">
        <HeroBackgroundCarousel images={HERO_IMAGES} intervalMs={5500} />
        <div className="container-page relative z-10 flex h-full items-end sm:items-center pt-safe-top pb-10 hero-over">
          <div className="max-w-2xl">
            <h1 className="title-hero drop-shadow-hero text-white">Réservez votre siège et trouvez les meilleurs prestataires</h1>
            <p className="mt-4 text-lead text-white/90">Sharings connecte instituts, indépendants et organisateurs d’événements pour louer des places disponibles et créer des collaborations uniques.</p>
            <div className="mt-6 grid gap-3 sm:flex">
              <a href="/register" className="btn btn-primary glow w-full sm:w-auto">Créer un compte</a>
              <a href="/recherche" className="btn btn-light w-full sm:w-auto">Voir les annonces</a>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="section container-page">
        <h2 className="title-h2">Comment ça marche</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <div className="card"><p className="text-lg muted">1. Créez votre compte (salon ou indépendant)</p></div>
          <div className="card"><p className="text-lg muted">2. Publiez une annonce ou recherchez une place</p></div>
          <div className="card"><p className="text-lg muted">3. Réservez, échangez par message, signez le contrat</p></div>
        </div>
      </section>

      <section className="section container-page">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="card">
            <h3 className="text-xl font-semibold">Prêt à commencer ?</h3>
            <p className="mt-2 text-inkMuted">Rejoignez des salons et indépendants partout en France.</p>
            <div className="mt-5 grid gap-3 sm:flex">
              <a href="/register" className="btn btn-primary glow w-full sm:w-auto">Créer un compte</a>
              <a href="/recherche" className="btn btn-ghost w-full sm:w-auto">Voir les annonces</a>
            </div>
          </div>
          <div className="cardAlt">
            <h3 className="text-xl font-semibold">Pourquoi Sharings</h3>
            <ul className="mt-3 space-y-2 text-inkMuted list-disc list-inside">
              <li>Réservation simple</li>
              <li>Messagerie intégrée</li>
              <li>Contrats simplifiés</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
