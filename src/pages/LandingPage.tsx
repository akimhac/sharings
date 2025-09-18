import { Link } from "react-router-dom"

export default function LandingPage() {
  const handleSubscribe = async () => {
    try {
      console.log('Appel API Stripe...')
      // URL Codespaces du backend au lieu de localhost
      const backendUrl = 'https://automatic-goggles-x5xx7wj4v65g2pwqg-3001.app.github.dev'
      
      const response = await fetch(`${backendUrl}/api/payments/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'test-user' })
      })
      const data = await response.json()
      console.log('Réponse Stripe:', data)
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Erreur: ' + JSON.stringify(data))
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur de connexion: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Contenu identique... */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Sharings
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Connexion
              </Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Inscription Gratuite
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Développez votre activité beauté
            <span className="block text-blue-600">avec 10x plus de clients</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Rejoignez 2000+ professionnels qui génèrent <strong>+40% de CA</strong> grâce à notre plateforme.
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg mx-auto mb-8">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
              🔥 OFFRE DE LANCEMENT
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">29,90€</div>
            <div className="text-gray-600 mb-6">par mois • Annulable à tout moment</div>
            
            <button
              onClick={handleSubscribe}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              COMMENCER MAINTENANT
            </button>
            <div className="text-sm text-gray-500 mt-3">
              Test avec URL Codespaces
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
