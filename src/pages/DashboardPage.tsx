import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <section className="sg-section">
      <div className="sg-container">
        <h2 className="sg-title-h2">Tableau de bord</h2>
        <p className="sg-mt-4">Bienvenue {user?.email}</p>
        <div className="sg-mt-6">
          <button onClick={handleLogout} className="sg-btn-primary">
            Se déconnecter
          </button>
        </div>
      </div>
    </section>
  );
}
