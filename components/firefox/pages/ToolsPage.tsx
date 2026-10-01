"use client";

import { usePortfolioContent } from "@/lib/content/provider";
import PageShell, { Card } from "./PageShell";

export default function ToolsPage() {
  const { tools } = usePortfolioContent();
  return (
    <PageShell icon="🧰" title={tools.headline} subtitle={tools.intro} accent="amber">
      <div className="cq-grid cq-grid-2 mb-6">
        {tools.items.map((item) => (
          <Card key={item} className="border-amber-500/20">
            <div className="flex gap-3 items-start">
              <span className="text-amber-400 mt-0.5">▸</span>
              <span className="text-gray-200 t-lg">{item}</span>
            </div>
          </Card>
        ))}
      </div>

      {tools.closing && (
        <Card className="border-amber-500/20">
          <p className="text-gray-300 t-lg">{tools.closing}</p>
        </Card>
      )}
    </PageShell>
  );
}
