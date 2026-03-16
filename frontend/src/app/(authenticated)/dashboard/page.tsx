/**
 * Dashboard page — at-a-glance view of learning progress.
 * Full implementation in Task 011.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl">Dashboard</h1>
      <p className="text-muted">
        Your learning progress at a glance. Track completion, recent activity,
        and quick access to your courses.
      </p>

      {/* Placeholder cards — replaced in Task 011 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {["AI", "Frontend", "DevOps", "Cloud (AWS)"].map((track) => (
          <div
            key={track}
            className="rounded-xl border p-6"
            style={{ borderColor: "var(--border)" }}
          >
            <h3 className="mb-2 text-lg font-semibold">{track}</h3>
            <div className="h-2 w-full rounded-full bg-neutral-200">
              <div
                className="h-2 rounded-full bg-primary-500"
                style={{ width: "0%" }}
              />
            </div>
            <p className="mt-2 text-sm text-muted">0% complete</p>
          </div>
        ))}
      </div>
    </div>
  );
}
