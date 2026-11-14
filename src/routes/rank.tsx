import { createFileRoute } from "@tanstack/react-router";
import { MISSIONS } from "@/lib/isidion/data";
import { FillSlot } from "@/components/isidion/FillSlot";
import { PageHeader } from "@/components/isidion/AppShell";

export const Route = createFileRoute("/rank")({
  head: () => ({
    meta: [
      { title: "Similarity Ranking & Mission Fit — ISIDION" },
      { name: "description", content: "Rank Earth analog sites by similarity to Mars or the Moon for a mission." },
      { property: "og:title", content: "Similarity Ranking & Mission Fit — ISIDION" },
      { property: "og:description", content: "Rank Earth analog sites by similarity to Mars or the Moon for a mission." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Rank,
});

function Rank() {
  return (
    <>
      <PageHeader eyebrow="AI similarity ranking" title="Which site fits your mission?">
        Choose a mission profile and target body, or describe your mission for an AI-weighted ranking.
      </PageHeader>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:px-6 lg:grid-cols-[340px_1fr]">
        <aside className="space-y-4">
          <div>
            <p className="label-mono mb-2">Mission profiles</p>
            <div className="space-y-2">
              {MISSIONS.map((m) => (
                <div key={m.id} className="panel p-3">
                  <p className="text-sm font-medium">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.tagline}</p>
                </div>
              ))}
            </div>
          </div>
          <FillSlot
            slot="weight-controls"
            title="Target body & weights"
            hint="Mars / Moon toggle and 12 dimension weight sliders."
            inputs={["MISSIONS[].weights", "DIMENSIONS"]}
          />
        </aside>

        <div className="space-y-6">
          <FillSlot
            slot="ai-mission-brief"
            title="AI mission analyst"
            hint="Free-text mission description → AI proposes target body and weights → feeds the ranking algorithm."
            inputs={["brief: string", "→ weights", "→ rationale"]}
            className="min-h-40"
          />
          <FillSlot
            slot="ranked-results"
            title="Ranked analog sites"
            hint="Ordered list with score, uncertainty interval, confidence, top drivers and gaps, plus mission recommendations."
            inputs={["rankSites(body, mission, weights)", "site.missions[mission]"]}
            className="min-h-[420px]"
          />
        </div>
      </div>
    </>
  );
}
