import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { ChevronRight, Shield, Zap, Users, LogOut } from "lucide-react"

export default function LandingPage() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation moderne */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Sharings
            </Link>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Dashboard
                  </Link>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <button 
                      onClick={handleSignOut}
                      className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                      title="Déconnexion"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Connexion
                  </Link>
                  <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Connectez-vous aux
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              meilleurs prestataires
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
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
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Sharings ?
            </h2>
            <p className="text-lg text-gray-600">
              Une plateforme moderne pour des services de qualité
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Prestataires vérifiés</h3>
              <p className="text-gray-600 leading-relaxed">Tous nos professionnels sont contrôlés et certifiés pour votre sécurité.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Réservation instantanée</h3>
              <p className="text-gray-600 leading-relaxed">Trouvez et réservez un créneau en quelques clics, 24h/24.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Communauté active</h3>
              <p className="text-gray-600 leading-relaxed">Rejoignez des milliers d'utilisateurs satisfaits dans toute la France.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
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
              Commencer maintenant
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
