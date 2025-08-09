import React from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Logo from './components/Logo';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import ContactForm from './components/ContactForm';
import LaunchPopup from './components/LaunchPopup';

function LandingPage() {
  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LaunchPopup />
      <nav className="bg-blue-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Logo />
              <span className="ml-2 text-2xl font-bold text-white">SHARINGS</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/creer-annonce" className="text-white hover:text-blue-100 px-3 py-2">Créer annonce</Link>
              <Link to="/rechercher" className="text-white hover:text-blue-100 px-3 py-2">Rechercher</Link>
              <a href="#how-it-works" className="text-white hover:text-blue-100 px-3 py-2">Comment ça marche</a>
              <a href="#features" className="text-white hover:text-blue-100 px-3 py-2">Fonctionnalités</a>
              <button
                onClick={scrollToForm}
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
              >
                S'inscrire
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button className="text-white" aria-label="Menu">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <div id="contact-form">
          <ContactForm />
        </div>
        <div className="p-4 space-x-4">
          <Link to="/reserver/1/100" className="text-blue-600 underline">Exemple Réserver</Link>
          <Link to="/messagerie/1/2" className="text-blue-600 underline">Exemple Messagerie</Link>
        </div>
      </main>

      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 SHARINGS. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

function CreateAnnonce() {
  return <div className="p-4">Créer annonce</div>;
}

function Rechercher() {
  return <div className="p-4">Rechercher</div>;
}

function Reserver() {
  const { annonceId, prix } = useParams();
  return <div className="p-4">Réserver annonce {annonceId} pour {prix}€</div>;
}

function Messagerie() {
  const { annonceId, otherUserId } = useParams();
  return <div className="p-4">Messagerie pour l'annonce {annonceId} avec utilisateur {otherUserId}</div>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/creer-annonce" element={<CreateAnnonce />} />
      <Route path="/rechercher" element={<Rechercher />} />
      <Route path="/reserver/:annonceId/:prix" element={<Reserver />} />
      <Route path="/messagerie/:annonceId/:otherUserId" element={<Messagerie />} />
    </Routes>
  );
}

export default App;
