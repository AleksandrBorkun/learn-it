/**
 * Environment configuration utility.
 *
 * Centralizes access to environment variables with validation
 * and sensible defaults. All client-side env vars use the
 * NEXT_PUBLIC_ prefix per Vercel conventions.
 */

interface EnvConfig {
    /** Backend API base URL */
    apiUrl: string;
    /** Application display name */
    appName: string;
    /** Google OAuth Client ID */
    googleClientId: string;
    /** Whether ads are enabled */
    enableAds: boolean;
    /** Current environment */
    nodeEnv: string;
    /** Whether running in production */
    isProduction: boolean;
}

function getEnvConfig(): EnvConfig {
    const nodeEnv = process.env.NODE_ENV || "development";

    return {
        apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
        appName: process.env.NEXT_PUBLIC_APP_NAME || "LearnIt",
        googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        enableAds: process.env.NEXT_PUBLIC_ENABLE_ADS === "true",
        nodeEnv,
        isProduction: nodeEnv === "production",
    };
}

export const env = getEnvConfig();
