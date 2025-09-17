import { Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./contexts/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import AnnoncesPage from "./pages/AnnoncesPage"
import NewAnnoncePage from "./pages/NewAnnoncePage"
import BookingPage from "./pages/BookingPage"
import MessagingPage from "./pages/MessagingPage"
import ContractPage from "./pages/ContractPage"
import DashboardPage from "./pages/DashboardPage"

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/recherche" element={<AnnoncesPage />} />
        
        {/* Routes protégées - connexion requise */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/reservations" element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        } />
        
        {/* Routes premium - abonnement requis */}
        <Route path="/creer-annonce" element={
          <ProtectedRoute requireSubscription={true}>
            <NewAnnoncePage />
          </ProtectedRoute>
        } />
        <Route path="/messages" element={
          <ProtectedRoute requireSubscription={true}>
            <MessagingPage />
          </ProtectedRoute>
        } />
        <Route path="/contrat" element={
          <ProtectedRoute requireSubscription={true}>
            <ContractPage />
          </ProtectedRoute>
        } />
      </Routes>
      <Toaster position="top-right" />
    </AuthProvider>
  )
}
