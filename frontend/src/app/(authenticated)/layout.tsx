/**
 * Authenticated route group layout.
 *
 * This layout is shared by all pages that require authentication.
 * The actual auth check is handled by middleware (middleware.ts);
 * this layout can add authenticated-only UI chrome if needed later.
 */

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
