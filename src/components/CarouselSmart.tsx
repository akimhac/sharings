import { useEffect, useRef, useState } from "react";
import { landingImages, LandingImage, FALLBACK_IMAGE } from "../assets/landingImages";

interface CarouselSmartProps {
  images?: LandingImage[];
}

export default function CarouselSmart({ images = landingImages }: CarouselSmartProps) {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<number>();
  const touchStart = useRef<number | null>(null);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  // autoplay
  useEffect(() => {
    intervalRef.current = window.setInterval(next, 5000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  // reset loading on slide change
  useEffect(() => setLoading(true), [index]);

  // keyboard navigation
  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  // touch navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    if (start !== null) {
      const diff = start - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? next() : prev();
      }
    }
    touchStart.current = null;
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Galerie"
      tabIndex={0}
      onKeyDown={handleKey}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          {loading && i === index && <div className="skeleton absolute inset-0" />}
          <img
            src={img.src}
            srcSet={img.srcSet}
            sizes="(max-width: 768px) 100vw, 600px"
            alt={img.alt}
            className="h-full w-full object-cover"
            onLoad={() => setLoading(false)}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
          />
        </div>
      ))}

      <button
        aria-label="Précédent"
        onClick={prev}
        className="btn absolute left-2 top-1/2 -translate-y-1/2 bg-base/70 text-ink hover:bg-base"
      >
        ‹
      </button>
      <button
        aria-label="Suivant"
        onClick={next}
        className="btn absolute right-2 top-1/2 -translate-y-1/2 bg-base/70 text-ink hover:bg-base"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Aller à l’image ${i + 1}`}
            className={i === index ? "dot-active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
