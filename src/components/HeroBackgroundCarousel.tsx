import BackgroundCarousel, { type Slide } from "./BackgroundCarousel";

type Props = {
  images: Slide[];
  intervalMs?: number;
};

export default function HeroBackgroundCarousel({ images, intervalMs }: Props) {
  return <BackgroundCarousel slides={images} intervalMs={intervalMs} />;
}
