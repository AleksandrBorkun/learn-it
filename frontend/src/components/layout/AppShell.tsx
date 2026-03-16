"use client";

/**
 * AppShell — main layout wrapper for the application.
 *
 * Provides the consistent chrome (header, footer, mobile nav,
 * bottom tab bar) around page content. Used in the root layout
 * to ensure every page shares the same application structure.
 */

import { useState } from "react";

import { Header, Footer, MobileNav, BottomTabBar } from "@/components/layout";
import { useAuth } from "@/hooks/use-auth";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        onMenuToggle={() => setIsMobileMenuOpen((prev) => !prev)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main content — offset for fixed header / bottom nav */}
      <main
        className="flex-1 px-4 py-6"
        style={{
          marginTop: "var(--header-height)",
          marginBottom: isAuthenticated ? "var(--bottom-nav-height)" : "0",
          maxWidth: "var(--max-content-width)",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {children}
      </main>

      <Footer />

      {/* Bottom tab bar — mobile only, authenticated users only */}
      <BottomTabBar />
    </div>
  );
}
