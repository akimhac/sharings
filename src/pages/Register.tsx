import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { supabase } from '../supabase';

export default function Register() {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const defaultRole = search.get('role') || 'salon';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(defaultRole);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    const user = data.user;
    if (!user) return;
    await supabase.from('user_profiles').insert({ id: user.id, type_utilisateur: role });
    if (role === 'salon') navigate('/dashboard-salon');
    else navigate('/dashboard-independant');
  };

  return (
    <Layout>
      <form onSubmit={handleRegister} className="max-w-md mx-auto space-y-4 py-10">
        <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          className="input"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="salon">Salon</option>
          <option value="independant">Indépendant</option>
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">
          S'inscrire
        </Button>
      </form>
    </Layout>
  );
}
