import { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      return;
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('user_profiles')
        .select('type_utilisateur')
        .eq('user_id', user.id)
        .single();
      if (data?.type_utilisateur === 'salon') navigate('/creer-annonce');
      else navigate('/recherche');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 card">
      <Toaster />
      <h1 className="text-2xl mb-4 font-playfair">Connexion</h1>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1">Mot de passe</label>
          <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-full">Se connecter</button>
      </form>
      <p className="mt-4 text-center">
        Pas encore de compte ? <Link to="/register" className="text-gold underline">S'inscrire</Link>
      </p>
    </div>
  );
}
