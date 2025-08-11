import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreerAnnonce from './pages/CreerAnnonce';
import RechercheAnnonces from './pages/RechercheAnnonces';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/creer-annonce"
        element={
          <ProtectedRoute role="salon">
            <CreerAnnonce />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recherche"
        element={
          <ProtectedRoute role="independant">
            <RechercheAnnonces />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
