/**
 * Tracks catalog page — browse available learning tracks.
 * Full implementation in Task 008.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Tracks",
};

export default function TracksPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl">Learning Tracks</h1>
      <p className="text-muted">
        Choose a track to begin your learning journey.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          {
            name: "AI",
            description:
              "Machine learning, neural networks, NLP, and practical AI applications.",
          },
          {
            name: "Frontend",
            description:
              "HTML, CSS, JavaScript, React, and modern frontend tooling.",
          },
          {
            name: "DevOps",
            description:
              "CI/CD, containers, Kubernetes, infrastructure as code, and monitoring.",
          },
          {
            name: "Cloud (AWS)",
            description:
              "AWS services, architecture patterns, serverless, and cloud-native development.",
          },
        ].map((track) => (
          <div
            key={track.name}
            className="rounded-xl border p-6 hover:shadow-md transition-shadow"
            style={{ borderColor: "var(--border)" }}
          >
            <h3 className="mb-2 text-lg font-semibold">{track.name}</h3>
            <p className="text-sm text-muted">{track.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
