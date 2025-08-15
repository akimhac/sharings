import { describe, it, expect } from "vitest";
import { searchBusinesses, getCities } from "../../src/lib/search";

describe("API helpers", () => {
  it("autocomplete cities", async () => {
    const cities = await getCities("Par");
    expect(Array.isArray(cities)).toBe(true);
  });
  it("search businesses basic", async () => {
    const res = await searchBusinesses({ q: "coupe", page: 1 });
    expect(res).toHaveProperty("data");
  });
});
