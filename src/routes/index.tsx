import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BODIES, DIMENSIONS, SITES } from "@/lib/isidion/data";
import { SITE_IMAGES } from "@/lib/isidion/images";
import { CHALLENGE, CHECKLIST, STATUS_LABEL } from "@/lib/isidion/submission";
import { FillSlot } from "@/components/isidion/FillSlot";
import { BodyBadge, formatCoords } from "@/components/isidion/Badges";
import { CountUp, Marquee, OrbitSystem, Reveal, ScrambleText, TiltCard } from "@/components/isidion/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ISIDION — Earth Analogs for the Moon & Mars" },
      { name: "description", content: "Planetary analog discovery: five researched Earth sites compared against the Moon and Mars." },
      { property: "og:title", content: "ISIDION — Earth Analogs for the Moon & Mars" },
      { property: "og:description", content: "Planetary analog discovery: five researched Earth sites compared against the Moon and Mars." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Explorer,
});

const TICKER = [
  ...SITES.map((s) => `${s.code} · ${formatCoords(s.lat, s.lon)}`),
  `Mars · ${BODIES.mars.physical.pressureHPa} hPa · ${BODIES.mars.physical.meanTempC} °C`,
  `Moon · ${BODIES.moon.physical.gravityG} g · ${BODIES.moon.physical.diurnalRangeC} °C swing`,
  `${DIMENSIONS.length} analog dimensions`,
];

const statusTone = {
  live: "text-conf-high border-conf-high/40 bg-conf-high/10",
  slot: "text-slot border-slot/40 bg-slot/10",
  external: "text-muted-foreground border-border",
} as const;

function Explorer() {
  const refCount = SITES.reduce((n, s) => n + s.references.length, 0);
  return (
    <>
      {/* HERO */}
      <section className="bg-hero relative overflow-hidden border-b border-border">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-14 md:px-6 lg:grid-cols-[1.15fr_1fr] lg:pt-20">
          <div>
            <p className="label-mono flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-700">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-mars" />
                <span className="relative size-2 rounded-full bg-mars" />
              </span>
              {CHALLENGE.event}
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.98] md:text-7xl">
              <span className="block animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-700">
                <ScrambleText text="Earth's closest" />
              </span>
              <span className="block animate-in fade-in slide-in-from-bottom-6 fill-mode-both delay-150 duration-700">
                <ScrambleText text="stand-ins for" />
              </span>
              <span className="text-gradient-cosmic block animate-in fade-in slide-in-from-bottom-6 fill-mode-both delay-300 duration-700">
                the Moon & Mars.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground animate-in fade-in fill-mode-both delay-500 duration-1000">
              ISIDION scores real places on Earth against lunar and martian conditions, so mission teams can pick
              the right field site before anything leaves the launch pad.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-700 duration-700">
              <Link to="/rank" className="btn-hero">
                Rank analog sites <ArrowRight className="size-4" />
              </Link>
              <Link to="/mission" className="btn-ghost">
                Mission dossier
              </Link>
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-4 gap-4 border-t border-border pt-6">
              {[
                { v: SITES.length, l: "Sites" },
                { v: DIMENSIONS.length, l: "Dimensions" },
                { v: 2, l: "Worlds" },
                { v: refCount, l: "Citations" },
              ].map((s) => (
                <div key={s.l}>
                  <dd className="font-display text-3xl font-semibold"><CountUp value={s.v} /></dd>
                  <dt className="label-mono mt-1">{s.l}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative flex justify-center animate-in fade-in zoom-in-75 fill-mode-both delay-200 duration-1000">
            <OrbitSystem />
            <span className="absolute left-[6%] top-[12%] font-mono text-[10px] uppercase tracking-widest text-mars animate-twinkle">Mars · 0.38 g</span>
            <span className="absolute bottom-[14%] right-[4%] font-mono text-[10px] uppercase tracking-widest text-moon animate-twinkle [animation-delay:1.2s]">Moon · 0.165 g</span>
          </div>
        </div>
      </section>

      <Marquee items={TICKER} />

      {/* MAP + SITES */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <Reveal className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="label-mono">01 · Explorer</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Five analogs, one planet</h2>
          </div>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <Reveal>
            <FillSlot
              slot="earth-map"
              title="Interactive global Earth map"
              hint="Globe or map with the five analog sites as markers. Selecting a marker should highlight the site in the list."
              inputs={["SITES", "site.lat / site.lon", "onSelect(siteId)"]}
              className="aspect-square lg:aspect-auto lg:h-full lg:min-h-[560px]"
            />
          </Reveal>
          <div className="space-y-3">
            <p className="label-mono">Analog sites · {SITES.length}</p>
            {SITES.map((s, i) => (
              <Reveal key={s.id} delay={i * 90}>
                <TiltCard className="panel rounded-lg">
                  <Link to="/sites/$siteId" params={{ siteId: s.id }} className="group block p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] text-muted-foreground">{s.code}</p>
                        <h3 className="mt-0.5 font-medium transition-colors group-hover:text-primary">{s.name}</h3>
                        <p className="text-xs text-muted-foreground">{s.country} · {formatCoords(s.lat, s.lon)}</p>
                      </div>
                      <BodyBadge body={s.primaryAnalog} />
                    </div>
                    <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                      <span>Mars — · Moon —</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DISCOVERIES */}
      <section className="border-y border-border bg-card/30 py-16 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Reveal>
            <p className="label-mono">02 · Discoveries</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Field reports</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SITES.map((s, i) => (
              <Reveal key={s.id} delay={i * 110} className={cn(i === 0 && "sm:col-span-2 lg:col-span-1")}>
                <Link to="/sites/$siteId" params={{ siteId: s.id }} className="group relative block aspect-[3/4] overflow-hidden rounded-lg border border-border">
                  <img src={SITE_IMAGES[s.id]} alt={s.name} loading="lazy" width={1536} height={864} className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-125 group-hover:rotate-2" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-full translate-y-full bg-gradient-to-t from-mars/30 to-transparent transition-transform duration-700 group-hover:translate-y-0" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-mono text-[10px] text-muted-foreground">{s.code}</p>
                    <h3 className="font-display text-lg font-semibold leading-tight">{s.name}</h3>
                    <p className="mt-1 line-clamp-2 max-h-0 text-xs text-muted-foreground opacity-0 transition-all duration-500 group-hover:max-h-12 group-hover:opacity-100">{s.headline}</p>
                  </div>
                  <ArrowUpRight className="absolute right-3 top-3 size-5 -translate-x-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <Reveal>
          <p className="label-mono">03 · Capabilities</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">What ISIDION does</h2>
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(CHECKLIST[0]?.items ?? []).slice(1).map((f, i) => (
            <Reveal key={f.id} delay={(i % 4) * 80}>
              <TiltCard className="panel h-full rounded-lg p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider", statusTone[f.status])}>
                    {STATUS_LABEL[f.status]}
                  </span>
                </div>
                <p className="mt-6 font-medium">{f.label}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OBJECTIVE */}
      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        <Reveal>
          <div className="border-spin relative overflow-hidden rounded-2xl p-8 md:p-14">
            <div className="pointer-events-none absolute -right-16 -top-16 size-64 animate-float rounded-full planet-mars opacity-30 blur-2xl" />
            <p className="label-mono">Final objective</p>
            <blockquote className="mt-4 max-w-4xl font-display text-2xl leading-snug md:text-4xl">“{CHALLENGE.objective}”</blockquote>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/mission" className="btn-hero">Track the submission <ArrowRight className="size-4" /></Link>
              <Link to="/about" className="btn-ghost">About the project</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
