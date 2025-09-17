import { ReactNode } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Lock, CreditCard } from 'lucide-react'

interface ProtectedRouteProps {
  children: ReactNode
  requireSubscription?: boolean
}

const handleSubscribe = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/payments/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'temp' })
    })
    const data = await response.json()
    if (data.url) {
      window.location.href = data.url
    }
  } catch (error) {
    console.error('Erreur Stripe:', error)
  }
}

export default function ProtectedRoute({ children, requireSubscription = false }: ProtectedRouteProps) {
  const { user, loading, hasActiveSubscription } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (requireSubscription && !hasActiveSubscription) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accès Premium requis</h2>
          <p className="text-gray-600 mb-6">
            Cette fonctionnalité nécessite un abonnement premium pour accéder aux services complets.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-center mb-2">
              <CreditCard className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-blue-600">29,90€</span>
              <span className="text-gray-600 ml-1">/mois</span>
            </div>
            <div className="text-sm text-gray-600">
              • Accès illimité aux prestataires<br/>
              • Publication d'annonces<br/>
              • Messagerie sécurisée<br/>
              • Support prioritaire
            </div>
          </div>
          <button 
            onClick={handleSubscribe}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors mb-4"
          >
            S'abonner maintenant
          </button>
          <Link to="/dashboard" className="text-gray-500 hover:text-gray-700 text-sm">
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
