import { createFileRoute } from "@tanstack/react-router";
import { BODIES, SITES } from "@/lib/isidion/data";
import { FillSlot } from "@/components/isidion/FillSlot";
import { PageHeader } from "@/components/isidion/AppShell";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Moon vs Mars Comparison — ISIDION" },
      { name: "description", content: "Compare Earth analog sites against lunar and martian conditions." },
      { property: "og:title", content: "Moon vs Mars Comparison — ISIDION" },
      { property: "og:description", content: "Compare Earth analog sites against lunar and martian conditions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Compare,
});

const fmt = (n: number) => (Math.abs(n) < 0.001 && n !== 0 ? n.toExponential(0) : n.toLocaleString());

function Compare() {
  const rows = [
    ...SITES.map((s) => ({ name: s.name, p: s.physical, tone: "text-foreground" })),
    { name: "Mars", p: BODIES.mars.physical, tone: "text-mars" },
    { name: "Moon", p: BODIES.moon.physical, tone: "text-moon" },
  ];
  return (
    <>
      <PageHeader eyebrow="Comparison tools" title="Moon vs Mars">
        How each Earth site measures up against conditions on our two nearest exploration targets.
      </PageHeader>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 md:px-6">
        <FillSlot
          slot="compare-controls"
          title="Site & body selector"
          hint="Pick a site and toggle Mars / Moon to drive the visualizations below."
          inputs={["SITES", "BodyId"]}
          className="min-h-28"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <FillSlot
            slot="radar-overlay"
            title="Planetary comparison visualization"
            hint="Radar of the site's 12 analog dimensions overlaid on Mars and Moon profiles."
            inputs={["site.dims", "BODIES.mars.profile", "BODIES.moon.profile"]}
            className="min-h-[380px]"
          />
          <FillSlot
            slot="mars-moon-scatter"
            title="Mars score vs Moon score"
            hint="Plot every site by its Mars similarity (x) and Moon similarity (y)."
            inputs={["computeSimilarity()"]}
            className="min-h-[380px]"
          />
        </div>

        <FillSlot
          slot="dimension-bars"
          title="Per-dimension similarity"
          hint="Bars showing how close the selected site is to the target body on each dimension."
          inputs={["SimilarityResult.perDimension"]}
          className="min-h-56"
        />

        <section className="panel overflow-hidden">
          <div className="border-b border-border px-5 py-3">
            <p className="label-mono">Reference · physical parameters</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="label-mono text-left">
                <tr className="border-b border-border">
                  <th className="px-5 py-2.5 font-normal">Location</th>
                  <th className="px-3 py-2.5 font-normal">Pressure hPa</th>
                  <th className="px-3 py-2.5 font-normal">Mean °C</th>
                  <th className="px-3 py-2.5 font-normal">Daily swing °C</th>
                  <th className="px-3 py-2.5 font-normal">Precip mm/yr</th>
                  <th className="px-3 py-2.5 font-normal">Gravity g</th>
                  <th className="px-3 py-2.5 font-normal">Dose mSv/day</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[13px]">
                {rows.map((r) => (
                  <tr key={r.name} className="border-b border-border/60 transition-colors last:border-0 hover:bg-secondary/60">
                    <td className={`px-5 py-2.5 font-sans ${r.tone}`}>{r.name}</td>
                    <td className="px-3 py-2.5">{fmt(r.p.pressureHPa)}</td>
                    <td className="px-3 py-2.5">{r.p.meanTempC}</td>
                    <td className="px-3 py-2.5">{r.p.diurnalRangeC}</td>
                    <td className="px-3 py-2.5">{r.p.precipMm}</td>
                    <td className="px-3 py-2.5">{r.p.gravityG}</td>
                    <td className="px-3 py-2.5">{r.p.radiationMSvDay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
