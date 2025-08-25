import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LandingPage from "../../src/pages/LandingPage";
import { MemoryRouter } from "react-router-dom";

describe("Landing smoke", () => {
  it("renders hero title and CTAs", () => {
    render(<MemoryRouter><LandingPage /></MemoryRouter>);
    expect(screen.getByText(/Sharings/i)).toBeTruthy();
    expect(
      screen.getByText(/Révolutionnez votre activité beauté/i)
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: /Créer un compte/i })).toBeTruthy();
  });
});
