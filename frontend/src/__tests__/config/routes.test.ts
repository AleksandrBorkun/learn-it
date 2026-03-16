/**
 * Unit tests for the route configuration utilities.
 */

import { isProtectedRoute, isPublicRoute } from "@/config/routes";

describe("isPublicRoute", () => {
    it("returns true for the home page", () => {
        expect(isPublicRoute("/")).toBe(true);
    });

    it("returns true for the sign-in page", () => {
        expect(isPublicRoute("/sign-in")).toBe(true);
    });

    it("returns true for public routes with query params", () => {
        expect(isPublicRoute("/sign-in?callbackUrl=/dashboard")).toBe(true);
    });

    it("returns false for authenticated routes", () => {
        expect(isPublicRoute("/dashboard")).toBe(false);
        expect(isPublicRoute("/tracks")).toBe(false);
        expect(isPublicRoute("/profile")).toBe(false);
    });
});

describe("isProtectedRoute", () => {
    it("returns true for dashboard", () => {
        expect(isProtectedRoute("/dashboard")).toBe(true);
    });

    it("returns true for tracks and sub-routes", () => {
        expect(isProtectedRoute("/tracks")).toBe(true);
        expect(isProtectedRoute("/tracks/ai")).toBe(true);
        expect(isProtectedRoute("/tracks/ai/lesson-1")).toBe(true);
    });

    it("returns true for snippets", () => {
        expect(isProtectedRoute("/snippets")).toBe(true);
    });

    it("returns true for leaderboard", () => {
        expect(isProtectedRoute("/leaderboard")).toBe(true);
    });

    it("returns true for profile", () => {
        expect(isProtectedRoute("/profile")).toBe(true);
    });

    it("returns false for public routes", () => {
        expect(isProtectedRoute("/")).toBe(false);
        expect(isProtectedRoute("/sign-in")).toBe(false);
    });

    it("returns false for unknown routes", () => {
        expect(isProtectedRoute("/unknown")).toBe(false);
        expect(isProtectedRoute("/about")).toBe(false);
    });
});
