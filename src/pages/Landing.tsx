import { Link } from 'react-router-dom';
import HeroIllustration from '../components/HeroIllustration';

export default function Landing() {
  return (
    <div className="space-y-16">
      <section className="min-h-screen flex flex-col items-center justify-center text-center bg-hero-gradient p-4">
        <h1 className="text-5xl md:text-6xl font-playfair mb-4 transition-opacity duration-700 opacity-100">
          Sharings — Trouvez une place, louez le bon poste.
        </h1>
        <p className="text-lg mb-8">Simple, rapide et efficace.</p>
        <div className="flex gap-4 mb-10">
          <Link to="/register?role=salon" className="btn btn-primary">Je suis un salon</Link>
          <Link to="/register?role=independant" className="btn btn-secondary">Je suis indépendant</Link>
        </div>
        <HeroIllustration />
        <div className="mt-10 flex gap-2">
          <span className="badge">Confiance</span>
          <span className="badge">Simplicité</span>
        </div>
      </section>

      <section className="px-4 py-16 bg-base">
        <h2 className="text-center text-3xl font-playfair mb-8">Fonctionnalités</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card">
            <h3 className="text-xl font-semibold mb-2">Côté Salon</h3>
            <p>Publiez vos annonces avec disponibilités, photos et prix.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold mb-2">Côté Indépendant</h3>
            <p>Recherchez par ville et trouvez le poste idéal.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-semibold mb-2">Gestion simple</h3>
            <p>Tout est pensé pour une expérience fluide.</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-neutral">
        <h2 className="text-center text-3xl font-playfair mb-8">Comment ça marche</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="card">
            <h3 className="font-semibold mb-2">1. Publiez</h3>
            <p>Créez votre annonce en quelques clics.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">2. Recevez</h3>
            <p>Les indépendants vous contactent.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">3. Finalisez</h3>
            <p>Concluez l'accord facilement.</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-base">
        <h2 className="text-center text-3xl font-playfair mb-8">Témoignages</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <p>"Un service indispensable pour rentabiliser mon salon."</p>
            <p className="mt-2 font-semibold">— Jean, salon à Paris</p>
          </div>
          <div className="card">
            <p>"J'ai trouvé un poste rapidement dans ma ville."</p>
            <p className="mt-2 font-semibold">— Marie, indépendante</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 text-center bg-gradient-to-br from-base to-neutral">
        <h2 className="text-3xl font-playfair mb-6">Prêt à vous lancer ?</h2>
        <div className="flex justify-center gap-4">
          <Link to="/register?role=salon" className="btn btn-primary">Je suis un salon</Link>
          <Link to="/register?role=independant" className="btn btn-secondary">Je suis indépendant</Link>
        </div>
      </section>

      <footer className="px-4 py-8 text-center bg-neutral">
        <p>© {new Date().getFullYear()} Sharings</p>
      </footer>
    </div>
  );
}
