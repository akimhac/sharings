import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { supabase } from '../supabase';

export default function Admin() {
  const [annonces, setAnnonces] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('annonces').select('*').then(({ data }) => setAnnonces(data || []));
    supabase.from('reservations').select('*').then(({ data }) => setReservations(data || []));
  }, []);

  return (
    <Layout>
      <div className="py-10 space-y-6">
        <div>
          <h2 className="font-semibold">Annonces</h2>
          <ul className="list-disc pl-5">
            {annonces.map((a) => (
              <li key={a.id}>{a.titre}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold">Réservations</h2>
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
