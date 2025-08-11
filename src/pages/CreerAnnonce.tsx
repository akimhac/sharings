import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/AuthProvider';

const CreerAnnonce = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    adresse: '',
    ville: '',
    disponibilite: '',
    prix: '',
    type_poste: '',
    photos: '',
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const { error } = await supabase.from('annonces').insert({
      user_id: user.id,
      titre: formData.titre,
      description: formData.description,
      adresse: formData.adresse,
      ville: formData.ville,
      disponibilite: formData.disponibilite
        .split(',')
        .map((d) => d.trim()),
      prix: parseFloat(formData.prix),
      type_poste: formData.type_poste,
      photos: formData.photos.split(',').map((p) => p.trim()),
    });

    if (error) {
      setStatus(`Erreur : ${error.message}`);
    } else {
      setStatus('Annonce créée avec succès');
      setFormData({
        titre: '',
        description: '',
        adresse: '',
        ville: '',
        disponibilite: '',
        prix: '',
        type_poste: '',
        photos: '',
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Créer une annonce</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
          placeholder="Titre"
          className="input"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="input"
        />
        <input
          type="text"
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
          placeholder="Adresse"
          className="input"
        />
        <input
          type="text"
          name="ville"
          value={formData.ville}
          onChange={handleChange}
          placeholder="Ville"
          className="input"
        />
        <input
          type="text"
          name="disponibilite"
          value={formData.disponibilite}
          onChange={handleChange}
          placeholder="Disponibilités (séparées par des virgules)"
          className="input"
        />
        <input
          type="number"
          name="prix"
          value={formData.prix}
          onChange={handleChange}
          placeholder="Prix"
          className="input"
        />
        <input
          type="text"
          name="type_poste"
          value={formData.type_poste}
          onChange={handleChange}
          placeholder="Type de poste"
          className="input"
        />
        <input
          type="text"
          name="photos"
          value={formData.photos}
          onChange={handleChange}
          placeholder="URLs des photos (séparées par des virgules)"
          className="input"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Créer
        </button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
};

export default CreerAnnonce;
