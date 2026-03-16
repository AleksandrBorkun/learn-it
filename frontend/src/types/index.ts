/**
 * Core type definitions for the LearnIt platform.
 * Shared across components, services, and state management.
 */

// =============================================================================
// User & Authentication
// =============================================================================

/** Access tier for the user */
export type UserTier = "free" | "premium";

/** User profile returned from API */
export interface User {
    id: string;
    email: string;
    displayName: string;
    avatarUrl: string | null;
    tier: UserTier;
    createdAt: string;
    updatedAt: string;
}

/** Authentication state */
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

// =============================================================================
// API
// =============================================================================

/** Standard API error response shape (matches backend contract) */
export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}

/** Standard API success response wrapper */
export interface ApiResponse<T> {
    data: T;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
    };
}

/** Health check response from backend */
export interface HealthCheckResponse {
    status: "ok" | "degraded" | "down";
    timestamp: string;
    version: string;
}

// =============================================================================
// Navigation
// =============================================================================

/** Navigation item for menus */
export interface NavItem {
    label: string;
    href: string;
    icon?: string;
    requiresAuth?: boolean;
}
