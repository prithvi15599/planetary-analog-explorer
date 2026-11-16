import { createFileRoute } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import { DATA_SOURCES } from "@/lib/isidion/sources";
import { FillSlot } from "@/components/isidion/FillSlot";
import { PageHeader } from "@/components/isidion/AppShell";
import { Reveal, TiltCard } from "@/components/isidion/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Technical Documentation — ISIDION" },
      { name: "description", content: "Architecture, data model, data sources and setup instructions for ISIDION." },
      { property: "og:title", content: "Technical Documentation — ISIDION" },
      { property: "og:description", content: "Architecture, data model, data sources and setup instructions for ISIDION." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Docs,
});

const NODES = [
  { id: "ui", x: 60, y: 90, t: "React frontend", s: "TanStack Start · Tailwind", tone: "border-moon/60 text-moon" },
  { id: "engine", x: 360, y: 30, t: "Similarity engine", s: "site scoring + weights", tone: "border-slot/60 text-slot" },
  { id: "api", x: 360, y: 150, t: "Scientific backend", s: "Earth / Moon / Mars data", tone: "border-slot/60 text-slot" },
  { id: "db", x: 660, y: 150, t: "Analog database", s: "sites · bodies · scores", tone: "border-earth/60 text-earth" },
  { id: "data", x: 660, y: 30, t: "NASA / ESA / USGS", s: "datasets and references", tone: "border-mars/60 text-mars" },
];
const EDGES: [string, string][] = [["ui", "engine"], ["ui", "api"], ["api", "db"], ["api", "data"], ["engine", "data"]];

function Architecture() {
  const W = 180, H = 56;
  const pos = Object.fromEntries(NODES.map((n) => [n.id, n]));
  return (
    <div className="panel overflow-x-auto rounded-xl p-4">
      <svg viewBox="0 0 900 240" className="min-w-[720px]">
        {EDGES.map(([a, b]) => {
          const A = pos[a], B = pos[b];
          if (!A || !B) return null;
          const x1 = A.x + W, y1 = A.y + H / 2, x2 = B.x, y2 = B.y + H / 2;
          const mx = (x1 + x2) / 2;
          return (
            <g key={a + b}>
              <path d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`} fill="none" stroke="var(--border)" strokeWidth="1.5" />
              <path d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`} fill="none" stroke="var(--mars)" strokeWidth="1.5" strokeDasharray="4 16" className="animate-flow" />
            </g>
          );
        })}
        {NODES.map((n) => (
          <foreignObject key={n.id} x={n.x} y={n.y} width={W} height={H}>
            <div className={cn("flex h-full flex-col justify-center rounded-lg border bg-card px-3 transition-transform hover:scale-105", n.tone)}>
              <p className="text-sm font-medium text-foreground">{n.t}</p>
              <p className="font-mono text-[10px]">{n.s}</p>
            </div>
          </foreignObject>
        ))}
      </svg>
    </div>
  );
}

const MODEL = [
  { name: "Site", fields: ["id · code · name", "region · country", "lat · lon · elevation", "primaryAnalog", "scores: Record<DimKey, number>"] },
  { name: "Body", fields: ["id: mars | moon", "profile: dimension scores", "physical parameters", "scientific notes"] },
  { name: "Dimension", fields: ["key · label · short", "group: thermal | geology | dust | terrain | water | operations", "scale and interpretation"] },
  { name: "MissionProfile", fields: ["id · name · tagline", "weights: Record<DimKey, number>"] },
  { name: "PhysicalParams", fields: ["pressureHPa · meanTempC", "diurnalRangeC · precipMm", "gravityG · radiationMSvDay"] },
];

const FILES = [
  ["src/lib/isidion/data.ts", "Research dataset: sites, bodies, dimensions and scores"],
  ["src/lib/isidion/engine.ts", "Similarity and ranking equations"],
  ["src/lib/isidion/submission.ts", "Challenge brief and final submission checklist"],
  ["src/components/isidion/", "Shell, motion effects and data cards"],
  ["src/routes/", "One file per route for explorer, compare, rank and mission pages"],
];

