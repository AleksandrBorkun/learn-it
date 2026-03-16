/**
 * @jest-environment node
 */

/**
 * Unit tests for the API client — interceptors and error handling.
 *
 * Runs in Node environment because axios interceptors and
 * Next.js server imports don't work in jsdom.
 */

import axios from "axios";

import { apiClient, getAuthToken } from "@/services/api-client";

// Axios interceptor handler type — uses unknown[] since internal API typing varies
type InterceptorHandlers = Array<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fulfilled?: (...args: any[]) => any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rejected?: (...args: any[]) => any;
}>;

/** Helper to access axios interceptor handlers (internal API used for testing) */
function getRequestHandlers(): InterceptorHandlers {
    return (
        apiClient.interceptors.request as unknown as {
            handlers: InterceptorHandlers;
        }
    ).handlers;
}

function getResponseHandlers(): InterceptorHandlers {
    return (
        apiClient.interceptors.response as unknown as {
            handlers: InterceptorHandlers;
        }
    ).handlers;
}

describe("getAuthToken", () => {
    it("returns null on the server (no window/document)", () => {
        // In node environment, window is undefined
        expect(getAuthToken()).toBeNull();
    });
});

describe("apiClient request interceptor", () => {
    it("has at least one request interceptor registered", () => {
        const handlers = getRequestHandlers();
        expect(handlers[0]).toBeDefined();
        expect(handlers[0].fulfilled).toBeInstanceOf(Function);
    });

    it("passes through config when no token is available (server-side)", async () => {
        const handlers = getRequestHandlers();
        const config = {
            headers: new axios.AxiosHeaders(),
            url: "/test",
            method: "get" as const,
        };

        // On server, getAuthToken returns null, so no Authorization header
        const result = await handlers[0].fulfilled!(config);
        expect(result.headers.Authorization).toBeUndefined();
    });
});

describe("apiClient response interceptor", () => {
    it("has at least one response interceptor registered", () => {
        const handlers = getResponseHandlers();
        expect(handlers[0]).toBeDefined();
        expect(handlers[0].rejected).toBeInstanceOf(Function);
    });

    it("normalizes API errors from response", async () => {
        const handlers = getResponseHandlers();

        const axiosError = {
            response: {
                status: 401,
                data: {
                    code: "UNAUTHORIZED",
                    message: "Invalid token",
                    details: {},
                },
            },
            message: "Request failed with status code 401",
        };

        await expect(handlers[0].rejected!(axiosError)).rejects.toEqual({
            code: "UNAUTHORIZED",
            message: "Invalid token",
            details: {},
        });
    });

    it("produces NETWORK_ERROR for errors without response", async () => {
        const handlers = getResponseHandlers();

        const networkError = {
            message: "Network Error",
            response: undefined,
        };

        await expect(handlers[0].rejected!(networkError)).rejects.toEqual({
            code: "NETWORK_ERROR",
            message: "Network Error",
            details: { status: undefined },
        });
    });

    it("produces NETWORK_ERROR with fallback message when error message is empty", async () => {
        const handlers = getResponseHandlers();

        const emptyError = {
            message: "",
            response: undefined,
        };

        await expect(handlers[0].rejected!(emptyError)).rejects.toEqual({
            code: "NETWORK_ERROR",
            message: "An unexpected network error occurred.",
            details: { status: undefined },
        });
    });
});

describe("apiClient request interceptor error handler", () => {
    it("rejects with the original error when request setup fails", async () => {
        const handlers = getRequestHandlers();
        const originalError = new Error("Config setup failed");

        await expect(handlers[0].rejected!(originalError)).rejects.toThrow(
            "Config setup failed",
        );
    });
});

describe("checkHealth", () => {
    it("fetches the health endpoint and returns data", async () => {
        const mockResponse = {
            data: {
                data: {
                    status: "ok" as const,
                    timestamp: "2026-03-16T00:00:00Z",
                    version: "1.0.0",
                },
            },
        };

        // Temporarily mock apiClient.get
        const originalGet = apiClient.get;
        apiClient.get = jest
            .fn()
            .mockResolvedValue(mockResponse) as typeof apiClient.get;

        const { checkHealth } = await import("@/services/api-client");
        const result = await checkHealth();

        expect(result).toEqual({
            status: "ok",
            timestamp: "2026-03-16T00:00:00Z",
            version: "1.0.0",
        });

        expect(apiClient.get).toHaveBeenCalledWith("/health");

        apiClient.get = originalGet;
    });
});
