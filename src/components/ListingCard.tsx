import React from "react";
import type { Listing } from "../data/sampleListings";

type Props = { item: Listing };

export const ListingCard: React.FC<Props> = ({ item }) => {
  return (
    <article
      className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden shadow-lg hover:shadow-xl transition-all"
      style={{ animation: "fade-in-up 0.5s ease both" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&w=800&q=60";
          }}
        />
        <div className="absolute bottom-3 left-3 rounded-xl bg-black/70 px-3 py-1 text-white text-sm">
          {item.price}\u20ac/jour
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-semibold text-white">{item.title}</h3>
        <div className="mt-1 text-white/70 text-sm">\uD83D\uDCCD {item.location}</div>
        <p className="mt-3 text-white/80 text-sm line-clamp-2">{item.description}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-amber-300">\u2B50 {item.rating.toFixed(1)} ({item.reviewsCount})</span>
          {typeof item.distance === "number" && (
            <span className="rounded-full bg-white/10 px-3 py-1 text-white">{item.distance.toFixed(1)} km</span>
          )}
        </div>
      </div>
    </article>
  );
};
