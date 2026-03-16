/**
 * Leaderboard page — users ranked by points.
 * Full implementation in Task 022.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard",
};

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl">Leaderboard</h1>
      <p className="text-muted">
        See how you rank against other learners. Earn points by completing
        lessons, quizzes, and challenges.
      </p>

      <div
        className="rounded-xl border p-8 text-center text-muted"
        style={{ borderColor: "var(--border)" }}
      >
        Leaderboard data coming soon.
      </div>
    </div>
  );
}
