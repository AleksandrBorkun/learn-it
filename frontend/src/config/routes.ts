/**
 * Route constants for the application.
 * Organizes routes into public and authenticated groups.
 */

/** Public routes — accessible without authentication */
export const PUBLIC_ROUTES = {
    HOME: "/",
    SIGN_IN: "/sign-in",
} as const;

/** Authenticated routes — require sign-in */
export const AUTH_ROUTES = {
    DASHBOARD: "/dashboard",
    TRACKS: "/tracks",
    SNIPPETS: "/snippets",
    LEADERBOARD: "/leaderboard",
    PROFILE: "/profile",
} as const;

/** All protected route prefixes used by middleware */
export const PROTECTED_PREFIXES = [
    "/dashboard",
    "/tracks",
    "/snippets",
    "/leaderboard",
    "/profile",
] as const;

/** Check if a path is a public route */
export function isPublicRoute(path: string): boolean {
    return Object.values(PUBLIC_ROUTES).some(
        (route) => path === route || path.startsWith(`${route}?`),
    );
}

/** Check if a path requires authentication */
export function isProtectedRoute(path: string): boolean {
    return PROTECTED_PREFIXES.some(
        (prefix) => path === prefix || path.startsWith(`${prefix}/`),
    );
}
