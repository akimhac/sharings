export const HERO_IMAGES = [
  {
    // Local = zéro CORS/redirect → fiable
    src: "/hero/1.jpg",
    srcSet: "/hero/1.jpg 800w, /hero/1.jpg 1200w, /hero/1.jpg 1600w",
    alt: "Poste de coiffure moderne",
    // secours distant si jamais /hero absent
    fallback: "https://picsum.photos/1600/900?blur=0&random=11",
  },
  {
    src: "/hero/2.jpg",
    srcSet: "/hero/2.jpg 800w, /hero/2.jpg 1200w, /hero/2.jpg 1600w",
    alt: "Espace esthétique lumineux",
    fallback: "https://picsum.photos/1600/900?blur=0&random=12",
  },
  {
    src: "/hero/3.jpg",
    srcSet: "/hero/3.jpg 800w, /hero/3.jpg 1200w, /hero/3.jpg 1600w",
    alt: "Ambiance chaleureuse en salon",
    fallback: "https://picsum.photos/1600/900?blur=0&random=13",
  },
] as const;
