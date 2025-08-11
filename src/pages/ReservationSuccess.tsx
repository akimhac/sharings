import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { supabase } from '../supabase';

export default function ReservationSuccess() {
  const location = useLocation();
  const [reservation, setReservation] = useState<any>(null);

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get('session_id');
    if (sessionId) {
      supabase
        .from('reservations')
        .select('*, annonces(titre)')
        .eq('stripe_session_id', sessionId)
        .single()
        .then(({ data }) => setReservation(data));
    }
  }, [location.search]);

  return (
    <Layout>
      <div className="py-10">
        <h1 className="text-2xl font-bold mb-4">Réservation réussie</h1>
        {reservation ? (
          <div className="space-y-2">
            <p>Annonce : {reservation.annonces?.titre}</p>
            <p>Montant : {reservation.montant_total / 100} €</p>
            <p>Commission : {reservation.commission_plateforme / 100} €</p>
            <p>Status : {reservation.status}</p>
          </div>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    </Layout>
  );
}
