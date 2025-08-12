import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import CreerAnnonce from './pages/CreerAnnonce';
import RechercheAnnonces from './pages/RechercheAnnonces';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute allow={['salon']} />}>
          <Route path="/creer-annonce" element={<CreerAnnonce />} />
        </Route>
        <Route element={<ProtectedRoute allow={['independant']} />}>
          <Route path="/recherche" element={<RechercheAnnonces />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
