import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

(async () => {
  const email = process.argv[2];
  if (!email) throw new Error('Email manquant');
  const { data: user } = await supabase.auth.admin.listUsers({ email });
  if (!user?.users?.length) return console.log('Utilisateur non trouvé');
  const id = user.users[0].id;
  await supabase.auth.admin.deleteUser(id);
  console.log(`Utilisateur ${email} supprimé`);
})();
