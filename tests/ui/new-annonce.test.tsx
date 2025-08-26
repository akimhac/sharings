import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NewAnnoncePage from "../../src/pages/NewAnnoncePage";

// mocks
const insertMock = vi.fn();
vi.mock("../../src/lib/supa", () => ({
  supabase: { from: vi.fn(() => ({ insert: insertMock })) }
}));
const useAuthMock = vi.fn();
vi.mock("../../src/contexts/AuthContext", () => ({ useAuth: useAuthMock }));
const toastSuccessMock = vi.fn();
const toastErrorMock = vi.fn();
vi.mock("react-hot-toast", () => ({ toast: { success: toastSuccessMock, error: toastErrorMock } }));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("NewAnnoncePage", () => {
  it("publishes annonce when user authenticated", async () => {
    useAuthMock.mockReturnValue({ user: { id: "1" } });
    insertMock.mockResolvedValue({ error: null });
    render(
      <MemoryRouter>
        <NewAnnoncePage />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText("Titre"), { target: { value: "foo" } });
    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "bar" } });
    fireEvent.click(screen.getByRole("button", { name: /Publier/i }));
    await waitFor(() => expect(insertMock).toHaveBeenCalled());
    expect(toastSuccessMock).toHaveBeenCalledWith("Annonce publiée");
  });

  it("shows error when user not authenticated", async () => {
    useAuthMock.mockReturnValue({ user: null });
    render(
      <MemoryRouter>
        <NewAnnoncePage />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText("Titre"), { target: { value: "foo" } });
    fireEvent.change(screen.getByPlaceholderText("Description"), { target: { value: "bar" } });
    fireEvent.click(screen.getByRole("button", { name: /Publier/i }));
    await waitFor(() => expect(toastErrorMock).toHaveBeenCalled());
    expect(insertMock).not.toHaveBeenCalled();
  });
});
