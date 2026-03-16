"use client";

/**
 * TanStack React Query Provider — wraps the application with
 * server state management for API data fetching, caching,
 * and cache invalidation.
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Stale time: 30 seconds — keeps UI responsive while
            // still refreshing data reasonably often
            staleTime: 30 * 1000,
            // Retry failed requests once before surfacing the error
            retry: 1,
            // Refetch on window focus for fresh data
            refetchOnWindowFocus: true,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
