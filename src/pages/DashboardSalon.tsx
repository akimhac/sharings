import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { supabase } from '../supabase';

interface Annonce {
  id: string;
  titre: string;
}

interface Reservation {
  id: string;
  status: string;
}

export default function DashboardSalon() {
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    supabase
      .from('user_profiles')
      .select('type_utilisateur')
      .single()
      .then(({ data }) => {
        if (data?.type_utilisateur !== 'salon') window.location.href = '/';
      });
    supabase.from('annonces').select('*').then(({ data }) => setAnnonces(data || []));
    supabase.from('reservations').select('*').then(({ data }) => setReservations(data || []));
  }, []);

  return (
    <Layout>
      <div className="py-10 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Mes annonces</h2>
          <Button onClick={() => (window.location.href = '/creer-annonce')}>Créer une annonce</Button>
          <ul className="mt-4 list-disc pl-5">
            {annonces.map((a) => (
              <li key={a.id}>{a.titre}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Réservations reçues</h2>
          <ul className="list-disc pl-5">
            {reservations.map((r) => (
              <li key={r.id}>{r.id} - {r.status}</li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
