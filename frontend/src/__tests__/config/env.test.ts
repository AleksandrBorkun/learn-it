/**
 * Unit tests for the environment configuration utility.
 */

describe("env config", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    it("returns default values when env vars are not set", async () => {
        delete process.env.NEXT_PUBLIC_API_URL;
        delete process.env.NEXT_PUBLIC_APP_NAME;
        delete process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        delete process.env.NEXT_PUBLIC_ENABLE_ADS;

        const { env } = await import("@/config/env");

        expect(env.apiUrl).toBe("http://localhost:3001");
        expect(env.appName).toBe("LearnIt");
        expect(env.googleClientId).toBe("");
        expect(env.enableAds).toBe(false);
    });

    it("reads custom values from environment", async () => {
        process.env.NEXT_PUBLIC_API_URL = "https://api.learnit.dev";
        process.env.NEXT_PUBLIC_APP_NAME = "LearnIt Pro";
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID = "test-client-id";
        process.env.NEXT_PUBLIC_ENABLE_ADS = "true";

        const { env } = await import("@/config/env");

        expect(env.apiUrl).toBe("https://api.learnit.dev");
        expect(env.appName).toBe("LearnIt Pro");
        expect(env.googleClientId).toBe("test-client-id");
        expect(env.enableAds).toBe(true);
    });

    it("exposes isProduction flag based on NODE_ENV", async () => {
        (process.env as Record<string, string>).NODE_ENV = "production";

        const { env } = await import("@/config/env");

        expect(env.isProduction).toBe(true);
        expect(env.nodeEnv).toBe("production");
    });
});
