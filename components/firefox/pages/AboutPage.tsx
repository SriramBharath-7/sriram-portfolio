"use client";

import { usePortfolioContent } from "@/lib/content/provider";
import PageShell, { Card } from "./PageShell";

export default function AboutPage() {
  const { about, profile } = usePortfolioContent();
  return (
    <PageShell
      icon="🛡️"
      title={`About ${profile.name}`}
      subtitle={profile.role}
      accent="purple"
    >
      <Card className="mb-6">
        <p className="text-gray-200 leading-relaxed">{about.headline}</p>
      </Card>

      <div className="cq-grid cq-grid-2">
        {about.sections.map((section) => (
          <Card key={section.id}>
            <h3 className="text-purple-300 font-semibold tracking-wide t-lg mb-3">
              {section.title}
            </h3>
            {section.body && (
              <p className="text-gray-300 t-lg leading-relaxed">{section.body}</p>
            )}
            {section.bullets && section.bullets.length > 0 && (
              <ul className="space-y-1.5">
                {section.bullets.map((bullet, index) => (
                  <li key={index} className="t-lg text-gray-300 flex gap-2">
                    <span className="text-purple-400 flex-shrink-0">▸</span>
                    <span>
                      <span className="text-gray-100 font-medium">{bullet.label}</span>
                      {bullet.description ? ` — ${bullet.description}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
