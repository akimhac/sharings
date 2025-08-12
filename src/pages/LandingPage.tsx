import { Link } from 'react-router-dom';
import HeroIllustration from '../components/HeroIllustration';

export default function LandingPage() {
  return (
    <div className="text-white">
      <section className="section bg-base">
        <div className="container-page grid items-center gap-10 sm:grid-cols-2">
          <div className="space-y-6">
            <h1 className="title-hero">Sharings — Trouvez une place, louez le bon poste.</h1>
            <p className="text-lead">Simple, rapide et efficace.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup?role=salon" className="btn bg-accent text-white hover:opacity-90">Je suis un salon</Link>
              <Link to="/signup?role=indep" className="btn-primary">Je suis indépendant</Link>
            </div>
          </div>
          <div className="hidden sm:block">
            <HeroIllustration />
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="container-page">
          <h2 className="title-h2 text-center mb-10">Pourquoi Sharings</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card transition transform hover:scale-105">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
              <h3 className="mt-3 font-semibold">Gain de temps</h3>
              <p className="text-sm text-white/80">Publiez ou trouvez un poste en quelques clics.</p>
            </div>
            <div className="card transition transform hover:scale-105">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="mt-3 font-semibold">Fiabilité</h3>
              <p className="text-sm text-white/80">Des profils vérifiés pour des échanges sereins.</p>
            </div>
            <div className="card transition transform hover:scale-105">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-3.866 0-7 2.239-7 5s3.134 5 7 5 7-2.239 7-5-3.134-5-7-5zm0-5v5" />
              </svg>
              <h3 className="mt-3 font-semibold">Visibilité</h3>
              <p className="text-sm text-white/80">Attirez ou trouvez rapidement les professionnels autour de vous.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="section bg-base">
        <div className="container-page">
          <h2 className="title-h2 text-center mb-10">Comment ça marche</h2>
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
            <div className="flex flex-col items-center text-center flex-1">
              <div className="chip mb-4">1</div>
              <h3 className="font-semibold mb-2">Publiez votre besoin</h3>
              <p className="text-sm text-white/80">Décrivez le poste recherché ou proposé.</p>
            </div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="chip mb-4">2</div>
              <h3 className="font-semibold mb-2">Recevez des offres</h3>
              <p className="text-sm text-white/80">Discutez et comparez les propositions.</p>
            </div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="chip mb-4">3</div>
              <h3 className="font-semibold mb-2">Réservez un poste</h3>
              <p className="text-sm text-white/80">Validez et commencez au bon moment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page flex flex-wrap justify-center gap-4">
          <span className="chip">Sécurisé</span>
          <span className="chip">Messagerie intégrée</span>
          <span className="chip">Réservations simples</span>
          <span className="chip">Support rapide</span>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="card text-center space-y-6">
            <h2 className="title-h2">Prêt à vous lancer ?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup?role=salon" className="btn bg-accent text-white hover:opacity-90">Je suis un salon</Link>
              <Link to="/signup?role=indep" className="btn-primary">Je suis indépendant</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="section bg-base">
        <div className="container-page text-center space-y-4">
          <nav className="flex justify-center gap-6 text-sm text-white/80">
            <a href="#features" className="hover:underline">Fonctionnalités</a>
            <a href="#how" className="hover:underline">Comment ça marche</a>
            <Link to="/login" className="hover:underline">Se connecter</Link>
          </nav>
          <p className="text-sm text-white/60">© {new Date().getFullYear()} Sharings. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
