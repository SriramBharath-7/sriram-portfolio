"use client";

import { usePortfolioContent } from "@/lib/content/provider";
import PageShell, { Card } from "./PageShell";

export default function EducationPage() {
  const { education } = usePortfolioContent();
  return (
    <PageShell
      icon="🎓"
      title={education.headline}
      subtitle="Academic background and certification goals"
      accent="emerald"
    >
      {education.entries.map((entry) => (
        <Card key={entry.id} className="mb-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="t-xl font-semibold text-emerald-200">{entry.degree}</h3>
              {entry.institution && (
                <div className="text-gray-400 t-lg">{entry.institution}</div>
              )}
            </div>
            <span className="px-2 py-0.5 t-sm rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 whitespace-nowrap">
              {entry.status}
            </span>
          </div>

          <div className="text-gray-400 t-sm uppercase tracking-wide mb-2">
            Relevant coursework
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {entry.coursework.map((course) => (
              <span
                key={course}
                className="t-sm px-2.5 py-1 rounded-md bg-gray-900/60 text-gray-300 border border-gray-700/60"
              >
                {course}
              </span>
            ))}
          </div>

          {entry.notes && <p className="text-gray-300 t-lg">{entry.notes}</p>}
        </Card>
      ))}

      <Card>
        <h3 className="text-emerald-300 font-semibold t-lg tracking-wide mb-3">
          Goals
        </h3>
        <ul className="space-y-2">
          {education.goals.map((goal) => (
            <li key={goal.id} className="flex gap-2 t-lg">
              <span className="text-emerald-400 flex-shrink-0">▸</span>
              <span>
                <span className="text-gray-100">{goal.title}</span>
                {goal.description && (
                  <span className="text-gray-400"> — {goal.description}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </PageShell>
  );
}
