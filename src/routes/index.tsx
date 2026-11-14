import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SITES } from "@/lib/isidion/data";
import { FillSlot } from "@/components/isidion/FillSlot";
import { BodyBadge, formatCoords } from "@/components/isidion/Badges";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ISIDION — Earth Analogs for the Moon & Mars" },
      { name: "description", content: "Interactive explorer of five researched planetary analog sites on Earth." },
      { property: "og:title", content: "ISIDION — Earth Analogs for the Moon & Mars" },
      { property: "og:description", content: "Interactive explorer of five researched planetary analog sites on Earth." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Explorer,
});

function Explorer() {
  return (
    <>
      <section className="bg-hero border-b border-border">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 md:px-6 md:pt-16">
          <p className="label-mono">Planetary analog intelligence</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl">
            Find Earth's closest stand-ins for the <span className="text-moon">Moon</span> and{" "}
            <span className="text-mars">Mars</span>.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:px-6 lg:grid-cols-[1fr_380px]">
        <FillSlot
          slot="earth-map"
          title="Interactive global Earth map"
          hint="Globe or map with the five analog sites as markers. Selecting a marker should highlight the site in the list."
          inputs={["SITES", "site.lat / site.lon", "onSelect(siteId)"]}
          className="aspect-square lg:aspect-auto lg:min-h-[560px]"
        />

        <div className="space-y-3">
          <p className="label-mono">Analog sites · {SITES.length}</p>
          {SITES.map((s) => (
            <Link
              key={s.id}
              to="/sites/$siteId"
              params={{ siteId: s.id }}
              className="panel group block p-4 transition-colors hover:border-primary/60"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] text-muted-foreground">{s.code}</p>
                  <h3 className="mt-0.5 font-medium">{s.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {s.country} · {formatCoords(s.lat, s.lon)}
                  </p>
                </div>
                <BodyBadge body={s.primaryAnalog} />
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                <span>Mars — · Moon —</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-14 md:grid-cols-3 md:px-6">
        {[
          { to: "/compare", t: "Moon & Mars comparison", d: "Side-by-side environmental gaps for every site." },
          { to: "/rank", t: "Similarity ranking", d: "Rank sites for a mission profile and target body." },
          { to: "/methodology", t: "Methodology & confidence", d: "Dimensions, data quality and model limits." },
        ].map((c) => (
          <Link key={c.to} to={c.to} className="panel p-5 transition-colors hover:border-primary/60">
            <h3 className="font-medium">{c.t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.d}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
