/**
 * Unit tests for getAuthToken in a browser-like (jsdom) environment.
 * Tests cookie parsing and token extraction.
 */

import { getAuthToken } from "@/services/api-client";

describe("getAuthToken (browser environment)", () => {
    it("returns null when no cookie is set", () => {
        Object.defineProperty(document, "cookie", {
            value: "",
            writable: true,
            configurable: true,
        });

        expect(getAuthToken()).toBeNull();
    });

    it("returns the token value from the cookie", () => {
        Object.defineProperty(document, "cookie", {
            value: "learnit_token=my-jwt-token; other=value",
            writable: true,
            configurable: true,
        });

        expect(getAuthToken()).toBe("my-jwt-token");
    });

    it("handles URL-encoded token values", () => {
        Object.defineProperty(document, "cookie", {
            value: "learnit_token=token%20with%20spaces",
            writable: true,
            configurable: true,
        });

        expect(getAuthToken()).toBe("token with spaces");
    });

    it("returns null when cookie name does not match", () => {
        Object.defineProperty(document, "cookie", {
            value: "other_cookie=somevalue",
            writable: true,
            configurable: true,
        });

        expect(getAuthToken()).toBeNull();
    });
});
