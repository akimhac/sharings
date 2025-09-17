import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { ChevronRight, Star, Shield, Zap, Users, LogOut } from "lucide-react"

export default function LandingPage() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Sharings
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Dashboard
                  </Link>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <button 
                      onClick={handleSignOut}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                    Connexion
                  </Link>
                  <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Connectez-vous aux
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                meilleurs prestataires
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Trouvez et réservez des professionnels de confiance près de chez vous. 
              Beauté, mécanique, services à domicile - tout en un clic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link 
                  to="/dashboard" 
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  Accéder au tableau de bord
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link 
                    to="/register" 
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                  >
                    Commencer maintenant
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link 
                    to="/recherche" 
                    className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Explorer les services
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Sharings ?
            </h2>
            <p className="text-lg text-gray-600">
              Une plateforme moderne pour des services de qualité
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prestataires vérifiés</h3>
              <p className="text-gray-600">Tous nos professionnels sont contrôlés et certifiés pour votre sécurité.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Réservation instantanée</h3>
              <p className="text-gray-600">Trouvez et réservez un créneau en quelques clics, 24h/24.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Communauté active</h3>
              <p className="text-gray-600">Rejoignez des milliers d'utilisateurs satisfaits dans toute la France.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      {!user && (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Accédez à tous les services premium
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Publiez vos annonces, contactez tous les prestataires et gérez vos réservations
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-sm mx-auto mb-8">
              <div className="text-4xl font-bold mb-2">29,90€</div>
              <div className="text-blue-200">par mois</div>
            </div>
            <Link 
              to="/register" 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Commencer l'essai gratuit
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold mb-4">Sharings</div>
              <p className="text-gray-400">
                La plateforme qui connecte clients et prestataires de services.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <div className="space-y-2 text-gray-400">
                <div>Beauté & Bien-être</div>
                <div>Mécanique Auto</div>
                <div>Services à domicile</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Centre d'aide</div>
                <div>Nous contacter</div>
                <div>CGU</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Compte</h4>
              <div className="space-y-2 text-gray-400">
                <Link to="/login" className="block hover:text-white transition-colors">Connexion</Link>
                <Link to="/register" className="block hover:text-white transition-colors">Inscription</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 Sharings. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
