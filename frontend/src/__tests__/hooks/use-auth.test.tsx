/**
 * Unit tests for the AuthProvider and useAuth hook.
 */

import { render, screen, act, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { apiClient } from "@/services/api-client";

// Mock the API client
jest.mock("@/services/api-client", () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

const mockApiGet = apiClient.get as jest.MockedFunction<typeof apiClient.get>;

/** Test component to expose hook values */
function TestConsumer() {
  const { user, isAuthenticated, isLoading, error, signIn, signOut } =
    useAuth();

  return (
    <div>
      <span data-testid="loading">{String(isLoading)}</span>
      <span data-testid="authenticated">{String(isAuthenticated)}</span>
      <span data-testid="user">{user ? user.displayName : "none"}</span>
      <span data-testid="error">{error || "none"}</span>
      <button onClick={() => void signIn()}>Sign In</button>
      <button onClick={() => void signOut()}>Sign Out</button>
    </div>
  );
}

function renderWithAuth() {
  return render(
    <AuthProvider>
      <TestConsumer />
    </AuthProvider>,
  );
}

describe("AuthProvider / useAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset document.cookie
    Object.defineProperty(document, "cookie", {
      value: "",
      writable: true,
      configurable: true,
    });
  });

  it("starts in loading state and resolves to unauthenticated when no token", async () => {
    renderWithAuth();

    // Eventually resolves to not loading, not authenticated
    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });
    expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
    expect(screen.getByTestId("user")).toHaveTextContent("none");
  });

  it("restores session when token cookie exists and API validates", async () => {
    Object.defineProperty(document, "cookie", {
      value: "learnit_token=valid-token",
      writable: true,
      configurable: true,
    });

    mockApiGet.mockResolvedValueOnce({
      data: {
        data: {
          id: "user-1",
          email: "test@test.com",
          displayName: "Test User",
          avatarUrl: null,
          tier: "free",
          createdAt: "2026-01-01",
          updatedAt: "2026-01-01",
        },
      },
    } as ReturnType<typeof apiClient.get> extends Promise<infer R> ? R : never);

    renderWithAuth();

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });
    expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
    expect(screen.getByTestId("user")).toHaveTextContent("Test User");
  });

  it("clears auth state when token is invalid (API rejects)", async () => {
    Object.defineProperty(document, "cookie", {
      value: "learnit_token=expired-token",
      writable: true,
      configurable: true,
    });

    mockApiGet.mockRejectedValueOnce(new Error("Unauthorized"));

    renderWithAuth();

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });
    expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
    expect(screen.getByTestId("user")).toHaveTextContent("none");
  });

  it("signIn sets error because it is not yet implemented", async () => {
    const user = userEvent.setup();
    renderWithAuth();

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });

    await act(async () => {
      await user.click(screen.getByText("Sign In"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent(
        "Sign-in not yet implemented (Task 006)",
      );
    });
  });

  it("signOut clears the auth state", async () => {
    Object.defineProperty(document, "cookie", {
      value: "learnit_token=valid-token",
      writable: true,
      configurable: true,
    });

    mockApiGet.mockResolvedValueOnce({
      data: {
        data: {
          id: "user-1",
          email: "test@test.com",
          displayName: "Learner",
          avatarUrl: null,
          tier: "premium",
          createdAt: "2026-01-01",
          updatedAt: "2026-01-01",
        },
      },
    } as ReturnType<typeof apiClient.get> extends Promise<infer R> ? R : never);

    const user = userEvent.setup();
    renderWithAuth();

    // Wait for session restore
    await waitFor(() => {
      expect(screen.getByTestId("authenticated")).toHaveTextContent("true");
    });

    // Sign out
    await act(async () => {
      await user.click(screen.getByText("Sign Out"));
    });

    await waitFor(() => {
      expect(screen.getByTestId("authenticated")).toHaveTextContent("false");
      expect(screen.getByTestId("user")).toHaveTextContent("none");
    });
  });
});

describe("useAuth outside provider", () => {
  it("throws error when used outside AuthProvider", () => {
    // Suppress React error boundary noise
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestConsumer />)).toThrow(
      "useAuth must be used within an AuthProvider",
    );

    spy.mockRestore();
  });
});
