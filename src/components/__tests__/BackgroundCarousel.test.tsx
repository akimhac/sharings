 codex/add-background-carousel-and-styling-components

/* @vitest-environment jsdom */
 main
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import BackgroundCarousel from "../BackgroundCarousel";

vi.useFakeTimers();

describe("BackgroundCarousel", () => {
  it("renders first image and auto-rotates", () => {
 codex/add-background-carousel-and-styling-components
    const { container } = render(<BackgroundCarousel images={[{src:"/hero/1.jpg"},{src:"/hero/2.jpg"}]} intervalMs={1000} />);

    const { container } = render(
      <BackgroundCarousel images={[{ src: "/hero/1.jpg" }, { src: "/hero/2.jpg" }]} intervalMs={1000} />
    );
 main
    expect(container.querySelector("img")?.getAttribute("src")).toBe("/hero/1.jpg");
    vi.advanceTimersByTime(1500);
    expect(container.querySelector("img")?.getAttribute("src")).toBe("/hero/2.jpg");
  });
});
 codex/add-background-carousel-and-styling-components

=======
 main
