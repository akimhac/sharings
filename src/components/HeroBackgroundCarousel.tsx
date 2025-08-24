import BackgroundCarousel, { type Image } from "./BackgroundCarousel";

type Props = {
  images: Image[];
  intervalMs?: number;
};

export default function HeroBackgroundCarousel({ images, intervalMs }: Props) {
  return <BackgroundCarousel images={images} intervalMs={intervalMs} />;
}
