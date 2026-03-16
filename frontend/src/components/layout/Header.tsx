"use client";

/**
 * Header component — top navigation bar.
 *
 * Mobile: shows logo + hamburger toggle.
 * Desktop (≥1024px): shows logo + horizontal nav links + user menu.
 */

import Link from "next/link";

import { useAuth } from "@/hooks/use-auth";
import { PUBLIC_ROUTES, AUTH_ROUTES } from "@/config/routes";
import type { NavItem } from "@/types";

interface HeaderProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const publicNavItems: NavItem[] = [
  { label: "Home", href: PUBLIC_ROUTES.HOME },
  { label: "Sign In", href: PUBLIC_ROUTES.SIGN_IN },
];

const authNavItems: NavItem[] = [
  { label: "Dashboard", href: AUTH_ROUTES.DASHBOARD, requiresAuth: true },
  { label: "Tracks", href: AUTH_ROUTES.TRACKS, requiresAuth: true },
  { label: "Snippets", href: AUTH_ROUTES.SNIPPETS, requiresAuth: true },
  { label: "Leaderboard", href: AUTH_ROUTES.LEADERBOARD, requiresAuth: true },
  { label: "Profile", href: AUTH_ROUTES.PROFILE, requiresAuth: true },
];

export function Header({ onMenuToggle, isMobileMenuOpen }: HeaderProps) {
  const { isAuthenticated, user, signOut } = useAuth();
  const navItems = isAuthenticated ? authNavItems : publicNavItems;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b bg-background"
      style={{ height: "var(--header-height)", borderColor: "var(--border)" }}
    >
      <div
        className="mx-auto flex h-full items-center justify-between px-4"
        style={{ maxWidth: "var(--max-content-width)" }}
      >
        {/* Logo / Brand */}
        <Link
          href={isAuthenticated ? AUTH_ROUTES.DASHBOARD : PUBLIC_ROUTES.HOME}
          className="text-xl font-bold text-foreground"
        >
          LearnIt
        </Link>

        {/* Desktop navigation (hidden on mobile) */}
        <nav
          className="hidden lg:flex lg:items-center lg:gap-6"
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="touch-target flex items-center text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated && (
            <button
              onClick={() => void signOut()}
              className="touch-target text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Sign Out
            </button>
          )}
          {isAuthenticated && user && (
            <span className="ml-2 text-sm text-muted">{user.displayName}</span>
          )}
        </nav>

        {/* Mobile hamburger button (visible below lg) */}
        <button
          className="touch-target flex items-center justify-center lg:hidden"
          onClick={onMenuToggle}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}
