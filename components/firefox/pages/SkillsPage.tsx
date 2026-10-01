"use client";

import { usePortfolioContent } from "@/lib/content/provider";
import PageShell, { Card } from "./PageShell";

export default function SkillsPage() {
  const { skills } = usePortfolioContent();
  return (
    <PageShell
      icon="⚙️"
      title={skills.headline}
      subtitle={skills.intro}
      accent="cyan"
    >
      <div className="cq-grid cq-grid-2 mb-6">
        {skills.groups.map((group) => (
          <Card key={group.id}>
            <h3 className="text-cyan-300 font-semibold t-lg tracking-wide mb-3">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item.id}>
                  <div className="text-gray-100 t-lg font-medium">{item.name}</div>
                  {item.description && (
                    <div className="text-gray-400 t-sm">{item.description}</div>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <Card>
        <h3 className="text-cyan-300 font-semibold t-lg tracking-wide mb-3">
          Areas of interest
        </h3>
        <div className="flex flex-wrap gap-2">
          {skills.interests.map((interest) => (
            <span
              key={interest}
              className="t-sm px-2.5 py-1 rounded-full bg-cyan-900/30 text-cyan-200 border border-cyan-500/25"
            >
              {interest}
            </span>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}
