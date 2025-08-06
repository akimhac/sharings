import React, { useState } from 'react';
import { Search, MapPin, X } from 'lucide-react';

const PlaceSearch = () => {
  const [query, setQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center bg-white rounded-lg shadow-lg">
          <div className="flex-1">
            <div className="flex items-center px-4 py-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un salon..."
                className="ml-2 flex-1 outline-none text-gray-700"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="relative bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                Bientôt disponible !
              </h3>
              <p className="text-gray-600 mb-6">
                La recherche de salons sera disponible très prochainement. En attendant, vous pouvez vous inscrire gratuitement pour être parmi les premiers à en profiter !
              </p>
              <button
                onClick={() => {
                  setShowPopup(false);
                  const formElement = document.getElementById('contact-form');
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                S'inscrire gratuitement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceSearch;