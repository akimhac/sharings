import { describe, it, expect } from "vitest";
import { supa } from "../../src/lib/supa";

describe("seeds smoke", () => {
  it("has cities", async () => {
    const { data, error } = await supa.from("cities").select("id").limit(1);
    expect(error).toBeNull();
    expect(data?.length).toBeGreaterThan(0);
  });
  it("has businesses", async () => {
    const { data, error } = await supa.from("businesses").select("id").limit(1);
    expect(error).toBeNull();
    expect(data?.length).toBeGreaterThan(0);
  });
});
