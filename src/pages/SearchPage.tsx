import { useEffect, useMemo, useState } from "react";
import { getCities, searchBusinesses } from "../lib/search";
import ResultCard from "../features/search/ResultCard";
import SavedSearchButton from "../features/search/SavedSearchButton";

export default function SearchPage() {
  const [q, setQ] = useState(""); const [city, setCity] = useState<{id:string,name:string}|null>(null);
  const [cityInput, setCityInput] = useState(""); const [cities, setCities] = useState<{id:string,name:string}[]>([]);
  const [services, setServices] = useState<string[]>([]); const [priceMax, setPriceMax] = useState<number>(120);
  const [page, setPage] = useState(1);
  const [res, setRes] = useState<any>({ data: [], count: 0 });

  useEffect(() => { (async () => {
    const r = await searchBusinesses({ q, cityId: city?.id, services, priceMax, page, sort: "rating" });
    setRes(r);
  })(); }, [q, city?.id, services, priceMax, page]);

  useEffect(() => { (async () => {
    if (cityInput.trim().length < 2) { setCities([]); return; }
    setCities(await getCities(cityInput.trim()));
  })(); }, [cityInput]);

  const queryJson = useMemo(() => ({ q, cityId: city?.id, services, priceMax }), [q, city?.id, services, priceMax]);

  return (
    <div className="section">
      <div className="container-page">
        <h1 className="title-h2">Rechercher un prestataire</h1>

        <div className="card mt-6 grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="text-sm text-white/70">Ville</label>
            <input value={cityInput} onChange={(e)=>setCityInput(e.target.value)} placeholder="Paris, Lyon…" className="w-full mt-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2"/>
            {cities.length>0 && (
              <div className="mt-2 bg-base border border-white/10 rounded-xl p-2 max-h-56 overflow-auto">
                {cities.map(c => (
                  <button key={c.id} className="block w-full text-left px-2 py-1 rounded hover:bg-white/5" onClick={()=>{setCity(c); setCityInput(c.name); setCities([]);}}>
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="text-sm text-white/70">Mot‑clé</label>
            <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="coupe, coloration…" className="w-full mt-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2"/>
          </div>

          <div>
            <label className="text-sm text-white/70">Budget max (€)</label>
            <input type="range" min={20} max={200} value={priceMax} onChange={e=>setPriceMax(+e.target.value)} className="w-full" />
            <div className="text-white/70 text-sm mt-1">{priceMax}€</div>
          </div>

          <div className="md:col-span-4">
            <label className="text-sm text-white/70">Services</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {["coupe","coloration","barbe","manucure","épilation","massage"].map(s => (
                <button key={s} onClick={() => setServices(prev => prev.includes(s) ? prev.filter(x=>x!==s) : [...prev,s])} className={`chip ${services.includes(s) ? "bg-white/20" : ""}`}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <SavedSearchButton query={queryJson} />
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {res.data.map((c:any) => <ResultCard key={c.id} c={c} />)}
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button className="btn-ghost" onClick={()=>setPage(p=>Math.max(1,p-1))}>Précédent</button>
          <button className="btn-ghost" onClick={()=>setPage(p=>p+1)}>Suivant</button>
        </div>
      </div>
    </div>
  );
}
