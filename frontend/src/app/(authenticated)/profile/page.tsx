/**
 * User profile page — display name, badges, certificates.
 * Full implementation in Task 024.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl">Profile</h1>
      <p className="text-muted">
        View your profile, earned badges, certificates, and account settings.
      </p>

      <div
        className="rounded-xl border p-8 text-center text-muted"
        style={{ borderColor: "var(--border)" }}
      >
        Profile details will be available once authentication is completed (Task
        006).
      </div>
    </div>
  );
}
