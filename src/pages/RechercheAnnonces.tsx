import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import { supabase } from '../supabase';

interface Annonce {
  id: string;
  titre: string;
  ville: string;
  prix: number;
}

export default function RechercheAnnonces() {
  const [ville, setVille] = useState('');
  const [annonces, setAnnonces] = useState<Annonce[]>([]);

  const rechercher = async () => {
    const { data } = await supabase
      .from('annonces')
      .select('id,titre,ville,prix')
      .ilike('ville', `%${ville}%`);
    setAnnonces(data || []);
  };

  return (
    <Layout>
      <div className="py-10 space-y-4">
        <div className="flex space-x-2">
          <input className="input" value={ville} onChange={(e) => setVille(e.target.value)} placeholder="Ville" />
          <Button onClick={rechercher}>Rechercher</Button>
        </div>
        <div className="grid gap-4">
          {annonces.map((a) => (
            <Card key={a.id}>
              <h3 className="font-semibold">{a.titre}</h3>
              <p>{a.ville} - {a.prix}€</p>
              <Link to={`/annonce/${a.id}`} className="text-blue-600 underline">Voir</Link>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
