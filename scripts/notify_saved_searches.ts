import { createClient } from "@supabase/supabase-js";
const supa = createClient(process.env.SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!);

function match(biz:any, q:any){
  if (q.cityId && biz.city_id !== q.cityId) return false;
  if (q.services?.length && !q.services.every((s:string)=>biz.tags?.includes(s))) return false;
  if (q.q && !(`${biz.name}`.toLowerCase()).includes(q.q.toLowerCase())) return false;
  if (q.priceMax && biz.price_max > q.priceMax) return false;
  return true;
}

(async () => {
  // 1) récupérer recherches
  const { data: searches, error } = await supa.from("saved_searches").select("id,user_id,query");
  if (error) throw error;

  // 2) pour chaque, chercher des nouveautés (ici: top 10)
  for (const s of searches ?? []) {
    const { data: biz } = await supa.from("businesses").select("*").limit(50);
    const hits = (biz ?? []).filter(b => match(b, s.query));
    if (hits.length) {
      // mock "email"
      console.log(`[ALERTE] user=${s.user_id} | recherche=${s.id} | ${hits.length} résultats`);
    }
  }
  console.log("notify_saved_searches OK");
})().catch(e => { console.error(e); process.exit(1); });
