import { useEffect, useState } from "react";
import { supa } from "../../lib/supa";
import { getCities } from "../../lib/search";

export default function PreferencesForm() {
  const [me, setMe] = useState<string | null>(null);
  const [cityInput, setCityInput] = useState("");
  const [cities, setCities] = useState<{id:string;name:string}[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [services, setServices] = useState<string[]>([]);
  const [radius, setRadius] = useState(15);
  const [budget, setBudget] = useState([30, 120]);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => { (async () => {
    const u = (await supa.auth.getUser()).data.user;
    if (!u) return;
    setMe(u.id);
    const { data } = await supa.from("user_preferences").select("*").eq("user_id", u.id).single();
    if (data) {
      setSelectedCities(data.cities || []);
      setServices(data.services || []);
      setRadius(data.radius_km || 15);
      setBudget([data.budget_min ?? 30, data.budget_max ?? 120]);
      setNotifications(!!data.notifications);
    }
  })(); }, []);

  useEffect(() => { (async () => {
    if (cityInput.trim().length < 2) { setCities([]); return; }
    setCities(await getCities(cityInput.trim()));
  })(); }, [cityInput]);

  async function save() {
    if (!me) return alert("Connectez-vous.");
    const { error } = await supa.from("user_preferences").upsert({
      user_id: me,
      cities: selectedCities,
      services,
      radius_km: radius,
      budget_min: budget[0],
      budget_max: budget[1],
      notifications
    });
    if (error) return alert(error.message);
    alert("Préférences enregistrées ✅");
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold">Mes préférences</h3>

      <div className="mt-4">
        <label className="text-sm text-white/70">Villes favorites</label>
        <input
          className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2"
          placeholder="Paris, Lyon…"
          value={cityInput}
          onChange={(e)=>setCityInput(e.target.value)}
        />
        {cities.length>0 && (
          <div className="mt-2 bg-base border border-white/10 rounded-xl p-2 max-h-56 overflow-auto">
            {cities.map(c => (
              <button key={c.id} className="block w-full text-left px-2 py-1 rounded hover:bg-white/5"
                onClick={()=>{ if (!selectedCities.includes(c.id)) setSelectedCities([...selectedCities, c.id]); setCityInput(""); setCities([]); }}>
                {c.name}
              </button>
            ))}
          </div>
        )}
        {selectedCities.length>0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedCities.map(id => (
              <span key={id} className="chip">{id.slice(0,6)}<button className="ml-2" onClick={()=>setSelectedCities(selectedCities.filter(x=>x!==id))}>×</button></span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4">
        <label className="text-sm text-white/70">Services</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {["coupe","coloration","barbe","manucure","épilation","massage"].map(s => (
            <button key={s}
              onClick={()=>setServices(prev => prev.includes(s) ? prev.filter(x=>x!==s) : [...prev, s])}
              className={`chip ${services.includes(s) ? "bg-white/20" : ""}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-white/70">Rayon (km)</label>
          <input type="range" min={5} max={100} value={radius} onChange={e=>setRadius(+e.target.value)} className="w-full"/>
          <div className="text-white/70 text-sm mt-1">{radius} km</div>
        </div>
        <div>
          <label className="text-sm text-white/70">Budget (min–max €)</label>
          <input type="range" min={10} max={200} value={budget[1]} onChange={e=>setBudget([budget[0], +e.target.value])} className="w-full"/>
          <div className="text-white/70 text-sm mt-1">{budget[0]}–{budget[1]} €</div>
        </div>
      </div>

      <label className="mt-4 flex items-center gap-2">
        <input type="checkbox" checked={notifications} onChange={e=>setNotifications(e.target.checked)} />
        Recevoir des alertes (mock en dev)
      </label>

      <div className="mt-6 flex gap-3">
        <button className="btn-primary" onClick={save}>Enregistrer</button>
      </div>
    </div>
  );
}

