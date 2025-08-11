import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { supabase } from '../supabase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
      return;
    }
    const { data } = await supabase.from('user_profiles').select('type_utilisateur').single();
    const role = data?.type_utilisateur;
    if (role === 'salon') navigate('/dashboard-salon');
    else navigate('/dashboard-independant');
  };

  return (
    <Layout>
      <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4 py-10">
        <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          className="input"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">
          Se connecter
        </Button>
      </form>
    </Layout>
  );
}
