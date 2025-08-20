import { useEffect, useRef, useState } from "react";

export type Slide = { src: string; srcSet?: string; alt?: string; objectPosition?: string };

export default function BackgroundCarousel({
  images, intervalMs = 6000, className = "", pauseOnHover = false
}: { images: Slide[]; intervalMs?: number; className?: string; pauseOnHover?: boolean; }) {
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(false);
  const timer = useRef<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (images.length < 2) return;
    const run = () => {
      timer.current = window.setInterval(() => {
        setFade(true);
        window.setTimeout(() => { setI((p) => (p + 1) % images.length); setFade(false); }, 250);
      }, intervalMs);
    };
    run();
    const el = ref.current;
    if (pauseOnHover && el) {
      const stop = () => { if (timer.current) window.clearInterval(timer.current); };
      const start = () => run();
      el.addEventListener("mouseenter", stop);
      el.addEventListener("mouseleave", start);
      return () => { stop(); el.removeEventListener("mouseenter", stop); el.removeEventListener("mouseleave", start); };
    }
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [images.length, intervalMs, pauseOnHover]);

  const cur = images[i];
  return (
    <div ref={ref} className={`absolute inset-0 ${className}`} aria-hidden="true">
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
          style={{ objectPosition: cur.objectPosition ?? "center" }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </picture>
    </div>
  );
}

