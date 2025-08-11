import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

interface Annonce {
  id: string;
  titre: string;
  description: string;
  adresse: string;
  ville: string;
  disponibilite: string[];
  prix: number;
  type_poste: string;
  photos: string[];
}

export default function RechercheAnnonces() {
  const [ville, setVille] = useState('');
  const [annonces, setAnnonces] = useState<Annonce[]>([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const { data } = await supabase
        .from('annonces')
        .select('*')
        .ilike('ville', `%${ville}%`);
      setAnnonces(data || []);
    }, 300);
    return () => clearTimeout(timeout);
  }, [ville]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-playfair mb-4">Recherche d'annonces</h1>
      <input
        className="input mb-6"
        placeholder="Ville..."
        value={ville}
        onChange={e => setVille(e.target.value)}
      />
      <div className="grid md:grid-cols-2 gap-4">
        {annonces.map(a => (
          <div key={a.id} className="card">
            {a.photos[0] && (
              <img
                src={a.photos[0]}
                alt={a.titre}
                className="mb-2 w-full h-40 object-cover rounded"
              />
            )}
            <h3 className="text-xl font-semibold">{a.titre}</h3>
            <p className="text-sm mb-2">
              {a.adresse}, {a.ville}
            </p>
            <p className="mb-2">{a.type_poste}</p>
            <div className="mb-2 flex flex-wrap gap-1">
              {a.disponibilite.map(d => (
                <span key={d} className="badge">
                  {d}
                </span>
              ))}
            </div>
            <p className="font-semibold">{a.prix} €</p>
            <button className="btn btn-ghost mt-2">Détails</button>
          </div>
        ))}
      </div>
    </div>
  );
}
