import { useEffect, useRef, useState } from "react";

type Img = { src: string; alt: string; srcSet?: string; sizes?: string };

export default function CarouselPro({
  images,
  intervalMs = 5000,
  className = "",
  heightClass = "sg-h-64 sm:sg-h-80 lg:sg-h-[28rem]",
}: {
  images: Img[];
  intervalMs?: number;
  className?: string;
  heightClass?: string;
}) {
  const [i, setI] = useState(0);
  const [loading, setLoading] = useState(true);
  const timer = useRef<number | null>(null);
  const startX = useRef<number | null>(null);
  const paused = useRef(false);

  const go = (n: number) => setI((n + images.length) % images.length);

  // autoplay avec pause onglet caché
  useEffect(() => {
    const vis = () => { paused.current = document.visibilityState !== "visible"; };
    document.addEventListener("visibilitychange", vis);
    vis();
    return () => document.removeEventListener("visibilitychange", vis);
  }, []);

  useEffect(() => {
    if (!intervalMs || images.length < 2) return;
    timer.current = window.setInterval(() => {
      if (!paused.current) go(i + 1);
    }, intervalMs);
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [i, intervalMs, images.length]);

  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
    startX.current = null;
  };

  const cur = images[i];

  return (
    <section
      className={`sg-relative sg-overflow-hidden sg-rounded-2xl sg-border sg-border-black/10 ${className}`}
      aria-roledescription="carousel"
      aria-label="Galerie d'images"
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(i + 1); if (e.key === "ArrowLeft") go(i - 1); }}
    >
      {loading && <div className={`sg-absolute sg-inset-0 ${heightClass} sg-animate-pulse sg-bg-black/[.06]`} />}

      <div className="sg-relative sg-select-none" tabIndex={0} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <picture>
          {cur.srcSet && <source srcSet={cur.srcSet} sizes={cur.sizes ?? "(min-width:1024px) 800px, 100vw"} />}
        </picture>
        <img
          key={i}
          src={cur.src}
          alt={cur.alt}
          loading="eager"
          decoding="async"
          className={`${heightClass} sg-w-full sg-object-cover sg-transition-opacity sg-duration-500 ${loading ? "sg-opacity-0" : "sg-opacity-100"}`}
          onLoad={() => setLoading(false)}
          onError={(e) => {
            (e.target as HTMLImageElement).style.background = "linear-gradient(135deg,#2b2b2b,#1f1f1f)";
            setLoading(false);
          }}
          width={1600}
          height={900}
        />

        {images.length > 1 && (
          <>
            <button aria-label="Précédent" className="sg-absolute sg-left-3 sg-top-1/2 -sg-translate-y-1/2 sg-rounded-full sg-bg-black/40 sg-px-3 sg-py-2 hover:sg-bg-black/60" onClick={() => go(i - 1)}>‹</button>
            <button aria-label="Suivant" className="sg-absolute sg-right-3 sg-top-1/2 -sg-translate-y-1/2 sg-rounded-full sg-bg-black/40 sg-px-3 sg-py-2 hover:sg-bg-black/60" onClick={() => go(i + 1)}>›</button>
          </>
        )}

        {images.length > 1 && (
          <div className="sg-absolute sg-bottom-3 sg-left-0 sg-right-0 sg-flex sg-justify-center sg-gap-2">
            {images.map((_, k) => (
              <button key={k} aria-label={`Aller à l'image ${k + 1}`} onClick={() => go(k)} className={`sg-h-2.5 sg-w-2.5 sg-rounded-full ${k === i ? "sg-bg-primary" : "sg-bg-primary/50"}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
