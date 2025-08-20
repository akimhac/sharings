codex/add-background-carousel-and-styling-components
import type { Slide } from "../components/BackgroundCarousel";

export const HERO_BG_IMAGES: Slide[] = [
  {
    src: "/hero/1.jpg",
    srcSet: "/hero/1.jpg 800w, /hero/1.jpg 1200w, /hero/1.jpg 1600w",
    alt: "Ambiance chaleureuse en salon",
    objectPosition: "center",
  },
  {
    src: "/hero/2.jpg",
    srcSet: "/hero/2.jpg 800w, /hero/2.jpg 1200w, /hero/2.jpg 1600w",
    alt: "Poste de coiffure moderne",
    objectPosition: "center",
  },
  {
    src: "/hero/3.jpg",
    srcSet: "/hero/3.jpg 800w, /hero/3.jpg 1200w, /hero/3.jpg 1600w",
    alt: "Équipe professionnelle en action",
    objectPosition: "center",
  },
];
export const HERO_BG_IMAGES = [
  { src: "/hero/1.jpg", srcSet: "/hero/1.jpg 800w, /hero/1.jpg 1200w, /hero/1.jpg 1600w", alt: "Ambiance chaleureuse en salon", objectPosition: "center" },
  { src: "/hero/2.jpg", srcSet: "/hero/2.jpg 800w, /hero/2.jpg 1200w, /hero/2.jpg 1600w", alt: "Poste de coiffure moderne", objectPosition: "center" },
  { src: "/hero/3.jpg", srcSet: "/hero/3.jpg 800w, /hero/3.jpg 1200w, /hero/3.jpg 1600w", alt: "Équipe professionnelle en action", objectPosition: "center" },
] as const;
main