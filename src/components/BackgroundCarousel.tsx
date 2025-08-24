import { useEffect, useRef, useState } from "react";

export type Image = {
  src: string;
  alt?: string;
  srcSet?: string;
  objectPosition?: string;
};

interface Props {
  images: Image[];
  intervalMs?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export default function BackgroundCarousel({
  images,
  intervalMs = 5000,
  pauseOnHover = true,
  className = "",
}: Props) {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);
  const paused = useRef(false);

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length, intervalMs]);

  function start() {
    stop();
    timer.current = window.setInterval(() => {
      if (!paused.current) {
        setIndex((i) => (i + 1) % images.length);
      }
    }, intervalMs);
  }

  function stop() {
    if (timer.current) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  }

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && (paused.current = true)}
      onMouseLeave={() => pauseOnHover && (paused.current = false)}
    >
      {images.map((s, i) => (
        <img
          key={s.src + i}
          src={s.src}
          srcSet={s.srcSet}
          alt={s.alt ?? ""}
          decoding="async"
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "auto"}
          style={{ objectPosition: s.objectPosition }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 will-change-[opacity] ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
