/**
 * Component tests for the MobileNav component.
 */

import { render, screen, fireEvent } from "@testing-library/react";

import { MobileNav } from "@/components/layout/MobileNav";

// Mock the useAuth hook
const mockSignOut = jest.fn();
jest.mock("@/hooks/use-auth", () => ({
  useAuth: jest.fn(),
}));

import { useAuth } from "@/hooks/use-auth";

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe("MobileNav", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when closed", () => {
    it("renders nothing", () => {
      mockUseAuth.mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        signIn: jest.fn(),
        signOut: mockSignOut,
      });

      const { container } = render(
        <MobileNav isOpen={false} onClose={jest.fn()} />,
      );
      expect(container.innerHTML).toBe("");
    });
  });

  describe("unauthenticated - when open", () => {
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

    it("renders public nav links", () => {
      render(<MobileNav {...defaultProps} />);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Sign In")).toBeInTheDocument();
    });

    it("does not render Sign Out button", () => {
      render(<MobileNav {...defaultProps} />);
      expect(screen.queryByText("Sign Out")).not.toBeInTheDocument();
    });

    it("calls onClose when a link is clicked", () => {
      const onClose = jest.fn();
      render(<MobileNav isOpen={true} onClose={onClose} />);
      fireEvent.click(screen.getByText("Home"));
      expect(onClose).toHaveBeenCalled();
    });

    it("calls onClose when backdrop is clicked", () => {
      const onClose = jest.fn();
      render(<MobileNav isOpen={true} onClose={onClose} />);
      // The backdrop is the first div with aria-hidden
      const backdrop = document.querySelector('[aria-hidden="true"]');
      expect(backdrop).not.toBeNull();
      fireEvent.click(backdrop!);
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe("authenticated - when open", () => {
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

    it("renders authenticated nav links", () => {
      render(<MobileNav {...defaultProps} />);
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("Tracks")).toBeInTheDocument();
      expect(screen.getByText("Snippets")).toBeInTheDocument();
      expect(screen.getByText("Leaderboard")).toBeInTheDocument();
      expect(screen.getByText("Profile")).toBeInTheDocument();
    });

    it("renders Sign Out button", () => {
      render(<MobileNav {...defaultProps} />);
      expect(screen.getByText("Sign Out")).toBeInTheDocument();
    });

    it("calls signOut and onClose when Sign Out is clicked", () => {
      const onClose = jest.fn();
      render(<MobileNav isOpen={true} onClose={onClose} />);
      fireEvent.click(screen.getByText("Sign Out"));
      expect(mockSignOut).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });

    it("has proper navigation aria label", () => {
      render(<MobileNav {...defaultProps} />);
      expect(
        screen.getByRole("navigation", { name: "Mobile navigation" }),
      ).toBeInTheDocument();
    });
  });
});
