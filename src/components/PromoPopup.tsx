import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem('hasSeenPromoPopup');
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenPromoPopup', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">
            Offre de Lancement !
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            🎉 Profitez de notre service GRATUITEMENT pendant les 3 premiers mois !
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Inscrivez-vous maintenant pour bénéficier de cette offre exclusive.
          </p>
          <button
            onClick={handleClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            J'en profite !
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;