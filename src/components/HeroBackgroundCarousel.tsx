import type { ComponentProps } from "react";
import BackgroundCarousel, { type Slide } from "./BackgroundCarousel";

export type { Slide };

export default function HeroBackgroundCarousel(props: ComponentProps<typeof BackgroundCarousel>) {
  return <BackgroundCarousel {...props} />;
}
