import { Link } from "react-router-dom";
type Card = { id:string; name:string; rating:number; price_min:number; price_max:number; tags:string[]; images:any[]; city:{ name:string } };
export default function ResultCard({ c }: { c: Card }) {
  const cover = c.images?.[0]?.src || "https://images.unsplash.com/photo-1556228724-4c9e152c8391?w=800&auto=format&fit=crop&q=60";
  return (
    <article className="card hover:scale-[1.01] transition-transform">
      <img src={cover} alt={c.name} className="h-44 w-full object-cover rounded-xl mb-3" loading="lazy" />
      <h3 className="text-lg font-semibold">{c.name}</h3>
      <p className="text-white/70 text-sm">{c.city?.name}</p>
      <p className="mt-1 text-white/80 text-sm">★ {c.rating} · {c.tags?.slice(0,3).join(" · ")}</p>
      <p className="mt-1 text-white/90 font-medium">{c.price_min}–{c.price_max}€</p>
      <div className="mt-3 flex gap-2">
        <Link to={`/business/${c.id}`} className="btn-primary">Voir</Link>
        <button className="btn-ghost">Sauvegarder</button>
      </div>
    </article>
  );
}
