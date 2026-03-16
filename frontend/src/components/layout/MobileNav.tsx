"use client";

/**
 * MobileNav — slide-down menu visible on <1024px viewports.
 * Triggered by the hamburger button in the Header.
 */

import Link from "next/link";

import { useAuth } from "@/hooks/use-auth";
import { PUBLIC_ROUTES, AUTH_ROUTES } from "@/config/routes";
import type { NavItem } from "@/types";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
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

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { isAuthenticated, signOut } = useAuth();
  const navItems = isAuthenticated ? authNavItems : publicNavItems;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Nav panel */}
      <nav
        className="fixed top-[var(--header-height)] left-0 right-0 z-50 border-b bg-background p-4 lg:hidden"
        style={{ borderColor: "var(--border)" }}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="touch-target flex items-center rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-surface transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
          {isAuthenticated && (
            <li>
              <button
                onClick={() => {
                  void signOut();
                  onClose();
                }}
                className="touch-target flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-danger-500 hover:bg-surface transition-colors"
              >
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
