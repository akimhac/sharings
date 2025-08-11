import { useState } from 'react';
import { supabase } from '../lib/supabase';

type Annonce = {
  id: number;
  titre: string;
  description: string;
  adresse: string;
  ville: string;
  disponibilite: string[];
  prix: number;
  type_poste: string;
  photos: string[];
};

const RechercheAnnonces = () => {
  const [ville, setVille] = useState('');
  const [annonces, setAnnonces] = useState<Annonce[]>([]);

  const rechercher = async () => {
    const { data, error } = await supabase
      .from('annonces')
      .select('*')
      .ilike('ville', `%${ville}%`);
    if (!error && data) {
      setAnnonces(data as Annonce[]);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rechercher des annonces</h1>
      <div className="space-y-4">
        <input
          type="text"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          placeholder="Ville"
          className="input"
        />
        <button
          onClick={rechercher}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Rechercher
        </button>
      </div>
      <ul className="mt-4 space-y-4">
        {annonces.map((annonce) => (
          <li key={annonce.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">
              {annonce.titre} - {annonce.prix}€
            </h2>
            {annonce.photos && annonce.photos.length > 0 && (
              <img
                src={annonce.photos[0]}
                alt={annonce.titre}
                className="w-full h-48 object-cover mb-2"
              />
            )}
            <p className="mb-1">{annonce.description}</p>
            <p className="mb-1">{annonce.adresse}, {annonce.ville}</p>
            <p className="mb-1">
              Disponibilités: {annonce.disponibilite.join(', ')}
            </p>
            <p className="mb-1">Type de poste: {annonce.type_poste}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RechercheAnnonces;
