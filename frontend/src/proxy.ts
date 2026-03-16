/**
 * Next.js Proxy (Route Guard)
 *
 * Runs on every matched request before the route handler.
 * Redirects unauthenticated users away from protected routes
 * to the sign-in page. Checks for the `learnit_token` cookie
 * as a lightweight session indicator.
 *
 * Full JWT validation happens server-side in the backend API.
 * This proxy provides a fast UX-level redirect only.
 */

import { NextRequest, NextResponse } from "next/server";

import { isProtectedRoute } from "@/config/routes";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip non-page routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check for auth token cookie
  const token = request.cookies.get("learnit_token")?.value;
  const isAuthenticated = Boolean(token);

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute(pathname) && !isAuthenticated) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated users away from sign-in page
  if (pathname === "/sign-in" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimisation files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
