import React from 'react';
import { Brain, MapPin, Contact as FileContract, Sparkles, Shield, Clock, Gift, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-blue-600" />,
      title: "Assistant IA Juridique",
      description: "Générez et personnalisez vos contrats automatiquement avec notre assistant juridique intelligent",
      image: "https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg"
    },
    {
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      title: "Géolocalisation Avancée",
      description: "Trouvez les meilleurs talents ou espaces de travail près de chez vous",
      image: "https://images.pexels.com/photos/7319307/pexels-photo-7319307.jpeg"
    },
    {
      icon: <FileContract className="h-6 w-6 text-blue-600" />,
      title: "Contrats Simplifiés",
      description: "Création de contrats sur-mesure pour tous les professionnels de la beauté",
      image: "https://images.pexels.com/photos/7642000/pexels-photo-7642000.jpeg"
    },
    {
      icon: <Sparkles className="h-6 w-6 text-blue-600" />,
      title: "Multi-Services",
      description: "Pour tous les indépendants : coiffure, esthétique, onglerie, et plus encore",
      image: "https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg"
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Sécurité Garantie",
      description: "Paiements et données personnelles sécurisés",
      image: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg"
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Flexibilité Totale",
      description: "Réservez à l'heure, à la journée ou au mois",
      image: "https://images.pexels.com/photos/3993132/pexels-photo-3993132.jpeg"
    },
    {
      icon: <Gift className="h-6 w-6 text-blue-600" />,
      title: "Offre de Lancement",
      description: "Inscription gratuite pour les premiers inscrits",
      image: "https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg"
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Communauté Vérifiée",
      description: "Professionnels et établissements certifiés",
      image: "https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg"
    }
  ];

  return (
    <div id="features" className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Fonctionnalités</h2>
          <p className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Une solution complète pour les professionnels de la beauté
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Connectez-vous, collaborez et développez votre activité en toute simplicité
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 z-20 bg-white/90 p-2 rounded-lg shadow-lg">
                    {feature.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;