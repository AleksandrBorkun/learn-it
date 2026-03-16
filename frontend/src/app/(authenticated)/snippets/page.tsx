/**
 * Code snippets library page — save and organise code snippets.
 * Full implementation in Task 020.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Snippets",
};

export default function SnippetsPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl">Code Snippets</h1>
      <p className="text-muted">
        Your personal code snippet library. Save, organise, and search code from
        lessons or your own projects.
      </p>

      <div
        className="rounded-xl border p-8 text-center text-muted"
        style={{ borderColor: "var(--border)" }}
      >
        No snippets saved yet. Start a lesson to save your first snippet!
      </div>
    </div>
  );
}
