/**
 * API Client — Axios-based HTTP client for the LearnIt backend.
 *
 * Features:
 * - Request interceptor: injects auth token from cookie/storage
 * - Response interceptor: normalizes errors to ApiError shape
 * - Configurable base URL via environment variable
 *
 * Designed to be replaced by an auto-generated SDK client
 * from the backend's OpenAPI specification in the future.
 */

import axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from "axios";

import { env } from "@/config/env";
import type { ApiError, ApiResponse, HealthCheckResponse } from "@/types";

// =============================================================================
// Token accessor — abstracted so auth strategy can change later
// =============================================================================

/**
 * Retrieve the current authentication token.
 * Returns null if no token is available.
 *
 * This reads from a cookie named `learnit_token`. In future,
 * this can be swapped for Firebase Auth `getIdToken()`.
 */
export function getAuthToken(): string | null {
    if (typeof window === "undefined") return null;

    // Read from cookie
    const match = document.cookie.match(/(?:^|;\s*)learnit_token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
}

// =============================================================================
// Axios instance
// =============================================================================

function createApiClient(): AxiosInstance {
    const client = axios.create({
        baseURL: env.apiUrl,
        timeout: 15_000,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });

    // ---- Request Interceptor: inject auth token ----
    client.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = getAuthToken();
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error),
    );

    // ---- Response Interceptor: normalize errors ----
    client.interceptors.response.use(
        (response) => response,
        (error: AxiosError<ApiError>) => {
            const apiError: ApiError = error.response?.data ?? {
                code: "NETWORK_ERROR",
                message: error.message || "An unexpected network error occurred.",
                details: { status: error.response?.status },
            };

            return Promise.reject(apiError);
        },
    );

    return client;
}

/** Singleton API client instance */
export const apiClient = createApiClient();

// =============================================================================
// Convenience methods
// =============================================================================

/** GET /health — check backend availability */
export async function checkHealth(): Promise<HealthCheckResponse> {
    const response =
        await apiClient.get<ApiResponse<HealthCheckResponse>>("/health");
    return response.data.data;
}
