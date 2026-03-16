/**
 * Landing page — public home page for unauthenticated visitors.
 */

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12 text-center">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        Learn Software Development,{" "}
        <span className="text-primary-600">Your Way</span>
      </h1>

      <p className="max-w-2xl text-base text-muted md:text-lg">
        Structured learning tracks in AI, Frontend, DevOps, and Cloud (AWS) with
        hands-on challenges, quizzes, and real-world projects. Start free,
        upgrade when you&apos;re ready.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/sign-in"
          className="touch-target inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
        >
          Get Started — It&apos;s Free
        </Link>
        <Link
          href="/tracks"
          className="touch-target inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-semibold text-foreground hover:bg-surface transition-colors"
          style={{ borderColor: "var(--border)" }}
        >
          Browse Tracks
        </Link>
      </div>

      {/* Feature highlights */}
      <section className="mt-12 grid w-full max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "4 Learning Tracks",
            description:
              "AI, Frontend, DevOps, and Cloud Development (AWS) — from fundamentals to advanced.",
          },
          {
            title: "Hands-On Challenges",
            description:
              "Write real code in an in-browser editor with instant feedback.",
          },
          {
            title: "Earn Certificates",
            description:
              "Complete tracks, earn badges, and share certificates on LinkedIn.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border p-6 text-left"
            style={{ borderColor: "var(--border)" }}
          >
            <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
