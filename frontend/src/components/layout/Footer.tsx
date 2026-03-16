/**
 * Footer component — displayed at the bottom of every page.
 */

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t bg-background px-4 py-6 text-center text-sm text-muted"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="mx-auto flex flex-col items-center gap-2 md:flex-row md:justify-between"
        style={{ maxWidth: "var(--max-content-width)" }}
      >
        <p>&copy; {currentYear} LearnIt. All rights reserved.</p>
        <nav className="flex gap-4" aria-label="Footer navigation">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link
            href="/sign-in"
            className="hover:text-foreground transition-colors"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </footer>
  );
}
