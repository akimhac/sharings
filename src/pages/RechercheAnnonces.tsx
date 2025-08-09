import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

type Annonce = {
  id: number;
  titre: string;
  description: string;
  ville: string;
  prix: number;
};

const RechercheAnnonces = () => {
  const [ville, setVille] = useState('');
  const [annonces, setAnnonces] = useState<Annonce[]>([]);

  const rechercher = async () => {
    const { data, error } = await supabase
      .from('annonces')
      .select('*')
      .eq('ville', ville);

    if (!error && data) {
      setAnnonces(data as Annonce[]);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rechercher des annonces</h1>
      <div className="space-y-4">
        <input
          type="text"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          placeholder="Ville"
          className="w-full border rounded p-2"
        />
        <button
          onClick={rechercher}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Rechercher
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {annonces.map((annonce) => (
          <li key={annonce.id} className="border p-2 rounded">
            <h2 className="font-semibold">
              {annonce.titre} - {annonce.prix}€
            </h2>
            <p>{annonce.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RechercheAnnonces;
