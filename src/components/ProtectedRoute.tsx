import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthProvider';

interface Props {
  role?: 'salon' | 'independant';
  children: JSX.Element;
}

const ProtectedRoute = ({ role, children }: Props) => {
  const { user, profile, loading } = useAuth();
  if (loading) return <div>Chargement...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (role && profile?.type_utilisateur !== role) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
