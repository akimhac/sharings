import React, { useState, useEffect } from "react";

interface CarouselProProps {
  images: { src: string; alt: string }[];
  intervalMs?: number;
}

const CarouselPro: React.FC<CarouselProProps> = ({ images, intervalMs = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  return (
    <div className="relative w-full h-[350px] sm:h-[450px] lg:h-[500px] overflow-hidden rounded-xl shadow-lg">
      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          className={`absolute w-full h-full object-cover transition-opacity duration-700 ${
            i === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
      ))}

      {/* Boutons navigation */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
        aria-label="Précédent"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
        aria-label="Suivant"
      >
        ›
      </button>

      {/* Indicateurs */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full ${i === currentIndex ? "bg-white" : "bg-white/50"}`}
            aria-label={`Aller à l’image ${i + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselPro;
