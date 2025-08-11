import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardSalon from './pages/DashboardSalon';
import DashboardIndependant from './pages/DashboardIndependant';
import CreerAnnonce from './pages/CreerAnnonce';
import RechercheAnnonces from './pages/RechercheAnnonces';
import AnnonceDetails from './pages/AnnonceDetails';
import ReservationSuccess from './pages/ReservationSuccess';
import ReservationCancel from './pages/ReservationCancel';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard-salon" element={<DashboardSalon />} />
      <Route path="/dashboard-independant" element={<DashboardIndependant />} />
      <Route path="/creer-annonce" element={<CreerAnnonce />} />
      <Route path="/recherche" element={<RechercheAnnonces />} />
      <Route path="/annonce/:id" element={<AnnonceDetails />} />
      <Route path="/success" element={<ReservationSuccess />} />
      <Route path="/cancel" element={<ReservationCancel />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
