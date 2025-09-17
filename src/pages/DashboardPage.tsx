import { useAuth } from "../contexts/AuthContext"
import { Link, useSearchParams } from "react-router-dom"
import { Plus, Search, MessageSquare, Calendar, Settings, Crown, CheckCircle, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const { user, hasActiveSubscription } = useAuth()
  const [searchParams] = useSearchParams()
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }, [searchParams])

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/payments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id || 'anonymous' })
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Erreur Stripe:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Bonjour, {user?.email?.split('@')[0]}
              </h1>
              <p className="text-gray-600 mt-1">Gérez vos services et réservations</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Retour à l'accueil
              </Link>
              {hasActiveSubscription ? (
                <div className="flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 rounded-lg text-sm font-medium">
                  <Crown className="w-4 h-4 mr-2" />
                  Premium Actif
                </div>
              ) : (
                <button 
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                >
                  {loading ? 'Redirection...' : 'Passer au Premium'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <div>
              <h3 className="text-green-800 font-medium">Paiement réussi !</h3>
              <p className="text-green-700 text-sm">Votre abonnement premium sera activé sous peu.</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Premium Upgrade Banner */}
        {!hasActiveSubscription && (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Débloquez toutes les fonctionnalités</h2>
                <p className="text-blue-100 mb-4">
                  Accédez aux prestataires, publiez vos annonces et gérez vos réservations
                </p>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold">29,90€<span className="text-lg text-blue-200">/mois</span></div>
                </div>
              </div>
              <button 
                onClick={handleSubscribe}
                disabled={loading}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {loading ? 'Redirection...' : 'S\'abonner maintenant'}
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ActionCard
            to={hasActiveSubscription ? "/creer-annonce" : "#"}
            icon={<Plus className="w-6 h-6 text-blue-600" />}
            title="Créer une annonce"
            description="Publiez vos services"
            premium={!hasActiveSubscription}
            bgColor="bg-blue-50"
            onClick={!hasActiveSubscription ? handleSubscribe : undefined}
          />

          <ActionCard
            to="/recherche"
            icon={<Search className="w-6 h-6 text-green-600" />}
            title="Rechercher"
            description="Trouvez des prestataires"
            bgColor="bg-green-50"
          />

          <ActionCard
            to={hasActiveSubscription ? "/messages" : "#"}
            icon={<MessageSquare className="w-6 h-6 text-purple-600" />}
            title="Messages"
            description="Communiquez avec vos clients"
            premium={!hasActiveSubscription}
            bgColor="bg-purple-50"
            onClick={!hasActiveSubscription ? handleSubscribe : undefined}
          />

          <ActionCard
            to="/reservations"
            icon={<Calendar className="w-6 h-6 text-orange-600" />}
            title="Réservations"
            description="Gérez vos rendez-vous"
            bgColor="bg-orange-50"
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Activité récente</h2>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune activité récente</h3>
            <p className="text-gray-600 mb-6">Vos réservations et messages apparaîtront ici</p>
            <Link 
              to="/recherche"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              Commencer à explorer
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Composant ActionCard
function ActionCard({ to, icon, title, description, premium, bgColor, onClick }: {
  to: string
  icon: React.ReactNode
  title: string
  description: string
  premium?: boolean
  bgColor: string
  onClick?: () => void
}) {
  const content = (
    <div className={`p-6 rounded-2xl transition-all ${premium 
      ? 'bg-gray-100 cursor-pointer hover:bg-gray-200' 
      : `${bgColor} hover:shadow-lg cursor-pointer`
    }`}>
      <div className={`w-12 h-12 ${premium ? 'bg-gray-200' : 'bg-white'} rounded-xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className={`font-semibold text-lg mb-2 ${premium ? 'text-gray-600' : 'text-gray-900'}`}>
        {title}
      </h3>
      <p className={`text-sm ${premium ? 'text-gray-500' : 'text-gray-600'}`}>
        {description}
      </p>
      {premium && (
        <div className="flex items-center mt-3 text-xs text-amber-600">
          <Crown className="w-3 h-3 mr-1" />
          Premium requis
        </div>
      )}
    </div>
  )

  if (onClick) {
    return <div onClick={onClick}>{content}</div>
  }

  return to === "#" ? <div>{content}</div> : <Link to={to}>{content}</Link>
}
