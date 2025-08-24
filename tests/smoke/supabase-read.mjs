// Test fumée: la lecture publique des annonces fonctionne (policy SELECT true)
import { createClient } from "@supabase/supabase-js";
const url = process.env.VITE_SUPABASE_URL;
const anon = process.env.VITE_SUPABASE_ANON_KEY;
if (!url || !anon) {
  console.log("Skip: no Supabase env");
  process.exit(0);
}
const supabase = createClient(url, anon);
const { data, error } = await supabase.from("annonces").select("*").limit(1);
if (error) {
  console.error("Supabase read failed:", error.message);
  process.exit(1);
}
console.log("Supabase read OK. rows:", data?.length ?? 0);
