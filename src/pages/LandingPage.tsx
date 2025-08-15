import Navbar from "../components/Navbar";
import CarouselSmart from "../components/CarouselSmart";

export default function LandingPage() {
  return (
    <div className="bg-base text-ink min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="section">
          <div className="container grid items-center gap-8 lg:grid-cols-2">
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="title-hero">Partagez vos espaces beauté.</h1>
              <p className="text-lead">
                Sharings connecte salons et indépendants pour optimiser chaque mètre carré.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#" className="btn-primary">Je suis un Salon</a>
                <a href="#" className="btn-outline">Je suis un Indépendant</a>
              </div>
            </div>
            <CarouselSmart />
          </div>
        </section>

        {/* Pourquoi Sharings */}
        <section id="features" className="section bg-surface">
          <div className="container">
            <h2 className="title-h2 mb-12 text-center">Pourquoi Sharings</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="card text-center">
                <h3 className="font-serif text-xl mb-2">Rentabilisez</h3>
                <p className="text-sm text-ink/80">Optimisez vos postes vacants avec des indépendants qualifiés.</p>
              </div>
              <div className="card text-center">
                <h3 className="font-serif text-xl mb-2">Flexibilité</h3>
                <p className="text-sm text-ink/80">Réservez des créneaux adaptés à votre activité.</p>
              </div>
              <div className="card text-center">
                <h3 className="font-serif text-xl mb-2">Communauté</h3>
                <p className="text-sm text-ink/80">Rejoignez un réseau d'espaces et de professionnels de confiance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section id="how" className="section">
          <div className="container">
            <h2 className="title-h2 mb-12 text-center">Comment ça marche</h2>
            <ol className="grid gap-8 md:grid-cols-3 text-center">
              <li className="card">
                <span className="text-4xl font-serif text-primary">1</span>
                <p className="mt-4 text-sm text-ink/80">Créez votre profil salon ou indépendant.</p>
              </li>
              <li className="card">
                <span className="text-4xl font-serif text-primary">2</span>
                <p className="mt-4 text-sm text-ink/80">Trouvez l'espace ou le professionnel idéal.</p>
              </li>
              <li className="card">
                <span className="text-4xl font-serif text-primary">3</span>
                <p className="mt-4 text-sm text-ink/80">Réservez et commencez à partager.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* CTA final */}
        <section id="cta" className="section bg-surface">
          <div className="container text-center space-y-6">
            <h2 className="title-h2">Prêt à rejoindre l'aventure ?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#" className="btn-primary">Je suis un Salon</a>
              <a href="#" className="btn-outline">Je suis un Indépendant</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="section text-center text-sm text-ink/60">
        <div className="container">
          © {new Date().getFullYear()} Sharings. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
