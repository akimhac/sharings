import React, { useEffect, useState } from 'react';
import { X, Rocket, Gift } from 'lucide-react';

const LaunchPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('hasSeenLaunchPopup');
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenLaunchPopup', 'true');
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Fermer"
        >
          <X size={24} />
        </button>
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Rocket size={48} className="text-blue-600" />
              <Gift size={24} className="absolute -right-2 -bottom-2 text-yellow-500" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Lancement Exclusif !
          </h3>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-lg text-blue-900 font-semibold">
              Inscription 100% Gratuite
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Pour les premiers inscrits uniquement
            </p>
          </div>
          <p className="text-gray-600 mb-6">
            Rejoignez la communauté des professionnels de la beauté et profitez de tous nos services sans frais !
          </p>
          <div className="space-y-4">
            <button
              onClick={scrollToForm}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Je m'inscris gratuitement
            </button>
            <button
              onClick={handleClose}
              className="w-full text-gray-600 hover:text-gray-800 transition-colors text-sm"
            >
              Plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchPopup;