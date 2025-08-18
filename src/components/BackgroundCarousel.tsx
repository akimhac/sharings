import { useEffect, useRef, useState } from "react";

type Slide = { src: string; srcSet?: string; alt?: string };

export default function BackgroundCarousel({
  images, intervalMs = 6000, className = "",
}: { images: Slide[]; intervalMs?: number; className?: string; }) {
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(false);
  const t = useRef<number | null>(null);

  useEffect(() => {
    if (images.length < 2) return;
    t.current = window.setInterval(() => {
      setFade(true);
      window.setTimeout(() => { setI((p) => (p + 1) % images.length); setFade(false); }, 250);
    }, intervalMs);
    return () => { if (t.current) window.clearInterval(t.current); };
  }, [images.length, intervalMs]);

  const cur = images[i];
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      <picture className="block h-full w-full">
        {cur.srcSet && <source srcSet={cur.srcSet} sizes="100vw" />}
        <img
          key={i}
          src={cur.src}
          alt={cur.alt ?? ""}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "auto"}
          decoding="async"
          className={`h-full w-full object-cover transition-opacity duration-700 ease-in-out ${fade ? "opacity-0" : "opacity-100"}`}
          style={{ aspectRatio: "16/9", objectPosition: "center" }}
        />
      </picture>
    </div>
  );
}
