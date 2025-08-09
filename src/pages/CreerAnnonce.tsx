import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const CreerAnnonce = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    ville: '',
    prix: ''
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('annonces')
      .insert([{ ...formData, prix: parseFloat(formData.prix) }]);

    if (error) {
      setStatus(`Erreur : ${error.message}`);
    } else {
      setStatus('Annonce créée avec succès');
      setFormData({ titre: '', description: '', ville: '', prix: '' });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Créer une annonce</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
          placeholder="Titre"
          className="w-full border rounded p-2"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          name="ville"
          value={formData.ville}
          onChange={handleChange}
          placeholder="Ville"
          className="w-full border rounded p-2"
        />
        <input
          type="number"
          name="prix"
          value={formData.prix}
          onChange={handleChange}
          placeholder="Prix"
          className="w-full border rounded p-2"
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
