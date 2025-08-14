import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Connexion réussie");
      navigate("/");
    }
  };

  return (
    <section className="sg-section">
      <div className="sg-container sg-max-w-md">
        <h2 className="sg-title-h2 sg-mb-6">Se connecter</h2>
        <form onSubmit={handleSubmit} className="sg-flex sg-flex-col sg-gap-4">
          <input
            type="email"
            required
            placeholder="Email"
            className="sg-w-full sg-rounded-lg sg-border sg-border-black/20 sg-px-4 sg-py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Mot de passe"
            className="sg-w-full sg-rounded-lg sg-border sg-border-black/20 sg-px-4 sg-py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="sg-btn-primary"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <p className="sg-mt-4 sg-text-center">
          Pas de compte ? <Link to="/signup" className="sg-text-primary">Créer un compte</Link>
        </p>
      </div>
    </section>
  );
}
