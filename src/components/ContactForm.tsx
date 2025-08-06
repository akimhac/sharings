import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import toast, { Toaster } from 'react-hot-toast';
import SuccessPopup from './SuccessPopup';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'coiffeur',
    interest: 'location',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToast = toast.loading('Inscription en cours...');

    try {
      // First, create the registration record
      const { error: registrationError } = await supabase
        .from('registrations')
        .insert([formData]);

      if (registrationError) {
        console.error('Registration error:', registrationError);
        throw registrationError;
      }

      // Then call the Edge Function to handle user creation and email
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      toast.dismiss(loadingToast);
      toast.success('Inscription réussie !', {
        duration: 5000,
        icon: '✅'
      });
      
      setShowSuccessPopup(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'coiffeur',
        interest: 'location',
        message: ''
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast.dismiss(loadingToast);
      toast.error(error.message || 'Une erreur est survenue. Veuillez réessayer.', {
        duration: 5000,
        icon: '❌'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-gradient-to-b from-blue-600 to-blue-800 py-16">
      <Toaster 
        position="top-center"
        toastOptions={{
          className: 'text-sm font-medium',
          style: {
            background: '#fff',
            color: '#333',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
      <SuccessPopup 
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        email={formData.email}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Inscrivez-vous gratuitement
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Profitez de notre offre de lancement : inscription gratuite pour les premiers inscrits !
          </p>
        </div>
        <div className="mt-12 max-w-xl mx-auto bg-white rounded-xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email professionnel
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Je suis
              </label>
              <select
                name="role"
                id="role"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="coiffeur">Coiffeur(se)</option>
                <option value="estheticien">Esthéticien(ne)</option>
                <option value="prothesiste">Prothésiste ongulaire</option>
                <option value="barbier">Barbier</option>
                <option value="maquilleur">Maquilleur(se) professionnel(le)</option>
                <option value="salon">Propriétaire de salon</option>
                <option value="institut">Propriétaire d'institut de beauté</option>
              </select>
            </div>
            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-gray-700">
                Je cherche
              </label>
              <select
                name="interest"
                id="interest"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.interest}
                onChange={handleChange}
              >
                <option value="location">À louer un espace</option>
                <option value="professionnel">À trouver un(e) professionnel(le)</option>
                <option value="rentabilisation">À rentabiliser mon espace</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message (optionnel)
              </label>
              <textarea
                name="message"
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.message}
                onChange={handleChange}
                placeholder="Précisez vos besoins spécifiques..."
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Inscription en cours...' : "S'inscrire gratuitement"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;