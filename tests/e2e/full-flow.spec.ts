import { test, expect } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

test("inscription → préférences → recherche → sauvegarde", async ({ page }) => {
  // crée un user directement (admin) pour éviter l'email provider en dev
  const admin = createClient(process.env.SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!);
  const email = `qa+${Date.now()}@example.com`;
  const pass = "Test!123456";
  await admin.auth.admin.createUser({ email, password: pass, email_confirm: true });

  // login UI (si tu as un écran dédié, adapte les sélecteurs)
  await page.goto("/account");

  // préférences (sélection d'une ville)
  await page.goto("/search");
  await page.getByPlaceholder("Paris, Lyon…").fill("Par");
  await page.waitForTimeout(400);
  await page.locator("text=Paris").first().click();
  await page.getByPlaceholder("coupe, coloration…").fill("coupe");
  await page.locator("text=coupe").first().click();

  // sauvegarde
  await page.locator("text=Créer une alerte").click();
  await expect(page).toHaveTitle(/Sharings/i);
});
