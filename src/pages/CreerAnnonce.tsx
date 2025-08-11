import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { supabase } from '../supabase';

export default function CreerAnnonce() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    titre: '',
    description: '',
    adresse: '',
    ville: '',
    disponibilite: '',
    prix: '',
    type_poste: '',
    photos: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Restrict access to salons
  React.useEffect(() => {
    supabase
      .from('user_profiles')
      .select('type_utilisateur')
      .single()
      .then(({ data }) => {
        if (data?.type_utilisateur !== 'salon') navigate('/');
      });
  }, [navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from('annonces').insert({
      user_id: user.id,
      titre: form.titre,
      description: form.description,
      adresse: form.adresse,
      ville: form.ville,
      disponibilite: form.disponibilite.split(',').map((s) => s.trim()),
      prix: Number(form.prix),
      type_poste: form.type_poste,
      photos: form.photos.split(',').map((s) => s.trim()),
    });
    navigate('/dashboard-salon');
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-2 py-10">
        <input className="input" name="titre" placeholder="Titre" value={form.titre} onChange={handleChange} />
        <textarea className="input" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input className="input" name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} />
        <input className="input" name="ville" placeholder="Ville" value={form.ville} onChange={handleChange} />
        <input className="input" name="disponibilite" placeholder="Disponibilités (CSV)" value={form.disponibilite} onChange={handleChange} />
        <input className="input" name="prix" type="number" placeholder="Prix" value={form.prix} onChange={handleChange} />
        <input className="input" name="type_poste" placeholder="Type de poste" value={form.type_poste} onChange={handleChange} />
        <input className="input" name="photos" placeholder="Photos URLs (CSV)" value={form.photos} onChange={handleChange} />
        <Button type="submit" className="w-full">Créer</Button>
      </form>
    </Layout>
  );
}
