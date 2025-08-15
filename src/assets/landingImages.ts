export interface LandingImage {
  src: string;
  srcSet: string;
  alt: string;
}

const makeSrc = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?w=${width}&auto=format&fit=crop&q=80`;

const makeSrcSet = (id: string) =>
  `${makeSrc(id, 600)} 600w, ${makeSrc(id, 1200)} 1200w, ${makeSrc(id, 1600)} 1600w`;

export const landingImages: LandingImage[] = [
  {
    src: makeSrc("photo-1500917728211-40e4c258734e", 1200),
    srcSet: makeSrcSet("photo-1500917728211-40e4c258734e"),
    alt: "Salon de coiffure lumineux",
  },
  {
    src: makeSrc("photo-1522335789203-aabd1fc54bc9", 1200),
    srcSet: makeSrcSet("photo-1522335789203-aabd1fc54bc9"),
    alt: "Professionnelle de beauté au travail",
  },
  {
    src: makeSrc("photo-1522336572468-97b1d1be1d54", 1200),
    srcSet: makeSrcSet("photo-1522336572468-97b1d1be1d54"),
    alt: "Maquillage en salon",
  },
  {
    src: makeSrc("photo-1527515637460-6a5f9a0e118a", 1200),
    srcSet: makeSrcSet("photo-1527515637460-6a5f9a0e118a"),
    alt: "Espace de travail moderne",
  },
];

export const FALLBACK_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMjAwJyBoZWlnaHQ9JzY3NSc+PHJlY3Qgd2lkdGg9JzEyMDAnIGhlaWdodD0nNjc1JyBmaWxsPScjZWFlZWY2Jy8+PC9zdmc+";
