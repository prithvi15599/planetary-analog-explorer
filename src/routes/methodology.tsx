import { createFileRoute } from "@tanstack/react-router";
import { DIMENSIONS, DIM_GROUP_LABEL } from "@/lib/isidion/data";
import { ConfidenceBadge } from "@/components/isidion/Badges";
import { FillSlot } from "@/components/isidion/FillSlot";
import { PageHeader } from "@/components/isidion/AppShell";
import { Reveal, TiltCard } from "@/components/isidion/motion";

export const Route = createFileRoute("/methodology")({
  head: () => ({
    meta: [
      { title: "Methodology & Data Confidence — ISIDION" },
      { name: "description", content: "Analog dimensions, data confidence tiers and model limitations behind ISIDION." },
      { property: "og:title", content: "Methodology & Data Confidence — ISIDION" },
      { property: "og:description", content: "Analog dimensions, data confidence tiers and model limitations behind ISIDION." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Methodology,
});

function Methodology() {
  return (
    <>
      <PageHeader eyebrow="Methodology" title="How ISIDION scores analogs">
        Every site is placed on twelve normalised dimensions shared with Mars and the Moon.
      </PageHeader>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-6">
        <FillSlot
          slot="algorithm-explainer"
          title="Similarity algorithm"
          hint="Describe or visualise your scoring formula here once computeSimilarity() is implemented."
          inputs={["src/lib/isidion/engine.ts"]}
          className="min-h-36"
        />

        <section>
          <p className="label-mono mb-3">Analog dimensions</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DIMENSIONS.map((d, i) => (
              <Reveal key={d.key} delay={(i % 3) * 80}>
              <TiltCard className="panel h-full rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-primary">{d.short}</span>
                  <span className="label-mono">{DIM_GROUP_LABEL[d.group]}</span>
                </div>
                <h3 className="mt-2 font-medium">{d.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.description}</p>
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">{d.scale}</p>
              </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="panel p-5">
          <p className="label-mono mb-3">Data confidence tiers</p>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><ConfidenceBadge level="high" /><span>Directly measured at the site and reported in peer-reviewed literature.</span></li>
            <li className="flex gap-3"><ConfidenceBadge level="medium" /><span>Literature-derived or regional values; may vary across the site.</span></li>
            <li className="flex gap-3"><ConfidenceBadge level="low" /><span>Sparse data or expert estimate — treat as indicative only.</span></li>
          </ul>
        </section>

        <section className="panel p-5">
          <p className="label-mono mb-3">Model limitations</p>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
            <li>No Earth site reproduces Martian pressure, lunar vacuum or reduced gravity.</li>
            <li>Dimension values are normalised summaries of complex, spatially variable environments.</li>
            <li>Mars and Moon profiles average over very diverse terrains; specific landing sites may differ.</li>
            <li>Rankings support site selection — they do not replace field reconnaissance.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
