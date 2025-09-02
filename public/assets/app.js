/* Sharings - helpers */
export const cfg = {
  url: "https://cjyxjtgserylbfkbpdou.supabase.co",
  anon: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeXhqdGdzZXJ5bGJma2JwZG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2Nzc4NzksImV4cCI6MjA2MTI1Mzg3OX0.3qHLxUf7-F2inblyAKtGzlxcOaHuIL8lk-OdGJcj604",
};

export function sb() {
  return window.supabase.createClient(cfg.url, cfg.anon, { auth: { persistSession: true } });
}

export async function requireSession() {
  const supabase = sb();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    alert("Veuillez vous connecter.");
    location.href = "./";
    return null;
  }
  return session;
}

export function fmtDate(d) {
  return new Date(d).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });
}

export function toast(msg) {
  let c = document.getElementById("x-toast");
  if (!c) {
    c = document.createElement("div");
    c.id = "x-toast";
    c.style.cssText = "position:fixed;left:50%;top:20px;transform:translateX(-50%);background:#111;color:#fff;padding:10px 14px;border-radius:12px;z-index:9999;box-shadow:0 10px 30px rgba(0,0,0,.3)";
    document.body.appendChild(c);
  }
  c.textContent = msg;
  c.style.opacity = 1;
  setTimeout(()=>c.style.opacity=0, 2400);
}
