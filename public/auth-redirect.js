(async () => {
  if (!window.supabase) return; // bibliothèques pas encore chargées
  const SUPABASE_URL = "https://cjyxjtgserylbfkbpdou.supabase.co";
  const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeXhqdGdzZXJ5bGJma2JwZG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2Nzc4NzksImV4cCI6MjA2MTI1Mzg3OX0.3qHLxUf7-F2inblyAKtGzlxcOaHuIL8lk-OdGJcj604";
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

  // 1) Si l’utilisateur est déjà connecté sur la home, envoie-le au dashboard
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    // On reste sur /dashboard.html si on y est déjà
    if (!location.pathname.endsWith("/dashboard.html") && !location.hash.includes("dashboard")) {
      window.location.href = "./dashboard.html";
      return;
    }
  }

  // 2) Accroche sur tes formulaires si présents (ids de ta modale)
  const loginForm = document.querySelector("#login-form");
  const registerForm = document.querySelector("#register-form");

  async function afterAuth() {
    alert("Connexion réussie 👌");     // tu as déjà un toast – garde-le si tu veux
    window.location.href = "./dashboard.html";
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      // Ton script gère déjà la soumission; on attend un petit délai et on vérifie la session
      setTimeout(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) afterAuth();
      }, 800);
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      setTimeout(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) afterAuth();
      }, 1200);
    });
  }
})();
