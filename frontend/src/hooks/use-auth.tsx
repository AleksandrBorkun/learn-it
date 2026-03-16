"use client";

/**
 * Authentication Context & Provider
 *
 * Manages global authentication state (user, tier, loading).
 * Provides sign-in and sign-out actions.
 *
 * In Task 005/006, this will be integrated with Firebase Auth / Google OAuth.
 * For now, the provider exposes the contract that downstream components use.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { AuthState, User } from "@/types";
import { apiClient } from "@/services/api-client";

// =============================================================================
// Context shape
// =============================================================================

interface AuthContextValue extends AuthState {
  /** Trigger Google OAuth sign-in (placeholder — wired in Task 006) */
  signIn: () => Promise<void>;
  /** Clear session and redirect to home */
  signOut: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// =============================================================================
// Provider
// =============================================================================

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(initialState);

  // On mount, attempt to restore session from token cookie
  useEffect(() => {
    async function restoreSession() {
      try {
        const token =
          typeof window !== "undefined"
            ? document.cookie.match(/(?:^|;\s*)learnit_token=([^;]*)/)?.[1]
            : null;

        if (!token) {
          setState((prev) => ({ ...prev, isLoading: false }));
          return;
        }

        // Validate token by fetching current user profile
        const response = await apiClient.get<{ data: User }>("/auth/me");
        setState({
          user: response.data.data,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch {
        // Token invalid or expired — clear state
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    }

    restoreSession();
  }, []);

  const signIn = useCallback(async () => {
    // Placeholder — Google OAuth flow will be implemented in Task 006
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // TODO: Trigger Google OAuth redirect / popup
      throw new Error("Sign-in not yet implemented (Task 006)");
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : "Sign-in failed",
      }));
    }
  }, []);

  const signOut = useCallback(async () => {
    // Clear the auth cookie
    if (typeof window !== "undefined") {
      document.cookie =
        "learnit_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      signIn,
      signOut,
    }),
    [state, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// =============================================================================
// Hook
// =============================================================================

/**
 * Access authentication state and actions.
 * Must be used within an `<AuthProvider>`.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
