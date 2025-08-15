import { describe, it, expect } from "vitest";
import { supa } from "../../src/lib/supa";
import { getCities, searchBusinesses } from "../../src/lib/search";

describe("prefs + search", () => {
  it("autocomplete villes FR", async () => {
    const r = await getCities("Par");
    expect(r.length).toBeGreaterThan(0);
  });

  it("recherche retourne des cartes", async () => {
    const { data } = await searchBusinesses({ q: "coupe", page: 1 });
    expect(Array.isArray(data)).toBe(true);
  });
});
