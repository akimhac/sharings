import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

type Role = 'salon' | 'independant';

export default function NavBar() {
  const [role, setRole] = useState<Role | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('user_profiles')
          .select('type_utilisateur')
          .eq('user_id', user.id)
          .single();
        if (data) setRole(data.type_utilisateur as Role);
      } else {
        setRole(null);
      }
    };
    load();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => load());
    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setRole(null);
    navigate('/');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-neutral">
      <Link to="/" className="text-2xl font-playfair text-gold">Sharings</Link>
      <div className="flex items-center gap-4">
        {!role && (
          <>
            <Link to="/register?role=salon" className="btn btn-primary">Je suis un salon</Link>
            <Link to="/register?role=independant" className="btn btn-secondary">Je suis indépendant</Link>
          </>
        )}
        {role && (
          <>
            <span className="badge">{role}</span>
            {role === 'salon' && <Link to="/creer-annonce" className="btn btn-primary">Créer une annonce</Link>}
            {role === 'independant' && <Link to="/recherche" className="btn btn-secondary">Rechercher</Link>}
            <button onClick={logout} className="btn btn-ghost">Déconnexion</button>
          </>
        )}
      </div>
    </nav>
  );
}
