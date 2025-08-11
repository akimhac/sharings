import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { supabase } from '../supabase';

interface Reservation {
  id: string;
  status: string;
}

export default function DashboardIndependant() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    supabase
      .from('user_profiles')
      .select('type_utilisateur')
      .single()
      .then(({ data }) => {
        if (data?.type_utilisateur !== 'independant') window.location.href = '/';
      });
    supabase.from('reservations').select('*').then(({ data }) => setReservations(data || []));
  }, []);

  return (
    <Layout>
      <div className="py-10">
        <h2 className="text-xl font-semibold mb-4">Mes réservations</h2>
        <ul className="list-disc pl-5">
          {reservations.map((r) => (
            <li key={r.id}>{r.id} - {r.status}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
