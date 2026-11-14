import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";
import { BODIES, DIMENSIONS, MISSIONS, getSite } from "@/lib/isidion/data";
import { SITE_IMAGES } from "@/lib/isidion/images";
import { BodyBadge, ConfidenceBadge, SeverityBadge, formatCoords } from "@/components/isidion/Badges";
import { FillSlot } from "@/components/isidion/FillSlot";

export const Route = createFileRoute("/sites/$siteId")({
  loader: ({ params }) => {
    const site = getSite(params.siteId);
    if (!site) throw notFound();
    return { site };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.site.name} — Analog Report · ISIDION` : "Analog Report · ISIDION";
    const desc = loaderData?.site.headline ?? "Scientific planetary analog site report.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Site not found</h1>
      <Link to="/" className="mt-4 inline-block text-primary">Back to explorer</Link>
    </div>
  ),
  component: SiteReport,
});

function SiteReport() {
  const { site } = Route.useLoaderData();
  const params = [
    { k: "Pressure", u: "hPa", f: "pressureHPa" },
    { k: "Mean temp", u: "°C", f: "meanTempC" },
    { k: "Daily swing", u: "°C", f: "diurnalRangeC" },
    { k: "Precipitation", u: "mm/yr", f: "precipMm" },
    { k: "Gravity", u: "g", f: "gravityG" },
    { k: "Radiation", u: "mSv/day", f: "radiationMSvDay" },
  ] as const;
  const fmt = (n: number) => (Math.abs(n) < 0.001 && n !== 0 ? n.toExponential(0) : n.toLocaleString());

  return (
    <article>
      <div className="relative h-64 overflow-hidden border-b border-border md:h-96">
        <img src={SITE_IMAGES[site.id]} alt={site.name} width={1536} height={864} className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-6 md:px-6">
          <Link to="/" className="no-print mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Explorer
          </Link>
          <p className="font-mono text-xs text-muted-foreground">{site.code} · {formatCoords(site.lat, site.lon)} · {site.elevationM.toLocaleString()} m</p>
          <h1 className="mt-1 text-3xl font-semibold md:text-5xl">{site.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <BodyBadge body={site.primaryAnalog} />
            <span className="text-sm text-muted-foreground">{site.region}, {site.country}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 md:px-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <section>
            <p className="text-xl leading-relaxed">{site.headline}</p>
            <p className="mt-3 text-muted-foreground">{site.summary}</p>
          </section>

          <section>
            <p className="label-mono mb-3">Analog dimensions</p>
            <div className="panel divide-y divide-border">
              {DIMENSIONS.map((d) => {
                const v = site.dims[d.key];
                return (
                  <div key={d.key} className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 px-4 py-3 sm:grid-cols-[160px_1fr_auto]">
                    <div className="text-sm font-medium">{d.label}</div>
                    <div className="order-3 col-span-2 text-xs text-muted-foreground sm:order-none sm:col-span-1">{v.note}</div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{v.v.toFixed(2)}</span>
                      <ConfidenceBadge level={v.c} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <p className="label-mono mb-3">Environment vs Mars & Moon</p>
            <div className="panel overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead className="label-mono text-left">
                  <tr className="border-b border-border">
                    <th className="px-4 py-2.5 font-normal">Parameter</th>
                    <th className="px-3 py-2.5 font-normal text-earth">Site</th>
                    <th className="px-3 py-2.5 font-normal text-mars">Mars</th>
                    <th className="px-3 py-2.5 font-normal text-moon">Moon</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-[13px]">
                  {params.map((p) => (
                    <tr key={p.f} className="border-b border-border/60 last:border-0">
                      <td className="px-4 py-2.5 font-sans">{p.k} <span className="text-muted-foreground">({p.u})</span></td>
                      <td className="px-3 py-2.5">{fmt(site.physical[p.f])}</td>
                      <td className="px-3 py-2.5">{fmt(BODIES.mars.physical[p.f])}</td>
                      <td className="px-3 py-2.5">{fmt(BODIES.moon.physical[p.f])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              Site parameter confidence <ConfidenceBadge level={site.physicalConfidence} />
            </div>
          </section>

          <section>
            <p className="label-mono mb-3">Mission recommendations</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {MISSIONS.filter((m) => m.id !== "balanced").map((m) => (
                <div key={m.id} className="panel p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{m.name}</p>
                    <span className="font-mono text-xs text-muted-foreground">fit —</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{site.missions[m.id as keyof typeof site.missions]}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="label-mono mb-3">Research history</p>
            <ol className="space-y-3 border-l border-border pl-5">
              {site.history.map((h) => (
                <li key={h.year + h.event} className="relative">
                  <span className="absolute -left-[25px] top-1.5 size-2 rounded-full bg-primary" />
                  <p className="font-mono text-xs text-primary">{h.year}</p>
                  <p className="text-sm">{h.event}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-6">
          <FillSlot
            slot="analog-fingerprint"
            title="Analog Fingerprint"
            hint="Unique radial glyph of the site's 12 dimension values."
            inputs={["site.dims", "DIMENSIONS"]}
            className="aspect-square"
          />
          <FillSlot
            slot="similarity-scores"
            title="Mars & Moon similarity"
            hint="Scores with uncertainty interval and confidence index."
            inputs={["computeSimilarity(site, 'mars')", "computeSimilarity(site, 'moon')"]}
          />

          <section className="panel p-4">
            <p className="label-mono mb-3">Limitations</p>
            <ul className="space-y-3">
              {site.limitations.map((l) => (
                <li key={l.text} className="space-y-1">
                  <SeverityBadge severity={l.severity} />
                  <p className="text-sm text-muted-foreground">{l.text}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel p-4">
            <p className="label-mono mb-3">References</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {site.references.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </section>

          <button
            onClick={() => window.print()}
            className="no-print inline-flex w-full items-center justify-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:bg-secondary"
          >
            <Printer className="size-4" /> Print report
          </button>
        </aside>
      </div>
    </article>
  );
}
