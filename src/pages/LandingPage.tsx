import Button from '../components/Button';
import Card from '../components/Card';
import Layout from '../components/Layout';

export default function LandingPage() {
  return (
    <Layout>
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Trouvez une place, louez le bon poste. Simple, rapide, efficace.</h1>
        <div className="space-x-4 mt-6">
          <Button onClick={() => (window.location.href = '/register?role=salon')}>Je suis un salon</Button>
          <Button onClick={() => (window.location.href = '/register?role=independant')} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
            Je suis indépendant
          </Button>
        </div>
      </section>

      <section className="py-10" id="features">
        <h2 className="text-2xl font-semibold text-center mb-6">Fonctionnalités</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {['Rapide', 'Sécurisé', 'Flexible'].map((f) => (
            <Card key={f}>{f}</Card>
          ))}
        </div>
      </section>

      <section className="py-10" id="how">
        <h2 className="text-2xl font-semibold text-center mb-6">Comment ça marche</h2>
        <ol className="space-y-2">
          <li>1. Inscrivez-vous</li>
          <li>2. Publiez ou réservez un poste</li>
          <li>3. Payez et travaillez</li>
        </ol>
      </section>

      <section className="py-10" id="pricing">
        <h2 className="text-2xl font-semibold text-center mb-6">Tarifs</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <h3 className="font-semibold">Abonnement</h3>
            <p>Forfait indicatif pour publier des annonces.</p>
          </Card>
          <Card>
            <h3 className="font-semibold">Paiement à la réservation</h3>
            <p>Paiement sécurisé via Stripe.</p>
          </Card>
        </div>
      </section>

      <section className="py-10" id="faq">
        <h2 className="text-2xl font-semibold text-center mb-6">FAQ</h2>
        <div className="space-y-2">
          {['Comment payer ?', 'Comment publier une annonce ?', 'Puis-je annuler ?', 'Quand suis-je payé ?'].map((q) => (
            <Card key={q}>{q}</Card>
          ))}
        </div>
      </section>

      <section className="py-20 text-center">
        <Button onClick={() => (window.location.href = '/register')}>Rejoindre Sharings</Button>
      </section>
    </Layout>
  );
}
