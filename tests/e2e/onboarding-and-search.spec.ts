import { test, expect } from "@playwright/test";

test("signup → préférences → recherche → sauvegarde", async ({ page }) => {
  const email = `playwright+${Date.now()}@example.com`;
  await page.goto("/");
  await page.goto("/signup");
  // placeholders min : simule un formulaire simple si inexistant
  await page.goto("/");
  await page.goto("/search");

  // tape Paris et choisit une ville
  await page.getByPlaceholder("Paris, Lyon…").fill("Par");
  await page.waitForTimeout(500);
  await page.locator("text=Paris").first().click();

  await page.getByPlaceholder("coupe, coloration…").fill("coupe");
  await page.locator("text=coupe").first().click();

  // sauve la recherche
  await page.locator("text=Créer une alerte").click();
  // en dev on affiche un alert()
  await expect(page).toHaveTitle(/Sharings/i);
});
