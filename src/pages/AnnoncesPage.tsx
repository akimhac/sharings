import { useEffect, useMemo, useState } from "react";
import { sampleListings, type Listing } from "../data/sampleListings";
import { getCurrentPosition, haversine } from "../lib/geo";
import { ListingCard } from "../components/ListingCard";

type Filters = {
  q: string;
  type: "" | Listing["type"];
  maxPrice: number;
};

export default function AnnoncesPage() {
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [filters, setFilters] = useState<Filters>({ q: "", type: "", maxPrice: 120 });
  const [items, setItems] = useState<Listing[]>(() => sampleListings.map((l) => ({ ...l })));
  const anyDistance = useMemo(() => items.some((i) => i.distance != null), [items]);

  async function handleLocate() {
    try {
      const pos = await getCurrentPosition();
      const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setUserLoc(loc);
      setItems((prev) =>
        prev.map((l) =>
          l.lat != null && l.lng != null ? { ...l, distance: haversine(loc.lat, loc.lng, l.lat, l.lng) } : l,
        ),
      );
    } catch {
      alert("Impossible de récupérer votre position.");
    }
  }

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return items
      .filter((l) => (q ? l.title.toLowerCase().includes(q) || l.location.toLowerCase().includes(q) : true))
      .filter((l) => (filters.type ? l.type === filters.type : true))
      .filter((l) => l.price <= filters.maxPrice)
      .sort((a, b) => {
        if (userLoc && typeof a.distance === "number" && typeof b.distance === "number") {
          return a.distance - b.distance;
        }
        return b.rating - a.rating;
      });
  }, [items, filters, userLoc]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="container-page section">
      <h1 className="title-h2 text-white mb-6">Trouver un espace</h1>

      <div className="card mb-6 grid gap-4 sm:grid-cols-4">
        <input
          className="col-span-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
          placeholder="Ville, arrondissement, mot-clé…"
          value={filters.q}
          onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
        />
        <select
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
          value={filters.type}
          onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value as Filters["type"] }))}
        >
          <option value="">Tous les services</option>
          <option value="coiffure">Coiffure</option>
          <option value="esthétique">Esthétique</option>
          <option value="nail-art">Nail art</option>
          <option value="barbier">Barbier</option>
          <option value="extension">Extensions</option>
          <option value="massage">Massage</option>
        </select>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={20}
            max={150}
            step={5}
            value={filters.maxPrice}
            onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
            className="w-full"
          />
          <span className="chip">{filters.maxPrice}€ max</span>
        </div>
        <div className="sm:col-span-4 flex flex-wrap items-center gap-3">
          <button onClick={handleLocate} className="btn-ghost">
            \uD83D\uDCCD {userLoc ? "Position mise à jour" : "Utiliser ma position"}
          </button>
          {anyDistance && <span className="text-white/60 text-sm">Tri par distance quand disponible</span>}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-white/70">Aucun résultat — essaye d’élargir les filtres.</div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((l) => (
            <ListingCard key={l.id} item={l} />
          ))}
        </div>
      )}
    </div>
  );
}
