/**
 * Public route group layout — no additional chrome needed
 * beyond the root layout's AppShell.
 */

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
