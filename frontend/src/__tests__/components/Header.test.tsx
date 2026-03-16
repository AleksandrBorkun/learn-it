/**
 * Component tests for the Header component.
 */

import { render, screen, fireEvent } from "@testing-library/react";

import { Header } from "@/components/layout/Header";

// Mock the useAuth hook
const mockSignOut = jest.fn();
jest.mock("@/hooks/use-auth", () => ({
  useAuth: jest.fn(),
}));

import { useAuth } from "@/hooks/use-auth";

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe("Header", () => {
  const defaultProps = {
    onMenuToggle: jest.fn(),
    isMobileMenuOpen: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("unauthenticated state", () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        signIn: jest.fn(),
        signOut: mockSignOut,
      });
    });

    it("renders the LearnIt logo", () => {
      render(<Header {...defaultProps} />);
      expect(screen.getByText("LearnIt")).toBeInTheDocument();
    });

    it("shows public nav items", () => {
      render(<Header {...defaultProps} />);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Sign In")).toBeInTheDocument();
    });

    it("does not show authenticated nav items", () => {
      render(<Header {...defaultProps} />);
      expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
      expect(screen.queryByText("Tracks")).not.toBeInTheDocument();
    });

    it("links to home when unauthenticated", () => {
      render(<Header {...defaultProps} />);
      const logo = screen.getByText("LearnIt");
      expect(logo.closest("a")).toHaveAttribute("href", "/");
    });
  });

  describe("authenticated state", () => {
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
        signOut: mockSignOut,
      });
    });

    it("shows authenticated nav items", () => {
      render(<Header {...defaultProps} />);
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Tracks")).toBeInTheDocument();
      expect(screen.getByText("Snippets")).toBeInTheDocument();
      expect(screen.getByText("Leaderboard")).toBeInTheDocument();
      expect(screen.getByText("Profile")).toBeInTheDocument();
    });

    it("shows Sign Out button", () => {
      render(<Header {...defaultProps} />);
      expect(screen.getByText("Sign Out")).toBeInTheDocument();
    });

    it("calls signOut when Sign Out is clicked", () => {
      render(<Header {...defaultProps} />);
      fireEvent.click(screen.getByText("Sign Out"));
      expect(mockSignOut).toHaveBeenCalled();
    });

    it("displays the user name", () => {
      render(<Header {...defaultProps} />);
      expect(screen.getByText("Test User")).toBeInTheDocument();
    });

    it("links to dashboard when authenticated", () => {
      render(<Header {...defaultProps} />);
      const logo = screen.getByText("LearnIt");
      expect(logo.closest("a")).toHaveAttribute("href", "/dashboard");
    });
  });

  describe("mobile menu toggle", () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        signIn: jest.fn(),
        signOut: mockSignOut,
      });
    });

    it("renders a hamburger button", () => {
      render(<Header {...defaultProps} />);
      const button = screen.getByLabelText("Open menu");
      expect(button).toBeInTheDocument();
    });

    it("calls onMenuToggle when hamburger is clicked", () => {
      const onMenuToggle = jest.fn();
      render(<Header {...defaultProps} onMenuToggle={onMenuToggle} />);
      fireEvent.click(screen.getByLabelText("Open menu"));
      expect(onMenuToggle).toHaveBeenCalledTimes(1);
    });

    it("shows close icon when menu is open", () => {
      render(<Header {...defaultProps} isMobileMenuOpen={true} />);
      expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
    });
  });
});
