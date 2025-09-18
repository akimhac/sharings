import { Link } from "react-router-dom"

export default function LandingPage() {
  const handleSubscribe = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/payments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'test-user' })
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Erreur: ' + JSON.stringify(data))
      }
    } catch (error) {
      alert('Erreur de connexion: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Sharings - Version Finale
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Connexion
              </Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Inscription
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero avec bouton Stripe fonctionnel */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Connectez-vous aux meilleurs prestataires
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            La plateforme qui fonctionne vraiment
          </p>
          
          {/* BOUTON STRIPE - DOIT FONCTIONNER */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto mb-8">
            <div className="text-4xl font-bold text-blue-600 mb-2">29,90€</div>
            <div className="text-gray-600 mb-4">par mois</div>
            <button
              onClick={handleSubscribe}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              S'ABONNER MAINTENANT
            </button>
            <div className="text-sm text-gray-500 mt-2">Paiement sécurisé par Stripe</div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link to="/register" className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold">
              INSCRIPTION
            </Link>
            <Link to="/login" className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold">
              CONNEXION
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
