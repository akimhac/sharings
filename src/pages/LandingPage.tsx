import React, { useEffect, useMemo, useRef, useState } from "react";
import { Listing, sampleListings } from "../data/sampleListings";
import { haversine } from "../lib/geo";
import React, { useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import BackgroundCarousel from "../components/BackgroundCarousel";
import { HERO_BG_IMAGES } from "../data/heroImages";
 main

/** ------------------------------------------------------------------
 *  PAGE D’ACCUEIL SHARINGS – Version “tout-en-un”
 *  - Hero avec carrousel
 *  - Sections “Avantages”, “Comment ça marche”
 *  - Barre de recherche + cartes d’annonces (données d’exemple FR)
 *  - Auth fictive + modal “Proposer un espace”
 *  ------------------------------------------------------------------ */

type User = { id: number; name: string; email: string; type: "salon" | "freelancer" };

const sampleListings: Listing[] = [
  {
    id: 1, title: "Salon Jean-Claude Biguine Premium", location: "Paris 1er",
    lat: 48.8566, lng: 2.3522, price: 75, type: "coiffure",
    distance: null, rating: 4.9, reviewsCount: 147,
    description: "🌟 Salon de prestige au cœur de Paris. Équipements haut de gamme, ambiance luxueuse et clientèle VIP.",
    features: ["Shampoing premium", "Séchoir Dyson", "Wifi fiber", "Parking privé", "Climatisation", "Café offert"],
    address: "15 rue de Rivoli, 75001 Paris", phone: "01.42.36.12.34",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
    ratings: { cleanliness: 4.9, equipment: 4.8, location: 4.9, value: 4.7, service: 5.0 }
  },
  {
    id: 2, title: "Institut Clarins Prestige", location: "Lyon 6ème",
    lat: 45.7640, lng: 4.8357, price: 65, type: "esthétique",
    distance: null, rating: 4.8, reviewsCount: 98,
    description: "✨ Institut de beauté renommé avec cabines privées et gamme complète de produits Clarins inclus.",
    features: ["Cabine privée", "Produits Clarins", "Éclairage LED", "Musique zen", "Thé premium", "Vestiaire"],
    address: "28 cours Franklin Roosevelt, 69006 Lyon", phone: "04.78.24.56.78",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
    ratings: { cleanliness: 5.0, equipment: 4.9, location: 4.8, value: 4.6, service: 4.9 }
  },
  {
    id: 3, title: "Nail Bar Marseille Creator", location: "Marseille 2ème",
    lat: 43.2965, lng: 5.3698, price: 45, type: "nail-art",
    distance: null, rating: 4.7, reviewsCount: 156,
    description: "💅 Le temple du nail art marseillais ! Plus de 300 vernis, techniques avant-gardistes et spot Instagram.",
    features: ["300+ vernis", "Nail art pro", "Lampe UV/LED", "Strass & déco", "Photo studio", "Musique"],
    address: "45 La Canebière, 13002 Marseille", phone: "04.91.55.78.90",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
    ratings: { cleanliness: 4.6, equipment: 4.8, location: 4.5, value: 4.8, service: 4.7 }
  },
  {
    id: 4, title: "Barbier Le Figaro Vintage", location: "Toulouse Centre",
    lat: 43.6047, lng: 1.4442, price: 55, type: "barbier",
    distance: null, rating: 4.6, reviewsCount: 203,
    description: "🪒 Barbier authentique avec ambiance vintage années 50. Rasage traditionnel et whisky offert !",
    features: ["Rasoir traditionnel", "Aftershave premium", "Ambiance vintage", "Whisky offert", "Journaux", "Cigare"],
    address: "12 place du Capitole, 31000 Toulouse", phone: "05.61.23.45.67",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop",
    ratings: { cleanliness: 4.5, equipment: 4.7, location: 4.8, value: 4.4, service: 4.6 }
  },
  {
    id: 5, title: "Extensions Paradise Vue Mer", location: "Nice Promenade",
    lat: 43.7102, lng: 7.2620, price: 95, type: "extension",
    distance: null, rating: 4.9, reviewsCount: 78,
    description: "💇‍♀️ Spécialiste extensions cheveux naturels avec vue imprenable sur la Méditerranée. Expérience VIP !",
    features: ["Cheveux naturels", "Vue mer panoramique", "Parking privé", "Champagne", "Photos pro", "Terrasse"],
    address: "8 Promenade des Anglais, 06000 Nice", phone: "04.93.87.65.43",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop",
    ratings: { cleanliness: 4.9, equipment: 5.0, location: 5.0, value: 4.6, service: 4.9 }
  },
  {
    id: 6, title: "Spa Urbain Bordeaux Zen", location: "Bordeaux Centre",
    lat: 44.8378, lng: -0.5792, price: 70, type: "massage",
    distance: null, rating: 4.8, reviewsCount: 112,
    description: "🧘‍♀️ Espace détente zen au cœur de Bordeaux. Massages thérapeutiques et soins holistiques.",
    features: ["Table massage chauffante", "Huiles bio", "Diffuseurs d'arômes", "Thé détox", "Vestiaire privé", "Douche"],
    address: "33 cours de l'Intendance, 33000 Bordeaux", phone: "05.56.78.90.12",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
    ratings: { cleanliness: 4.9, equipment: 4.7, location: 4.6, value: 4.8, service: 4.9 }
  }
];

const heroImages = HERO_BG_IMAGES.map((src) => ({ src }));

 main
export default function LandingPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [listings, setListings] = useState<Listing[]>(() => sampleListings.map(l => ({ ...l })));
  const [priceMax, setPriceMax] = useState<number>(100);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [locationQuery, setLocationQuery] = useState<string>("");
  const [authMode, setAuthMode] = useState<"login"|"register">("login");
  const [showAuth, setShowAuth] = useState(false);
  const [showListingModal, setShowListingModal] = useState(false);

  // Carrousel géré par React (via BackgroundCarousel)

  // Animations “fadeInUp” sur les cards
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) (e.target as HTMLElement).style.animation = "fadeInUp .6s ease forwards";
      });
    }, { threshold: 0.1 });
    document.querySelectorAll(".feature-card").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Calcul distance depuis géoloc utilisateur
  const computeDistances = (pos: { lat: number; lng: number }) => {
    setListings(prev =>
      prev.map(l => {
        if (!l.lat || !l.lng) return { ...l, distance: null };
        return { ...l, distance: haversine(pos.lat, pos.lng, l.lat, l.lng) };
      })
    );
  };

  const askGeoloc = () => {
    if (!navigator.geolocation) {
      notify("❌ Géolocalisation non supportée", "error");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => {
        const pos = { lat: p.coords.latitude, lng: p.coords.longitude };
        computeDistances(pos);
        notify("📍 Position mise à jour", "success");
      },
      () => notify("❌ Impossible de récupérer votre position", "error")
    );
  };

  // Recherche côté client
  const filtered = useMemo(() => {
    return listings.filter(l => {
      const okLoc = !locationQuery || l.location.toLowerCase().includes(locationQuery.toLowerCase());
      const okType = !typeFilter || l.type === typeFilter;
      const okPrice = l.price <= priceMax;
      return okLoc && okType && okPrice;
    });
  }, [listings, locationQuery, typeFilter, priceMax]);

  // Auth fictive
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const email = String(fd.get("email") || "");
    const name = email.split("@")[0] || "Invité";
    const type: User["type"] = email.includes("salon") ? "salon" : "freelancer";
    setCurrentUser({ id: 1, email, name, type });
    setShowAuth(false);
    notify("🎉 Connexion réussie !", "success");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const name = String(fd.get("name") || "Utilisateur");
    const email = String(fd.get("email") || "");
    const type = (String(fd.get("type") || "freelancer") as User["type"]);
    setCurrentUser({ id: Date.now(), name, email, type });
    setShowAuth(false);
    notify("🎉 Compte créé avec succès !", "success");
  };

  const logout = () => {
    setCurrentUser(null);
    notify("👋 Déconnexion réussie", "success");
  };

  // Publication d’une annonce (fictive)
  const submitListing = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const l: Listing = {
      id: Date.now(),
      title: String(fd.get("title") || ""),
      location: String(fd.get("address") || ""),
      price: Number(fd.get("price") || 0),
      type: String(fd.get("ltype") || ""),
      description: String(fd.get("desc") || ""),
      lat: null, lng: null, distance: null,
      rating: 5, reviewsCount: 0,
      features: [],
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&h=600"
    };
    setListings(prev => [l, ...prev]);
    setShowListingModal(false);
    notify("🚀 Annonce publiée avec succès", "success");
    (e.target as HTMLFormElement).reset();
  };

  // Notifications via react-hot-toast
  const notify = (
    msg: string,
    type: "success" | "error" | "warning" | "info" = "info"
  ) => {
    if (type === "success") toast.success(msg);
    else if (type === "error") toast.error(msg);
    else if (type === "warning") toast(msg, { icon: "⚠️" });
    else toast(msg);
  };

  return (
    <>
      <Toaster position="top-right" />
      {/* NAV */}
      <nav className="navbar">
        <div className="nav-container">
          <a className="logo" href="#">Sharings</a>

          <div className="nav-links">
            <a href="#listings">🔍 Explorer</a>
            <a href="#features">✨ Avantages</a>
            <a href="#how">❓ Comment ça marche</a>
          </div>

          <div className="cta">
            {currentUser ? (
              <>
                <span className="hello">👋 {currentUser.name}</span>
                <button className="btn-outline" onClick={logout}>Déconnexion</button>
                {currentUser.type === "salon" ? (
                  <button className="btn-primary" onClick={() => setShowListingModal(true)}>💼 Ajouter une annonce</button>
                ) : (
                  <button className="btn-primary" onClick={() => notify("🔍 Utilisez la recherche pour trouver un espace !","info")}>Rechercher</button>
                )}
              </>
            ) : (
              <>
                <button className="btn-outline" onClick={() => { setAuthMode("login"); setShowAuth(true); }}>Se connecter</button>
                <button className="btn-primary" onClick={() => { setAuthMode("register"); setShowAuth(true); }}>Créer un compte</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <BackgroundCarousel images={heroImages} intervalMs={5000} className="hero-carousel" />
        <div className="hero-content">
          <h1 className="hero-title">Révolutionnez votre activité beauté</h1>
          <p className="hero-subtitle">
            La marketplace qui connecte propriétaires d'espaces et pros de la beauté.
            Louez, réservez, prospérez — en toute simplicité.
          </p>
          <div className="hero-cta">
            <a href="#listings" className="btn-lg btn-white">🔍 Découvrir les espaces</a>
            <button className="btn-lg btn-glass" onClick={() => {
              if (!currentUser) { setAuthMode("login"); setShowAuth(true); notify("🔐 Connectez-vous pour proposer un espace", "warning"); return; }
              if (currentUser.type !== "salon") { notify("❌ Réservé aux propriétaires d'espaces", "error"); return; }
              setShowListingModal(true);
            }}>💼 Proposer mon espace</button>
          </div>
        </div>
      </section>

      <main className="main">
        {/* AVANTAGES */}
        <section className="section" id="features">
          <div className="container">
            <h2 className="section-title">Pourquoi choisir Sharings ?</h2>
            <p className="section-sub">La plateforme qui connecte talents et espaces — simple, rapide, rentable.</p>

            <div className="grid">
              <div className="feature-card">
                <div className="feature-ico">🏪</div>
                <h3>Propriétaires d'espaces</h3>
                <p>💰 Maximisez vos revenus en louant vos sièges libres. Attirez des pros qualifiés et gérez tout en ligne.</p>
              </div>
              <div className="feature-card">
                <div className="feature-ico">✨</div>
                <h3>Professionnels nomades</h3>
                <p>🎯 Libérez-vous des contraintes : trouvez l’espace idéal, réservez en 2 clics, concentrez-vous sur votre art.</p>
              </div>
              <div className="feature-card">
                <div className="feature-ico">🚀</div>
                <h3>Expérience premium</h3>
                <p>💬 Messagerie, contrats automatisés, paiements sécurisés. Tout est pensé pour votre réussite.</p>
              </div>
            </div>
          </div>
        </section>

        {/* LISTINGS */}
        <section className="section listings" id="listings">
          <div className="container">
            <h2 className="section-title">🔥 Espaces disponibles</h2>
            <p className="section-sub">Découvrez les meilleurs spots beauté près de chez vous</p>

            <div className="search">
              <div className="search-location">
                <input
                  value={locationQuery}
                  onChange={e => setLocationQuery(e.target.value)}
                  placeholder="🌍 Ville ou adresse..."
                />
                <button className="loc-btn" onClick={askGeoloc} title="Ma position">📍</button>
              </div>

              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                <option value="">🎨 Type de prestation</option>
                <option value="coiffure">✂️ Coiffure</option>
                <option value="esthétique">💆‍♀️ Esthétique</option>
                <option value="nail-art">💅 Nail art</option>
                <option value="massage">🤲 Massage</option>
                <option value="barbier">🪒 Barbier</option>
                <option value="extension">💇‍♀️ Extensions</option>
              </select>

              <div className="price">
                <label>💰 Budget max: <b>{priceMax}€</b></label>
                <input type="range" min={20} max={200} value={priceMax} onChange={e => setPriceMax(Number(e.target.value))} />
              </div>

              <button className="btn-primary search-btn" onClick={() => notify("🔎 Filtre appliqué","info")}>Rechercher</button>
            </div>

            <div className="cards">
              {filtered.map(l => (
                <article key={l.id} className="card" onClick={() => notify(`👀 ${l.title}`, "info")}>
                  <div className="card-img">
                    <img src={l.image} alt={l.title} />
                    <div className="badge-price">{l.price}€/jour</div>
                  </div>
                  <div className="card-body">
                    <h3 className="title">{l.title}</h3>
                    <div className="loc">📍 {l.location}</div>
                    <p className="desc">{l.description}</p>

                    <div className="footer">
                      <span className="rating">⭐ {l.rating} ({l.reviewsCount})</span>
                      {typeof l.distance === "number" && (
                        <span className="dist">📍 {l.distance.toFixed(1)} km</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section" id="how">
          <div className="container">
            <h2 className="section-title">⚡ Comment ça marche ?</h2>
            <p className="section-sub">En 3 étapes simples, révolutionnez votre façon de travailler</p>

            <div className="grid">
              <div className="feature-card">
                <div className="feature-ico">1️⃣</div>
                <h3>Inscrivez-vous</h3>
                <p>Créez votre compte en 2 minutes. Choisissez : propriétaire d’espace ou pro nomade.</p>
              </div>
              <div className="feature-card">
                <div className="feature-ico">2️⃣</div>
                <h3>Trouvez ou proposez</h3>
                <p>Recherchez l’espace parfait près de vous ou publiez votre annonce en quelques clics.</p>
              </div>
              <div className="feature-card">
                <div className="feature-ico">3️⃣</div>
                <h3>Réservez et travaillez</h3>
                <p>Réservation instantanée, paiement sécurisé — concentrez-vous sur vos clients.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL AUTH */}
      {showAuth && (
        <div className="modal" onClick={(e) => { if (e.target === e.currentTarget) setShowAuth(false); }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>{authMode === "login" ? "🔐 Se connecter" : "✨ Créer un compte"}</h3>
              <button className="close" onClick={() => setShowAuth(false)}>&times;</button>
            </div>
            <div className="modal-body">
              {authMode === "login" ? (
                <form onSubmit={handleLogin} className="form">
                  <label>📧 Email</label>
                  <input name="email" type="email" required placeholder="vous@exemple.com" />
                  <label>🔒 Mot de passe</label>
                  <input name="password" type="password" required placeholder="••••••••" />
                  <button className="btn-primary btn-full" type="submit">Se connecter</button>
                  <p className="switch">Pas encore de compte ? <a onClick={() => setAuthMode("register")}>S’inscrire</a></p>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="form">
                  <label>👤 Type de compte</label>
                  <select name="type" defaultValue="" required>
                    <option value="" disabled>Choisir…</option>
                    <option value="salon">🏪 Salon / Espace beauté</option>
                    <option value="freelancer">✨ Indépendant(e)</option>
                  </select>
                  <label>📝 Nom complet</label>
                  <input name="name" required placeholder="Jean Dupont" />
                  <label>📧 Email</label>
                  <input name="email" type="email" required placeholder="vous@exemple.com" />
                  <label>🔒 Mot de passe</label>
                  <input name="password" type="password" required placeholder="••••••••" />
                  <button className="btn-primary btn-full" type="submit">Créer mon compte</button>
                  <p className="switch">Déjà inscrit ? <a onClick={() => setAuthMode("login")}>Se connecter</a></p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL PROPOSER UN ESPACE */}
      {showListingModal && (
        <div className="modal" onClick={(e) => { if (e.target === e.currentTarget) setShowListingModal(false); }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>💼 Proposer un espace</h3>
              <button className="close" onClick={() => setShowListingModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <form className="form" onSubmit={submitListing}>
                <label>✨ Titre de l'annonce</label>
                <input name="title" required placeholder="Ex: Siège coiffure centre-ville" />
                <label>📍 Adresse</label>
                <input name="address" required placeholder="123 rue de la Beauté, Paris" />
                <label>🎨 Type d'espace</label>
                <select name="ltype" defaultValue="" required>
                  <option value="" disabled>Choisir…</option>
                  <option value="coiffure">✂️ Siège coiffure</option>
                  <option value="esthétique">💆‍♀️ Cabine esthétique</option>
                  <option value="nail-art">💅 Table manucure</option>
                  <option value="massage">🤲 Cabine massage</option>
                  <option value="barbier">🪒 Poste barbier</option>
                  <option value="extension">💇‍♀️ Extensions</option>
                </select>
                <label>💰 Prix par jour (€)</label>
                <input name="price" type="number" min={0} required placeholder="50" />
                <label>📝 Description</label>
                <textarea name="desc" placeholder="Décrivez votre espace, équipements, ambiance…" />
                <button className="btn-primary btn-full" type="submit">Publier l’annonce</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* STYLES */}
      <style>{`
        :root {
          --primary: #ff385c;
          --primary-dark: #e31c5f;
          --secondary: #667eea;
          --text: #222;
          --muted: #717171;
          --border: #ddd;
          --bg: #f7f7f7;
          --shadow: 0 2px 16px rgba(0,0,0,.12);
          --shadow2: 0 12px 40px rgba(0,0,0,.12);
          --radius: 12px;
          --max: 1200px;
        }
        *{box-sizing:border-box}
        html,body{margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;color:var(--text);background:#fff}
        a{color:inherit;text-decoration:none;cursor:pointer}

        /* Navbar */
        .navbar{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(255,255,255,.95);backdrop-filter:blur(20px);border-bottom:1px solid rgba(221,221,221,.3)}
        .nav-container{max-width:var(--max);margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:80px;padding:0 24px}
        .logo{font-size:1.8rem;font-weight:900;letter-spacing:-.02em;background:linear-gradient(135deg,var(--primary),var(--secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .nav-links{display:flex;gap:28px}
        .nav-links a{position:relative;font-weight:600}
        .nav-links a::after{content:"";position:absolute;left:0;bottom:-4px;width:0;height:2px;background:var(--primary);transition:width .2s}
        .nav-links a:hover::after{width:100%}
        .cta{display:flex;align-items:center;gap:12px}
        .hello{font-weight:700}
        .btn-outline{padding:10px 18px;border:2px solid var(--border);border-radius:24px;background:#fff;font-weight:700}
        .btn-outline:hover{border-color:var(--primary);color:var(--primary)}
        .btn-primary{padding:10px 18px;border:none;border-radius:24px;background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff;font-weight:800;box-shadow:0 6px 20px rgba(255,56,92,.35)}
        .btn-primary:hover{transform:translateY(-1px)}
        .btn-lg{padding:18px 36px;border-radius:30px;font-size:1.1rem;font-weight:800;box-shadow:0 6px 25px rgba(0,0,0,.25)}
        .btn-white{background:#fff}
        .btn-glass{background:rgba(255,255,255,.15);border:2px solid rgba(255,255,255,.5);color:#fff}

        /* Hero */
        .hero{height:100vh;min-height:680px;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden}
        .hero-content{position:relative;z-index:2;text-align:center;color:#fff;max-width:900px;padding:0 24px}
        .hero-title{font-size:clamp(2.5rem,8vw,5.2rem);font-weight:900;letter-spacing:-.02em;margin:0 0 12px;text-shadow:0 4px 20px rgba(0,0,0,.45)}
        .hero-subtitle{font-size:clamp(1.1rem,3vw,1.6rem);opacity:.95;margin:0 0 32px}

        .main{margin-top:80px}
        .section{padding:96px 0}
        .container{max-width:var(--max);margin:0 auto;padding:0 24px}
        .section-title{text-align:center;font-size:clamp(2.2rem,5vw,3.4rem);font-weight:900;margin:0 0 10px}
        .section-sub{text-align:center;color:var(--muted);max-width:720px;margin:0 auto 64px}

        .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:32px}
        .feature-card{background:#fff;border:1px solid var(--border);border-radius:var(--radius);padding:40px;text-align:center;box-shadow:var(--shadow);opacity:0}
        .feature-ico{width:72px;height:72px;border-radius:18px;margin:0 auto 18px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--primary),var(--secondary));color:#fff;font-size:28px}

        /* Listings */
        .listings{background:linear-gradient(135deg,var(--bg) 0%,#fff 100%)}
        .search{display:grid;grid-template-columns:2fr 1fr 1.2fr 160px;gap:16px;background:#fff;border:1px solid rgba(255,255,255,.8);border-radius:20px;box-shadow:0 8px 40px rgba(0,0,0,.08);padding:22px;margin-bottom:40px}
        .search-location{display:flex;gap:10px}
        .search-location input, select{flex:1;padding:14px 16px;border:2px solid var(--border);border-radius:12px;outline:none}
        .search-location input:focus, select:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(255,56,92,.12)}
        .loc-btn{border:none;border-radius:12px;padding:0 14px;font-size:20px;background:linear-gradient(135deg,var(--primary),var(--primary-dark));color:#fff}
        .price{display:flex;flex-direction:column;gap:8px}
        .price input[type="range"]{width:100%}
        .search-btn{font-weight:900;border-radius:12px}
        .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:28px}
        .card{background:#fff;border:1px solid rgba(221,221,221,.4);border-radius:20px;overflow:hidden;box-shadow:var(--shadow);cursor:pointer;transition:transform .25s, box-shadow .25s}
        .card:hover{transform:translateY(-4px);box-shadow:var(--shadow2)}
        .card-img{position:relative;height:240px}
        .card-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .35s}
        .card:hover .card-img img{transform:scale(1.04)}
        .badge-price{position:absolute;top:16px;right:16px;background:rgba(0,0,0,.8);color:#fff;font-weight:800;border-radius:18px;padding:8px 12px}
        .card-body{padding:20px}
        .title{margin:0 0 6px}
        .loc{color:var(--muted);margin-bottom:10px}
        .desc{color:var(--muted);margin:0 0 14px}
        .footer{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);padding-top:12px}
        .dist{background:rgba(102,126,234,.12);color:var(--secondary);border-radius:14px;padding:6px 10px;font-weight:700;font-size:.85rem}

        /* Modal */
        .modal{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:1200}
        .modal-content{background:#fff;border-radius:20px;max-width:640px;width:92%;box-shadow:0 20px 80px rgba(0,0,0,.3);overflow:hidden}
        .modal-header{display:flex;align-items:center;justify-content:space-between;padding:20px 22px;border-bottom:1px solid var(--border)}
        .modal-header h3{margin:0}
        .close{background:none;border:none;font-size:28px;cursor:pointer}
        .modal-body{padding:22px}
        .form{display:grid;gap:12px}
        .form input, .form select, .form textarea{padding:14px 16px;border:2px solid var(--border);border-radius:12px;outline:none}
        .form textarea{min-height:120px;resize:vertical}
        .btn-full{width:100%;padding:14px 18px;border-radius:12px;margin-top:4px}
        .switch{margin:8px 0 0;color:var(--muted)}
        .switch a{text-decoration:underline}

        /* Responsive */
        @media (max-width: 960px){
          .search{grid-template-columns:1fr 1fr 1fr;gap:14px}
          .search-btn{grid-column:1/-1}
        }
        @media (max-width: 720px){
          .nav-links{display:none}
          .hero{min-height:78vh}
          .search{grid-template-columns:1fr;gap:12px}
          .cards{grid-template-columns:1fr}
          .section{padding:72px 0}
        }

        /* Anim */
        @keyframes fadeInUp {from{opacity:.0;transform:translateY(18px)} to{opacity:1;transform:none}}
      `}</style>
    </>
  );
}

