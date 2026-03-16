/**
 * @jest-environment node
 */

/**
 * Unit tests for the route guard proxy.
 *
 * Tests the proxy function that redirects unauthenticated users
 * from protected routes and authenticated users away from sign-in.
 */

import { NextRequest } from "next/server";

import proxy from "@/proxy";

/** Helper to create a NextRequest with optional cookies */
function createRequest(
    path: string,
    options?: { cookies?: Record<string, string> },
): NextRequest {
    const url = new URL(path, "http://localhost:3000");
    const request = new NextRequest(url);

    if (options?.cookies) {
        for (const [key, value] of Object.entries(options.cookies)) {
            request.cookies.set(key, value);
        }
    }

    return request;
}

describe("proxy (route guard)", () => {
    describe("unauthenticated user", () => {
        it("allows access to the home page", () => {
            const request = createRequest("/");
            const response = proxy(request);

            expect(response.status).not.toBe(307);
        });

        it("allows access to the sign-in page", () => {
            const request = createRequest("/sign-in");
            const response = proxy(request);

            expect(response.status).not.toBe(307);
        });

        it("redirects from /dashboard to /sign-in", () => {
            const request = createRequest("/dashboard");
            const response = proxy(request);

            expect(response.status).toBe(307);
            const redirectUrl = new URL(response.headers.get("Location")!);
            expect(redirectUrl.pathname).toBe("/sign-in");
            expect(redirectUrl.searchParams.get("callbackUrl")).toBe("/dashboard");
        });

        it("redirects from /tracks to /sign-in", () => {
            const request = createRequest("/tracks");
            const response = proxy(request);

            expect(response.status).toBe(307);
            const redirectUrl = new URL(response.headers.get("Location")!);
            expect(redirectUrl.pathname).toBe("/sign-in");
        });

        it("redirects from /tracks/ai/lesson-1 to /sign-in", () => {
            const request = createRequest("/tracks/ai/lesson-1");
            const response = proxy(request);

            expect(response.status).toBe(307);
            const redirectUrl = new URL(response.headers.get("Location")!);
            expect(redirectUrl.pathname).toBe("/sign-in");
            expect(redirectUrl.searchParams.get("callbackUrl")).toBe(
                "/tracks/ai/lesson-1",
            );
        });

        it("redirects from /snippets to /sign-in", () => {
            const request = createRequest("/snippets");
            const response = proxy(request);

            expect(response.status).toBe(307);
        });

        it("redirects from /leaderboard to /sign-in", () => {
            const request = createRequest("/leaderboard");
            const response = proxy(request);

            expect(response.status).toBe(307);
        });

        it("redirects from /profile to /sign-in", () => {
            const request = createRequest("/profile");
            const response = proxy(request);

            expect(response.status).toBe(307);
        });
    });

    describe("authenticated user", () => {
        const authCookie = { learnit_token: "test-jwt-token" };

        it("allows access to /dashboard", () => {
            const request = createRequest("/dashboard", { cookies: authCookie });
            const response = proxy(request);

            expect(response.status).not.toBe(307);
        });

        it("allows access to /tracks", () => {
            const request = createRequest("/tracks", { cookies: authCookie });
            const response = proxy(request);

            expect(response.status).not.toBe(307);
        });

        it("allows access to /snippets", () => {
            const request = createRequest("/snippets", { cookies: authCookie });
            const response = proxy(request);

            expect(response.status).not.toBe(307);
        });

        it("allows access to /leaderboard", () => {
            const request = createRequest("/leaderboard", { cookies: authCookie });
            const response = proxy(request);

            expect(response.status).not.toBe(307);
        });

        it("allows access to /profile", () => {
            const request = createRequest("/profile", { cookies: authCookie });
            const response = proxy(request);

            expect(response.status).not.toBe(307);
        });

        it("redirects from /sign-in to /dashboard", () => {
            const request = createRequest("/sign-in", { cookies: authCookie });
            const response = proxy(request);

            expect(response.status).toBe(307);
            const redirectUrl = new URL(response.headers.get("Location")!);
            expect(redirectUrl.pathname).toBe("/dashboard");
        });
    });

    describe("static asset paths", () => {
        it("skips /_next paths", () => {
            const request = createRequest("/_next/static/chunk.js");
            const response = proxy(request);

            expect(response.status).toBe(200);
        });

        it("skips /api paths", () => {
            const request = createRequest("/api/health");
            const response = proxy(request);

            expect(response.status).toBe(200);
        });

        it("skips paths with file extensions", () => {
            const request = createRequest("/favicon.ico");
            const response = proxy(request);

            expect(response.status).toBe(200);
        });
    });
});
