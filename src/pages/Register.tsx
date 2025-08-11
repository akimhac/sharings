import { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

type Role = 'salon' | 'independant';

export default function Register() {
  const [params] = useSearchParams();
  const role = (params.get('role') as Role) || 'independant';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast.error(error.message);
      return;
    }
    if (data.user) {
      await supabase.from('user_profiles').upsert({ user_id: data.user.id, type_utilisateur: role });
      if (role === 'salon') navigate('/creer-annonce');
      else navigate('/recherche');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 card">
      <Toaster />
      <h1 className="text-2xl mb-4 font-playfair">Inscription {role}</h1>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1">Mot de passe</label>
          <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-full">Créer mon compte</button>
      </form>
      <p className="mt-4 text-center">
        Déjà inscrit ? <Link to="/login" className="text-gold underline">Se connecter</Link>
      </p>
    </div>
  );
}
