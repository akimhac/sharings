import { useEffect, useRef, useState } from "react"

export type Slide = {
  src: string
  alt?: string
  srcSet?: string
  objectPosition?: string
}

interface Props {
  slides: Slide[]
  intervalMs?: number
  pauseOnHover?: boolean
  className?: string
}

export default function BackgroundCarousel({
  slides,
  intervalMs = 5000,
  pauseOnHover = true,
  className = "",
}: Props) {
  const [idx, setIdx] = useState(0)
  const timer = useRef<number | null>(null)
  const paused = useRef(false)

  useEffect(() => {
    start()
    return stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length, intervalMs])

  function start() {
    stop()
    timer.current = window.setInterval(() => {
      if (!paused.current) {
        setIdx((i) => (i + 1) % slides.length)
      }
    }, intervalMs)
  }

  function stop() {
    if (timer.current) {
      window.clearInterval(timer.current)
      timer.current = null
    }
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && (paused.current = true)}
      onMouseLeave={() => pauseOnHover && (paused.current = false)}
    >
      {slides.map((s, i) => (
        <img
          key={s.src + i}
          src={s.src}
          srcSet={s.srcSet}
          alt={s.alt ?? ""}
          decoding="async"
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "auto"}
          style={{ objectPosition: s.objectPosition }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
    </div>
  )
}
