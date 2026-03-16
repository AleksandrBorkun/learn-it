"use client";

/**
 * Client-side providers wrapper.
 *
 * Composes all context providers in the correct order:
 * 1. QueryProvider (TanStack React Query for server state)
 * 2. AuthProvider (authentication state)
 * 3. AppShell (layout chrome: header, footer, navigation)
 */

import { QueryProvider } from "@/hooks/use-query-provider";
import { AuthProvider } from "@/hooks/use-auth";
import { AppShell } from "@/components/layout/AppShell";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <AppShell>{children}</AppShell>
      </AuthProvider>
    </QueryProvider>
  );
}
