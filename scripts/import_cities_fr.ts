import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL!;
const key = process.env.SERVICE_ROLE_KEY!;
const supa = createClient(url, key);

type ApiCity = { nom: string; code: string; centre: { coordinates: [number, number] }; population?: number };

async function run() {
  const res = await fetch("https://geo.api.gouv.fr/communes?fields=nom,code,centre,population&format=json&geometry=centre");
  const json = (await res.json()) as ApiCity[];
  const rows = json.map(c => ({
    insee_code: c.code,
    name: c.nom,
    lat: c.centre?.coordinates?.[1] ?? null,
    lon: c.centre?.coordinates?.[0] ?? null,
    population: c.population ?? null,
  }));
  // upsert en batch (1000)
  const chunk = 1000;
  for (let i = 0; i < rows.length; i += chunk) {
    const slice = rows.slice(i, i + chunk);
    const { error } = await supa.from("cities").upsert(slice, { onConflict: "insee_code" });
    if (error) throw error;
    console.log(`Inserted ${Math.min(i + chunk, rows.length)}/${rows.length}`);
  }
  console.log("Cities import done");
}
run().catch(e => { console.error(e); process.exit(1); });
