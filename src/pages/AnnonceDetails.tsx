import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { supabase } from '../supabase';

interface Annonce {
  id: string;
  titre: string;
  description: string;
  prix: number;
  salon_id?: string;
}

export default function AnnonceDetails() {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState<Annonce | null>(null);
  const [isIndependant, setIsIndependant] = useState(false);

  useEffect(() => {
    if (id) {
      supabase.from('annonces').select('*').eq('id', id).single().then(({ data }) => setAnnonce(data));
    }
    supabase.from('user_profiles').select('type_utilisateur').single().then(({ data }) => {
      setIsIndependant(data?.type_utilisateur === 'independant');
    });
  }, [id]);

  const reserver = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !id) return;
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ annonce_id: id, independant_id: user.id }),
    });
    const json = await res.json();
    if (json.url) window.location.href = json.url;
  };

  if (!annonce) return <Layout>Chargement...</Layout>;

  return (
    <Layout>
      <div className="py-10 space-y-4">
        <h1 className="text-2xl font-bold">{annonce.titre}</h1>
        <p>{annonce.description}</p>
        <p className="font-semibold">{annonce.prix} €</p>
        {isIndependant && <Button onClick={reserver}>Réserver</Button>}
      </div>
    </Layout>
  );
}
