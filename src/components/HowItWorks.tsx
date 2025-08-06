import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Inscription",
      description: "Créez votre compte en quelques clics",
      image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      number: "02",
      title: "Recherche",
      description: "Trouvez le salon idéal dans votre région",
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      number: "03",
      title: "Réservation",
      description: "Choisissez votre durée de location et signez en ligne",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      number: "04",
      title: "Installation",
      description: "Commencez à travailler dans votre nouveau salon",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div id="how-it-works" className="py-12 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Comment ça marche</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            En 4 étapes simples
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-blue-200 transform -translate-y-1/2 hidden lg:block" />
            
            <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="object-cover w-full h-48 rounded-lg shadow-lg"
                        />
                      </div>
                      <div className="absolute -top-4 -left-4 flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold text-lg shadow-xl">
                        {step.number}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-base text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;