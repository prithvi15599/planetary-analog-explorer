import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Crosshair, Database, Lightbulb, Rocket, Target, Users } from "lucide-react";
import { CHALLENGE } from "@/lib/isidion/submission";
import { DATA_SOURCES } from "@/lib/isidion/sources";
import { PageHeader } from "@/components/isidion/AppShell";
import { Reveal, TiltCard } from "@/components/isidion/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ISIDION — Problem, Solution & Impact" },
      { name: "description", content: "Why ISIDION exists, how it works, and the datasets behind it." },
      { property: "og:title", content: "About ISIDION — Problem, Solution & Impact" },
      { property: "og:description", content: "Why ISIDION exists, how it works, and the datasets behind it." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const STEPS = [
  { icon: Database, t: "Gather", d: "Earth, Moon and Mars measurements from NASA, ESA and USGS datasets plus field literature." },
  { icon: Crosshair, t: "Fingerprint", d: "Each site is placed on twelve normalised analog dimensions shared with both worlds." },
  { icon: Target, t: "Rank", d: "A similarity algorithm weights those dimensions by mission type and ranks every site." },
  { icon: Rocket, t: "Recommend", d: "Reports pair each score with mission advice, data confidence and known limitations." },
];

const agencyTone = { NASA: "text-mars border-mars/40", ESA: "text-moon border-moon/40", USGS: "text-earth border-earth/40" } as const;

function About() {
  return (
    <>
      <PageHeader eyebrow="About the project" title="Test on Earth. Fly with confidence.">
        {CHALLENGE.event} · planetary analog discovery
      </PageHeader>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 md:px-6">
        <section className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <TiltCard max={5} className="panel h-full rounded-xl p-7">
              <Lightbulb className="size-6 text-mars" />
              <p className="label-mono mt-5">Problem</p>
              <h2 className="mt-2 text-2xl font-semibold">Picking a field site is guesswork</h2>
              <p className="mt-3 text-muted-foreground">
                Rovers, drills and crews are rehearsed at analog sites on Earth before going to the Moon or Mars. But
                deciding which site best matches a mission's needs means digging through scattered papers, and the
                choice is rarely compared side by side.
              </p>
            </TiltCard>
          </Reveal>
          <Reveal delay={120}>
            <TiltCard max={5} className="panel h-full rounded-xl p-7">
              <Rocket className="size-6 text-moon" />
              <p className="label-mono mt-5">Solution</p>
              <h2 className="mt-2 text-2xl font-semibold">A ranked, explainable analog finder</h2>
              <p className="mt-3 text-muted-foreground">
                ISIDION puts researched analog sites on one map, scores each against lunar and martian conditions,
                and explains every score — including how confident the data is and where the analog falls short.
              </p>
            </TiltCard>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <p className="label-mono">How it works</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Four steps from data to decision</h2>
          </Reveal>
          <div className="relative mt-10 grid gap-6 md:grid-cols-4">
            <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px md:block">
              <svg className="h-px w-full overflow-visible" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="var(--mars)" strokeWidth="1.5" strokeDasharray="6 14" className="animate-flow" />
              </svg>
            </div>
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 150} className="relative">
                <div className="grid size-14 place-items-center rounded-full border border-mars/50 bg-background shadow-[0_0_30px_-5px_var(--mars)] transition-transform duration-500 hover:rotate-[360deg] hover:scale-110">
                  <s.icon className="size-6 text-mars" />
                </div>
                <p className="mt-4 font-mono text-xs text-muted-foreground">0{i + 1}</p>
                <h3 className="text-xl font-semibold">{s.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <p className="label-mono">Scientific impact</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Why it matters</h2>
            <ul className="mt-6 space-y-4 text-muted-foreground">
              {[
                "Cheaper, faster rehearsal of Artemis-era lunar and future Mars surface operations.",
                "A common, transparent scale for comparing analog sites across disciplines.",
                "Honest limitations that stop teams over-trusting any single analog.",
                "Extensible to new sites, new worlds (Europa, Titan) and new mission profiles.",
              ].map((t, i) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 animate-twinkle rounded-full bg-mars" style={{ animationDelay: `${i * 0.4}s` }} />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150}>
            <div className="panel overflow-hidden rounded-xl">
              <div className="flex items-center justify-between border-b border-border px-5 py-3">
                <p className="label-mono">Reference datasets</p>
                <span className="font-mono text-[10px] text-muted-foreground">{DATA_SOURCES.length} sources</span>
              </div>
              <ul className="divide-y divide-border">
                {DATA_SOURCES.map((d) => (
                  <li key={d.name} className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-secondary/60">
                    <span className={cn("w-14 shrink-0 rounded border px-1.5 py-0.5 text-center font-mono text-[10px]", agencyTone[d.agency])}>{d.agency}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{d.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{d.use}</p>
                    </div>
                    <span className="font-mono text-[10px] uppercase text-muted-foreground">{d.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        <section>
          <Reveal>
            <p className="label-mono">Team</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">The crew</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n, i) => (
              <Reveal key={n} delay={i * 90}>
                <div className="fill-slot flex flex-col items-center gap-3 p-6 text-center">
                  <span className="grid size-16 place-items-center rounded-full border border-dashed border-slot/60 text-slot">
                    <Users className="size-6" />
                  </span>
                  <p className="font-medium">[ Team member {n} ]</p>
                  <p className="font-mono text-[11px] text-slot">name · role · contribution</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border-spin p-8 md:flex-row md:items-center">
            <p className="max-w-2xl font-display text-2xl">{CHALLENGE.objective}</p>
            <Link to="/mission" className="btn-hero shrink-0">Mission dossier <ArrowRight className="size-4" /></Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
