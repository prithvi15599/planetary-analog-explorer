import type { ReactNode } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SITES } from "@/lib/isidion/data";
import { cn } from "@/lib/utils";

interface FillSlotProps {
  /** Stable id so you can find the slot in code, e.g. "earth-map" */
  slot: string;
  title: string;
  hint?: string;
  /** Data/props this slot is expected to consume */
  inputs?: string[];
  className?: string;
  children?: ReactNode;
}

/**
 * A report-backed snapshot for feature areas whose interactive implementation is pending.
 * It keeps these sections useful without presenting static research as a live analysis.
 */
export function FillSlot({ slot, title, hint, inputs, className, children }: FillSlotProps) {
  if (children) return <>{children}</>;

  return (
    <section data-slot={slot} aria-label={`${title} research snapshot`} className={cn("panel relative flex flex-col overflow-hidden rounded-lg p-5", className)}>
      <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="label-mono flex items-center gap-2 text-earth"><span className="size-1.5 rounded-full bg-earth" /> Report-backed research · static reference</p>
          <h3 className="mt-2 text-lg font-medium text-foreground">{title}</h3>
          {hint && <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{hint}</p>}
        </div>
        <ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0 text-muted-foreground" />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {SITES.map((site) => (
          <article key={site.id} className="rounded-md border border-border/70 bg-background/40 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-mono text-[10px] text-muted-foreground">{site.code}</p>
                <h4 className="mt-0.5 truncate text-sm font-medium">{site.name}</h4>
              </div>
              <span className="shrink-0 rounded-full border border-mars/30 bg-mars/10 px-2 py-0.5 font-mono text-[10px] text-mars">{site.overall}/100</span>
            </div>
            <p className="mt-2 flex items-center gap-1 font-mono text-[10px] text-muted-foreground"><MapPin className="size-3" />{site.lat.toFixed(3)}°, {site.lon.toFixed(3)}° · {site.country}</p>
            <p className="mt-2 text-xs leading-relaxed text-foreground/90">{site.analogy}</p>
            <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">{site.values}</p>
          </article>
        ))}
      </div>

      <p className="mt-4 border-t border-border pt-3 text-[11px] leading-relaxed text-muted-foreground">
        Scores and descriptions reflect the supplied research report. They are reference values—not a live map, mission ranking, or newly calculated planetary comparison.
      </p>
      {inputs && inputs.length > 0 && <p className="sr-only">Related application inputs: {inputs.join(", ")}</p>}
    </section>
  );
}
