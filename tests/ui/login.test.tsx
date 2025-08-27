import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../../src/pages/LoginPage";
import DashboardPage from "../../src/pages/DashboardPage";

vi.mock("../../src/lib/supa", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({ error: null }),
    },
  },
}));

vi.mock("../../src/contexts/AuthContext", () => ({
  useAuth: () => ({ user: { email: "test@example.com" }, loading: false }),
}));

describe("LoginPage", () => {
  it("redirects to dashboard after successful login", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText(/Email/i), "test@example.com");
    await user.type(screen.getByPlaceholderText(/Mot de passe/i), "password");
    await user.click(screen.getByRole("button", { name: /Se connecter/i }));

    expect(await screen.findByText(/Tableau de bord/i)).toBeTruthy();
  });
});
