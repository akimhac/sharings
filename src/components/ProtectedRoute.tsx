import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../supabase';
import { useEffect, useState } from 'react';

type Role = 'salon' | 'independant';

interface Props {
  allow: Role[];
}

export default function ProtectedRoute({ allow }: Props) {
  const [status, setStatus] = useState<'loading' | 'allowed' | 'denied'>('loading');

  useEffect(() => {
    const check = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setStatus('denied');
        return;
      }
      const { data, error } = await supabase
        .from('user_profiles')
        .select('type_utilisateur')
        .eq('user_id', user.id)
        .single();
      if (error || !data || !allow.includes(data.type_utilisateur as Role)) {
        setStatus('denied');
      } else {
        setStatus('allowed');
      }
    };
    check();
  }, [allow]);

  if (status === 'loading') return <div className="p-4">Chargement...</div>;
  if (status === 'denied') return <Navigate to="/login" replace />;
  return <Outlet />;
}
