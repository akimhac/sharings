import { createClient } from "@supabase/supabase-js";
const url = process.env.SUPABASE_URL!; const key = process.env.SERVICE_ROLE_KEY!;
const supa = createClient(url, key);

function rand<T>(arr: T[]) { return arr[Math.floor(Math.random()*arr.length)]; }
const TAGS = ["coupe","coloration","barbe","manucure","soin","brosse","lissage","extension","épilation","massage"];

async function pickCities(limit = 120) {
  const { data, error } = await supa.from("cities").select("id,name,population").gt("population", 10000).limit(limit);
  if (error) throw error;
  return data!;
}

function bizName(kind: "salon"|"institut") {
  const bases = ["Studio","Atelier","Maison","Lounge","bleu","rose","élégance","urbain","signature","éclat"];
  const word = rand(bases);
  return kind==="salon" ? `Salon ${word}` : `Institut ${word}`;
}

async function run() {
  const cities = await pickCities();
  const rows = [] as any[];
  for (let i = 0; i < 500; i++) {
    const city = rand(cities);
    const kind = Math.random() < 0.6 ? "salon" : "institut";
    const priceMin = Math.floor(20 + Math.random()*30);
    const priceMax = priceMin + Math.floor(20 + Math.random()*50);
    const rating = +(3.5 + Math.random()*1.5).toFixed(1);
    rows.push({
      kind,
      name: bizName(kind as any),
      city_id: city.id,
      address: `${Math.floor(Math.random()*100)+1} Rue Centrale`,
      price_min: priceMin,
      price_max: priceMax,
      rating,
      tags: [rand(TAGS), rand(TAGS), rand(TAGS)],
      images: [
        { src: "https://images.unsplash.com/photo-1556228724-4c9e152c8391?w=1200&auto=format&fit=crop&q=70" }
      ]
    });
  }
  const chunk = 500;
  for (let i=0;i<rows.length;i+=chunk){
    const { error } = await supa.from("businesses").upsert(rows.slice(i,i+chunk), { onConflict: "name,city_id" });
    if (error) throw error;
  }
  console.log("Businesses seed done");
}
run().catch(e => { console.error(e); process.exit(1); });
