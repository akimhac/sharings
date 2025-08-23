/* @vitest-environment jsdom */
import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import BackgroundCarousel from "../BackgroundCarousel"

vi.useFakeTimers()

describe("BackgroundCarousel", () => {
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
