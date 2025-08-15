import { createClient } from "@supabase/supabase-js";
const url = process.env.SUPABASE_URL!; const key = process.env.SERVICE_ROLE_KEY!;
const supa = createClient(url, key);
(async () => {
  await supa.from("businesses").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  console.log("Businesses cleared.");
})().catch(e => { console.error(e); process.exit(1); });
