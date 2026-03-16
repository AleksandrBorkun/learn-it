"use client";

/**
 * BottomTabBar — fixed bottom navigation for mobile viewports.
 *
 * Shown only to authenticated users on screens < 1024px.
 * Provides quick access to core features: Dashboard, Tracks,
 * Snippets, Leaderboard, Profile.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";
import { AUTH_ROUTES } from "@/config/routes";

interface TabItem {
  label: string;
  href: string;
  /** Simple SVG path for the icon */
  iconPath: string;
}

const tabs: TabItem[] = [
  {
    label: "Home",
    href: AUTH_ROUTES.DASHBOARD,
    // grid icon
    iconPath: "M3 3h7v7H3V3zm11 0h7v7h-7V3zm0 11h7v7h-7v-7zM3 14h7v7H3v-7z",
  },
  {
    label: "Tracks",
    href: AUTH_ROUTES.TRACKS,
    // book icon
    iconPath:
      "M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 014 17V5a2.5 2.5 0 012.5-2.5H20v15H6.5z",
  },
  {
    label: "Snippets",
    href: AUTH_ROUTES.SNIPPETS,
    // code icon
    iconPath: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  },
  {
    label: "Board",
    href: AUTH_ROUTES.LEADERBOARD,
    // trophy icon
    iconPath:
      "M6 9H3V4h3m12 5h3V4h-3m-9 14h6m-3 0v-4m0 0a5 5 0 005-5V4H7v5a5 5 0 005 5z",
  },
  {
    label: "Profile",
    href: AUTH_ROUTES.PROFILE,
    // user icon
    iconPath:
      "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  },
];

export function BottomTabBar() {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  // Only render for authenticated users on mobile
  if (!isAuthenticated) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background lg:hidden"
      style={{
        height: "var(--bottom-nav-height)",
        borderColor: "var(--border)",
      }}
      role="navigation"
      aria-label="Bottom navigation"
    >
      <ul className="flex h-full items-center justify-around">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={`touch-target flex flex-col items-center justify-center gap-0.5 px-2 py-1 text-xs transition-colors ${
                  isActive
                    ? "text-primary-600 font-semibold"
                    : "text-muted hover:text-foreground"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={tab.iconPath} />
                </svg>
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
