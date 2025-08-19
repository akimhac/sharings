import { useEffect, useRef, useState } from "react";

type Img = { src: string; alt: string; srcSet?: string; sizes?: string; fallback?: string };

export default function CarouselSmart({
  images,
  intervalMs = 5000,
  className = "",
  heightClass = "h-64 sm:h-80 lg:h-[28rem]",
}: {
  images: Img[]; intervalMs?: number; className?: string; heightClass?: string;
}) {
  const [i, setI] = useState(0);
  const [loading, setLoading] = useState(true);
  const timer = useRef<number | null>(null);
  const startX = useRef<number | null>(null);

  const go = (n: number) => setI((n + images.length) % images.length);

  useEffect(() => {
    if (!intervalMs || images.length < 2) return;
    timer.current = window.setInterval(() => go(i + 1), intervalMs);
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
      className={`relative overflow-hidden rounded-2xl border border-white/10 ${className}`}
      aria-roledescription="carousel"
      aria-label="Galerie"
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(i + 1); if (e.key === "ArrowLeft") go(i - 1); }}
      tabIndex={0}
    >
      {loading && <div className={`absolute inset-0 ${heightClass} animate-pulse bg-white/[.06]`} />}

      <div className="relative select-none" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <picture>
          {cur.srcSet && (
            <source
              srcSet={cur.srcSet}
              sizes={cur.sizes ?? "(min-width:1024px) 800px, 100vw"}
            />
          )}
          <img
            key={i}
            src={cur.src}
            alt={cur.alt}
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"     // évite certains blocages
            crossOrigin="anonymous"
            className={`${heightClass} w-full object-cover transition-opacity duration-500 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
            style={{ aspectRatio: "16/9" }}  // ratio fixe, évite “saut” et décodage foireux
            onLoad={() => setLoading(false)}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              // 1) tente le fallback distant si défini
              if (cur.fallback && img.src !== cur.fallback) {
                img.src = cur.fallback;
                return;
              }
              // 2) dernier secours : fond neutre
              img.style.background =
                "linear-gradient(135deg,#2b2b2b,#1f1f1f)";
              setLoading(false);
            }}
            width={1600}
            height={900}
          />
        </picture>

        {images.length > 1 && (
          <>
            <button aria-label="Précédent" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 hover:bg-black/60" onClick={() => go(i - 1)}>‹</button>
            <button aria-label="Suivant" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 hover:bg-black/60" onClick={() => go(i + 1)}>›</button>
          </>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {images.map((_, k) => (
              <button key={k} aria-label={`Aller à l'image ${k + 1}`} onClick={() => go(k)} className={`h-2.5 w-2.5 rounded-full ${k === i ? "bg-white" : "bg-white/50"}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
