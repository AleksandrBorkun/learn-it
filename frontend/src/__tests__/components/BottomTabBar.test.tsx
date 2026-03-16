/**
 * Component tests for the BottomTabBar component.
 */

import { render, screen } from "@testing-library/react";

import { BottomTabBar } from "@/components/layout/BottomTabBar";

// Mock the hooks
jest.mock("@/hooks/use-auth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

import { useAuth } from "@/hooks/use-auth";
import { usePathname } from "next/navigation";

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe("BottomTabBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue("/dashboard");
  });

  describe("unauthenticated user", () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        signIn: jest.fn(),
        signOut: jest.fn(),
      });
    });

    it("renders nothing", () => {
      const { container } = render(<BottomTabBar />);
      expect(container.innerHTML).toBe("");
    });
  });

  describe("authenticated user", () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        user: {
          id: "1",
          email: "test@test.com",
          displayName: "Test User",
          avatarUrl: null,
          tier: "free",
          createdAt: "2026-01-01",
          updatedAt: "2026-01-01",
        },
        isAuthenticated: true,
        isLoading: false,
        error: null,
        signIn: jest.fn(),
        signOut: jest.fn(),
      });
    });

    it("renders all tab items", () => {
      render(<BottomTabBar />);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Tracks")).toBeInTheDocument();
      expect(screen.getByText("Snippets")).toBeInTheDocument();
      expect(screen.getByText("Board")).toBeInTheDocument();
      expect(screen.getByText("Profile")).toBeInTheDocument();
    });

    it("marks the current route as active", () => {
      mockUsePathname.mockReturnValue("/dashboard");
      render(<BottomTabBar />);

      const homeTab = screen.getByText("Home").closest("a");
      expect(homeTab).toHaveAttribute("aria-current", "page");
    });

    it("does not mark non-active tabs", () => {
      mockUsePathname.mockReturnValue("/dashboard");
      render(<BottomTabBar />);

      const tracksTab = screen.getByText("Tracks").closest("a");
      expect(tracksTab).not.toHaveAttribute("aria-current");
    });

    it("has proper navigation aria label", () => {
      render(<BottomTabBar />);
      expect(
        screen.getByRole("navigation", { name: "Bottom navigation" }),
      ).toBeInTheDocument();
    });
  });
});
