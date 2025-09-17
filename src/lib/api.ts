const API_BASE_URL = 'http://localhost:3001/api'

export const api = {
  // Health check
  health: async () => {
    const response = await fetch(`${API_BASE_URL}/health`)
    return response.json()
  },

  // Stripe
  createCheckout: async (userId?: string) => {
    const response = await fetch(`${API_BASE_URL}/payments/create-checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    })
    return response.json()
  },

  checkSubscription: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/payments/subscription-status/${userId}`)
    return response.json()
  }
}
