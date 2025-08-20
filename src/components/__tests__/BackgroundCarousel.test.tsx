import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import BackgroundCarousel from "../BackgroundCarousel";

vi.useFakeTimers();

describe("BackgroundCarousel", () => {
  it("renders first image and auto-rotates", () => {
    const { container } = render(<BackgroundCarousel images={[{src:"/hero/1.jpg"},{src:"/hero/2.jpg"}]} intervalMs={1000} />);
    expect(container.querySelector("img")?.getAttribute("src")).toBe("/hero/1.jpg");
    vi.advanceTimersByTime(1500);
    expect(container.querySelector("img")?.getAttribute("src")).toBe("/hero/2.jpg");
  });
});

