import React, { useEffect, useRef, useState } from "react";
import { HERO_BG_IMAGES } from "../data/heroImages";

type Props = {
  intervalMs?: number;
  className?: string;
};

export const HeroBackgroundCarousel: React.FC<Props> = ({ intervalMs = 5500, className }) => {
  const [idx, setIdx] = useState(0);
  const timer = useRef<number | null>(null);
  const paused = useRef(false);

  useEffect(() => {
    const run = () => {
      if (!paused.current) setIdx((i) => (i + 1) % HERO_BG_IMAGES.length);
      timer.current = window.setTimeout(run, intervalMs);
    };
    timer.current = window.setTimeout(run, intervalMs);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [intervalMs]);

  return (
    <div
      className={`absolute inset-0 hero-bg ${className ?? ""}`}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      aria-hidden
    >
      {HERO_BG_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          decoding="async"
          loading={i === 0 ? "eager" : "lazy"}
          className={`hero-slide ${i === idx ? "is-active" : ""}`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=1600&q=60";
          }}
        />
      ))}
      <div className="hero-overlay" />
    </div>
  );
};

