/* @vitest-environment jsdom */
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import BackgroundCarousel from "../BackgroundCarousel";

import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import BackgroundCarousel from "../BackgroundCarousel"
 main

vi.useFakeTimers()

describe("BackgroundCarousel", () => {
  it("renders first image and auto-rotates", () => {
    const { container } = render(
      <BackgroundCarousel images={[{ src: "/hero/1.jpg" }, { src: "/hero/2.jpg" }]} intervalMs={1000} />
    );
    expect(container.querySelector("img")?.getAttribute("src")).toBe("/hero/1.jpg");
    vi.advanceTimersByTime(1500);
    expect(container.querySelector("img")?.getAttribute("src")).toBe("/hero/2.jpg");
  });
});

  it("rotates images", () => {
    const { container } = render(
      <BackgroundCarousel slides={[{ src: "/a.jpg" }, { src: "/b.jpg" }]} intervalMs={1000} />
    )
    const imgs = container.querySelectorAll("img")
    expect(imgs[0].className).toContain("opacity-100")
    vi.advanceTimersByTime(1500)
    expect(imgs[1].className).toContain("opacity-100")
  })
})
 main