function Docs() {
  return (
    <>
      <PageHeader eyebrow="Technical documentation" title="Under the hood">
        Architecture, data model and setup for the ISIDION codebase.
      </PageHeader>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 md:px-6">
        <section>
          <Reveal><p className="label-mono mb-4">Project architecture</p></Reveal>
          <Reveal delay={100}><Architecture /></Reveal>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <TiltCard max={4} className="panel h-full rounded-xl p-6">
              <p className="label-mono">React frontend</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><b className="text-foreground">Framework</b> — React 19 using file-based routing and TanStack Start.</li>
                <li><b className="text-foreground">Styling</b> — Tailwind CSS v4 with a Mars / Moon / Earth theme.</li>
                <li><b className="text-foreground">Maps</b> — Earth map and site cards for the five research locations.</li>
                <li><b className="text-foreground">Pages</b> — Explorer, Compare, Rank, Methodology, Docs, Mission and site reports.</li>
              </ul>
              <div className="mt-5 space-y-1.5">
                {FILES.map(([f, d]) => (
                  <div key={f} className="flex flex-col gap-0.5 rounded-md bg-muted/60 px-3 py-2 sm:flex-row sm:items-center sm:justify-between">
                    <code className="font-mono text-xs text-primary">{f}</code>
                    <span className="text-xs text-muted-foreground">{d}</span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </Reveal>
          <Reveal delay={120}>
            <FillSlot slot="python-backend-docs" title="Architecture summary" className="h-full min-h-72">
              <div className="space-y-4 p-2 text-left">
                <p className="label-mono text-earth">Project architecture</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><b className="text-foreground">Frontend</b> — React navigation for the homepage, maps, rankings and site reports.</li>
                  <li><b className="text-foreground">Research engine</b> — science-backed site scoring across terrain, geology, thermal, dust and water metrics.</li>
                  <li><b className="text-foreground">Database</b> — structured analog records for candidate Earth sites and planetary target conditions.</li>
                  <li><b className="text-foreground">Data sources</b> — NASA Earthdata, Worldview, PDS, LRO Diviner, CSA RADARSAT, ESA Copernicus and peer-reviewed literature.</li>
                </ul>
              </div>
            </FillSlot>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <p className="label-mono">Database structure</p>
            <h2 className="mt-2 text-3xl font-semibold">Data model</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODEL.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 90}>
                <TiltCard className="panel h-full rounded-lg">
                  <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                    <span className="size-2 animate-twinkle rounded-full bg-earth" />
                    <span className="font-mono text-sm font-medium">{m.name}</span>
                  </div>
                  <ul className="space-y-1 px-4 py-3 font-mono text-[12px] text-muted-foreground">
                    {m.fields.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <Reveal>
            <p className="label-mono">APIs & data sources</p>
          </Reveal>
          <div className="mt-4 flex flex-wrap gap-2">
            {DATA_SOURCES.map((d, i) => (
              <Reveal key={d.name} delay={i * 40}>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs transition-colors hover:border-primary">
                  <b className="font-mono">{d.agency}</b>
                  <span className="text-muted-foreground">{d.name}</span>
                </span>
              </Reveal>
            ))}
          </div>
        </section>

        <section>
          <Reveal>
            <p className="label-mono">Installation & setup</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-conf-low" />
                <span className="size-2.5 rounded-full bg-conf-medium" />
                <span className="size-2.5 rounded-full bg-conf-high" />
                <Terminal className="ml-2 size-3.5 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground">frontend</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-sm leading-7">
                <span className="text-muted-foreground"># install dependencies</span>{"\n"}
                <span className="text-primary">$</span> bun install{"\n"}
                <span className="text-muted-foreground"># start the dev server</span>{"\n"}
                <span className="text-primary">$</span> bun run dev{"\n"}
                <span className="text-muted-foreground"># run tests</span>{"\n"}
                <span className="text-primary">$</span> bun run test<span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-primary" />
              </pre>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <FillSlot slot="python-setup" title="Research workflow" className="mt-4 min-h-32">
              <div className="space-y-4 p-2 text-left">
                <p className="label-mono text-earth">Research and validation workflow</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Investigate five candidate analog locations: Canadian Arctic, Danakil Depression, Svalbard, Afar volcanic region and Salar de Uyuni.</li>
                  <li>Collect Earth, Moon and Mars datasets from NASA Earthdata, Worldview, PDS, LRO Diviner, ESA Copernicus and CSA RADARSAT.</li>
                  <li>Normalize comparable measurements and calculate weighted similarity scores for each analog site.</li>
                  <li>Document scientific assumptions, uncertainty and mission-specific recommendations before final submission.</li>
                </ul>
              </div>
            </FillSlot>
          </Reveal>
        </section>
      </div>
    </>
  );
}

