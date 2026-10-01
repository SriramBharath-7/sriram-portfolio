"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePortfolioContent } from "@/lib/content/provider";
import type { Certification } from "@/content/types";
import PageShell from "./PageShell";

function formatDate(value?: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Compact card: thumbnail on the left, details tight against the content so the
 * card is only as tall as what it actually holds.
 */
function CertCard({ cert, onOpen }: { cert: Certification; onOpen: () => void }) {
  const completed = formatDate(cert.completed) ?? formatDate(cert.issued);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="cert-card-v2 group text-left w-full flex gap-4 p-4 rounded-xl bg-gray-800/45 border border-slate-700/70 hover:border-blue-400/50 hover:bg-gray-800/70"
    >
      <div className="flex-shrink-0 w-28 aspect-[4/3] rounded-lg bg-gray-950/70 border border-slate-700/70 overflow-hidden flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
        <Image
          src={cert.image}
          alt={cert.title}
          width={224}
          height={168}
          className="cert-thumb w-full h-full object-contain p-2"
        />
      </div>

      <div className="min-w-0 flex-1 flex flex-col">
        <div className="flex items-start gap-2.5">
          <h3 className="t-lg font-semibold text-slate-100 leading-snug min-w-0 group-hover:text-white">
            {cert.title}
          </h3>
          <span className="ml-auto flex-shrink-0 inline-flex items-center gap-1.5 t-xs px-2.5 py-1 rounded-full bg-emerald-500/12 text-emerald-300 border border-emerald-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {cert.status}
          </span>
        </div>

        {cert.provider && (
          <div className="t-sm text-blue-300/75 mt-1 truncate font-medium">
            {cert.provider}
          </div>
        )}

        <p className="t-md text-slate-400 mt-2 line-clamp-2 leading-relaxed">
          {cert.description}
        </p>

        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-700/50 t-sm">
          {completed && <span className="text-slate-500">{completed}</span>}
          <span className="ml-auto text-blue-300 group-hover:text-blue-200 font-medium">
            View certificate →
          </span>
        </div>
      </div>
    </button>
  );
}

export default function CertificationsPage() {
  const { certifications } = usePortfolioContent();
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  useEffect(() => {
    if (!activeCert) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveCert(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activeCert]);

  return (
    <PageShell
      icon="✅"
      title="Certifications"
      subtitle={`${certifications.length} completed · select a card to view the certificate`}
      accent="blue"
    >
      <div className="cq-grid cq-grid-cert gap-5">
        {certifications.map((cert) => (
          <CertCard key={cert.id} cert={cert} onOpen={() => setActiveCert(cert)} />
        ))}
      </div>

      {activeCert && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 backdrop-blur-sm p-6"
          onClick={() => setActiveCert(null)}
          role="dialog"
          aria-modal="true"
          aria-label={activeCert.title}
        >
          <button
            type="button"
            aria-label="Close certificate"
            className="absolute top-5 right-6 w-9 h-9 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-xl"
            onClick={() => setActiveCert(null)}
          >
            ✕
          </button>

          <div
            className="mx-auto max-w-4xl w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
              <h2 className="t-xl font-semibold text-blue-100 min-w-0">
                {activeCert.title}
              </h2>
            </div>

            <div className="bg-gray-950/80 border border-blue-500/25 rounded-xl overflow-hidden">
              <Image
                src={activeCert.image}
                alt={activeCert.title}
                width={1200}
                height={850}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>

            <div className="text-blue-300/80 t-sm mt-3 flex items-center gap-2 flex-wrap">
              {activeCert.provider && <span>{activeCert.provider}</span>}
              {activeCert.provider && activeCert.completed && <span>·</span>}
              {formatDate(activeCert.completed) && (
                <span>{formatDate(activeCert.completed)}</span>
              )}
              <span className="ml-auto text-gray-500">Press Esc to close</span>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
