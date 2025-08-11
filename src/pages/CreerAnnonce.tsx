import { useState } from 'react';
import { supabase } from '../supabase';
import toast, { Toaster } from 'react-hot-toast';

const DISPONIBILITES = ['Lundi matin', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export default function CreerAnnonce() {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [disponibilite, setDisponibilite] = useState<string[]>([]);
  const [prix, setPrix] = useState('');
  const [typePoste, setTypePoste] = useState('coiffeur');
  const [photos, setPhotos] = useState('');

  const toggleDispo = (d: string) => {
    setDisponibilite(prev => (prev.includes(d) ? prev.filter(v => v !== d) : [...prev, d]));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.error('Utilisateur non connecté');
      return;
    }
    const { error } = await supabase.from('annonces').insert({
      user_id: user.id,
      titre,
      description,
      adresse,
      ville,
      disponibilite,
      prix: Number(prix),
      type_poste: typePoste,
      photos: photos.split('\n').filter(Boolean),
    });
    if (error) toast.error(error.message);
    else {
      toast.success('Annonce créée');
      setTitre('');
      setDescription('');
      setAdresse('');
      setVille('');
      setDisponibilite([]);
      setPrix('');
      setTypePoste('coiffeur');
      setPhotos('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 card">
      <Toaster />
      <h1 className="text-2xl mb-4 font-playfair">Créer une annonce</h1>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block mb-1">Titre</label>
          <input className="input" value={titre} onChange={e => setTitre(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea className="input h-24" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">Adresse</label>
          <input className="input" value={adresse} onChange={e => setAdresse(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">Ville</label>
          <input className="input" value={ville} onChange={e => setVille(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1">Disponibilités</label>
          <div className="flex flex-wrap gap-2">
            {DISPONIBILITES.map(d => (
              <label key={d} className="flex items-center gap-1">
                <input type="checkbox" checked={disponibilite.includes(d)} onChange={() => toggleDispo(d)} />
                <span>{d}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-1">Prix (€/jour)</label>
          <input className="input" type="number" value={prix} onChange={e => setPrix(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1">Type de poste</label>
          <select className="input" value={typePoste} onChange={e => setTypePoste(e.target.value)}>
            <option value="coiffeur">Coiffeur</option>
            <option value="barbier">Barbier</option>
            <option value="esthétique">Esthétique</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Photos (URLs, une par ligne)</label>
          <textarea className="input h-24" value={photos} onChange={e => setPhotos(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary w-full">Publier</button>
      </form>
    </div>
  );
}
