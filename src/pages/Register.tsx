import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState<'salon' | 'independant'>('salon');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error || !data.user) {
      setError(error?.message || "Erreur lors de l'inscription");
      return;
    }
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({ user_id: data.user.id, type_utilisateur: type });
    if (profileError) {
      setError(profileError.message);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inscription</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="input"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'salon' | 'independant')}
          className="input"
        >
          <option value="salon">Salon</option>
          <option value="independant">Indépendant</option>
        </select>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          S'inscrire
        </button>
      </form>
      <p className="mt-4">
        Déjà un compte?{' '}
        <Link to="/login" className="text-blue-600 underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
};

export default Register;
