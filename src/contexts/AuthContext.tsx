import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "../lib/supa"

interface AuthContextValue {
  user: User | null
  loading: boolean
  hasActiveSubscription: boolean
  signUp: (email: string, password: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<any>
  checkSubscription: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await checkSubscriptionStatus(session.user.id)
      }
      setLoading(false)
    })

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await checkSubscriptionStatus(session.user.id)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkSubscriptionStatus = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/payments/subscription-status/${userId}`)
      const data = await response.json()
      setHasActiveSubscription(data.hasActiveSubscription || false)
      return data.hasActiveSubscription || false
    } catch (error) {
      console.error('Erreur vérification abonnement:', error)
      setHasActiveSubscription(false)
      return false
    }
  }

  const signUp = async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password })
  }

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password })
  }

  const signOut = async () => {
    return await supabase.auth.signOut()
  }

  const checkSubscription = async () => {
    if (user) {
      return await checkSubscriptionStatus(user.id)
    }
    return false
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      hasActiveSubscription,
      signUp,
      signIn,
      signOut,
      checkSubscription
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
