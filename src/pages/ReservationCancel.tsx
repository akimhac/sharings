import Layout from '../components/Layout';

export default function ReservationCancel() {
  return (
    <Layout>
      <div className="py-10 text-center space-y-4">
        <h1 className="text-2xl font-bold">Paiement annulé</h1>
        <p>Votre réservation n'a pas été finalisée.</p>
        <a href="/recherche" className="text-blue-600 underline">Retour aux annonces</a>
      </div>
    </Layout>
  );
}
