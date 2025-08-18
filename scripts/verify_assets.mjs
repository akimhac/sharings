import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const pub = path.join(root, "public", "hero");
const MAX = 450 * 1024;

const REMOTES = [
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&h=900&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1556228453-efd1c020aff5?w=1600&h=900&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=900&fit=crop&auto=format&q=80",
];

async function ensureDir(p){ await fs.promises.mkdir(p,{recursive:true}); }
async function dl(url,dest){ const r=await fetch(url); if(!r.ok) throw new Error("HTTP "+r.status); const b=Buffer.from(await r.arrayBuffer()); await fs.promises.writeFile(dest,b); }
async function check(i){
  const f=path.join(pub,`${i+1}.jpg`);
  if(!fs.existsSync(f)){ console.log(`• hero/${i+1}.jpg manquant → téléchargement`); await dl(REMOTES[i], f); }
  const s=await fs.promises.stat(f);
  if(s.size>MAX) throw new Error(`${path.basename(f)} trop lourd (${Math.round(s.size/1024)}KB)`);
  console.log(`✔ ${path.basename(f)} OK (${Math.round(s.size/1024)}KB)`);
}
(async()=>{ console.log("=== Vérif assets hero ==="); await ensureDir(pub); await Promise.all([check(0),check(1),check(2)]); console.log("✅ Assets prêts"); })().catch(e=>{ console.error(e.message||e); process.exit(1); });
