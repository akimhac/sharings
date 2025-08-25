export type Listing = {
  id: number;
  title: string;
  location: string;
  lat: number | null;
  lng: number | null;
  price: number;
  type: "coiffure" | "esthétique" | "nail-art" | "barbier" | "extension" | "massage";
  distance: number | null;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
  address: string;
  phone: string;
  image: string;
};

export const sampleListings: Listing[] = [
  {
    id: 1,
    title: "Salon Jean-Claude Biguine Premium",
    location: "Paris 1er",
    lat: 48.8566,
    lng: 2.3522,
    price: 75,
    type: "coiffure",
    distance: null,
    rating: 4.9,
    reviewsCount: 147,
    description:
      "\uD83C\uDF1F Salon de prestige au c\u0153ur de Paris. \u00C9quipements haut de gamme, ambiance luxueuse et client\u00E8le VIP.",
    features: ["Shampoing premium", "S\u00E9choir Dyson", "Wifi fiber", "Parking priv\u00E9", "Climatisation", "Caf\u00E9 offert"],
    address: "15 rue de Rivoli, 75001 Paris",
    phone: "01.42.36.12.34",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    title: "Institut Clarins Prestige",
    location: "Lyon 6\u00E8me",
    lat: 45.764,
    lng: 4.8357,
    price: 65,
    type: "esth\u00E9tique",
    distance: null,
    rating: 4.8,
    reviewsCount: 98,
    description:
      "\u2728 Institut de beaut\u00E9 renomm\u00E9 avec cabines priv\u00E9es et gamme compl\u00E8te de produits Clarins inclus.",
    features: ["Cabine priv\u00E9e", "Produits Clarins", "\u00C9clairage LED", "Musique zen", "Th\u00E9 premium", "Vestiaire"],
    address: "28 cours Franklin Roosevelt, 69006 Lyon",
    phone: "04.78.24.56.78",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    title: "Nail Bar Marseille Creator",
    location: "Marseille 2\u00E8me",
    lat: 43.2965,
    lng: 5.3698,
    price: 45,
    type: "nail-art",
    distance: null,
    rating: 4.7,
    reviewsCount: 156,
    description:
      "\uD83D\uDC85 Le temple du nail art marseillais ! Plus de 300 vernis, techniques avant-gardistes et spot Instagram.",
    features: ["300+ vernis", "Nail art pro", "Lampe UV/LED", "Strass & d\u00E9co", "Studio photo", "Musique"],
    address: "45 La Canebi\u00E8re, 13002 Marseille",
    phone: "04.91.55.78.90",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    title: "Barbier Le Figaro Vintage",
    location: "Toulouse Centre",
    lat: 43.6047,
    lng: 1.4442,
    price: 55,
    type: "barbier",
    distance: null,
    rating: 4.6,
    reviewsCount: 203,
    description:
      "\uD83E\uDEA2 Barbier authentique avec ambiance vintage ann\u00E9es 50. Rasage traditionnel et whisky offert !",
    features: ["Rasoir traditionnel", "Aftershave premium", "Ambiance vintage", "Whisky offert", "Journaux", "Cigare"],
    address: "12 place du Capitole, 31000 Toulouse",
    phone: "05.61.23.45.67",
    image:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    title: "Extensions Paradise Vue Mer",
    location: "Nice Promenade",
    lat: 43.7102,
    lng: 7.262,
    price: 95,
    type: "extension",
    distance: null,
    rating: 4.9,
    reviewsCount: 78,
    description:
      "\uD83D\uDC87\u200D\u2640\uFE0F Sp\u00E9cialiste extensions cheveux naturels avec vue imprenable sur la M\u00E9diterran\u00E9e. Exp\u00E9rience VIP !",
    features: ["Cheveux naturels", "Vue mer panoramique", "Parking priv\u00E9", "Champagne", "Photos pro", "Terrasse"],
    address: "8 Promenade des Anglais, 06000 Nice",
    phone: "04.93.87.65.43",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 6,
    title: "Spa Urbain Bordeaux Zen",
    location: "Bordeaux Centre",
    lat: 44.8378,
    lng: -0.5792,
    price: 70,
    type: "massage",
    distance: null,
    rating: 4.8,
    reviewsCount: 112,
    description:
      "\uD83E\uDD8C\u200D\u2640\uFE0F Massages th\u00E9rapeutiques et soins holistiques dans un cocon de bien-\u00EAtre.",
    features: ["Table chauffante", "Huiles bio", "Diffuseur d'ar\u00F4mes", "Th\u00E9 d\u00E9tox", "Vestiaire priv\u00E9", "Douche"],
    address: "33 cours de l'Intendance, 33000 Bordeaux",
    phone: "05.56.78.90.12",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=60",
  },
];
