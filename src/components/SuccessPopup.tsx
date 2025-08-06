import React from 'react';
import { X, CheckCircle } from 'lucide-react';

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

const SuccessPopup = ({ isOpen, onClose, email }: SuccessPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Félicitations !
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Votre inscription a été enregistrée avec succès.
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Un email de confirmation a été envoyé à <strong>{email}</strong>. Veuillez vérifier votre boîte de réception.
          </p>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;