import React from "react";
import CarouselPro from "../components/CarouselPro";

const LandingPage: React.FC = () => {
  const images = [
    { src: "/images/event1.jpg", alt: "Événement professionnel" },
    { src: "/images/event2.jpg", alt: "Mariage élégant" },
    { src: "/images/event3.jpg", alt: "Soirée festive" },
  ];

  return (
    <div className="bg-base text-white">
      {/* HERO */}
      <section className="section grid lg:grid-cols-2 gap-10 items-center container-page">
        <div className="space-y-6">
          <h1 className="title-hero">
            Trouvez les <span className="text-accent">meilleurs prestataires</span> pour vos événements
          </h1>
          <p className="text-lead">
            Sharings connecte salons de coiffure, indépendants et organisateurs d’événements pour créer des
            collaborations uniques et rentables.
          </p>
          <div className="flex gap-4">
            <a href="/signup?type=salon" className="btn-primary">Je suis un Salon</a>
            <a href="/signup?type=independant" className="btn-ghost">Je suis un Indépendant</a>
          </div>
        </div>
        <div>
          <CarouselPro images={images} intervalMs={4000} />
        </div>
      </section>

      {/* POURQUOI SHARINGS */}
      <section id="features" className="section container-page grid sm:grid-cols-3 gap-6">
        {[
          { title: "Gagnez du temps", desc: "Des recherches simples, rapides et ciblées." },
          { title: "Boostez vos revenus", desc: "Rentabilisez vos espaces ou services vacants." },
          { title: "Sécurité assurée", desc: "Des échanges sécurisés et vérifiés." },
        ].map((f, i) => (
          <div key={i} className="card text-center">
            <h3 className="title-h2 mb-2">{f.title}</h3>
            <p className="text-white/70">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section id="how" className="section container-page">
        <h2 className="title-h2 mb-8 text-center">Comment ça marche ?</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { step: "1", title: "Inscrivez-vous", desc: "Créez un compte en quelques secondes." },
            { step: "2", title: "Publiez / Recherchez", desc: "Ajoutez une annonce ou trouvez un prestataire." },
            { step: "3", title: "Collaborez", desc: "Finalisez vos accords en toute confiance." },
          ].map((s, i) => (
            <div key={i} className="card text-center">
              <div className="chip mb-3">{s.step}</div>
              <h3 className="title-h2 mb-2">{s.title}</h3>
              <p className="text-white/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section bg-primary text-white text-center">
        <h2 className="title-h2 mb-4">Prêt à commencer ?</h2>
        <p className="mb-6">Rejoignez la communauté Sharings et développez vos opportunités.</p>
        <a href="/signup" className="btn bg-accent text-black hover:opacity-90">Créer un compte</a>
      </section>

      {/* FOOTER */}
      <footer className="section bg-base/80 border-t border-white/10 text-center text-white/60 text-sm">
        © {new Date().getFullYear()} Sharings — Tous droits réservés
      </footer>
    </div>
  );
};

export default LandingPage;
