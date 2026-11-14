import type { ReactNode } from "react";
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
 * Empty, labelled placeholder for an interactive feature.
 * Replace <FillSlot> with your implementation (or pass it as children).
 */
export function FillSlot({ slot, title, hint, inputs, className, children }: FillSlotProps) {
  if (children) return <>{children}</>;
  return (
    <div
      data-slot={slot}
      className={cn(
        "fill-slot bg-grid group relative flex min-h-48 flex-col items-center justify-center gap-3 overflow-hidden p-6 text-center",
        className,
      )}
    >
      {/* radar sweep */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,color-mix(in_oklab,var(--slot)_14%,transparent)_40deg,transparent_70deg)]" />
      {/* scanline */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-10 animate-scan bg-gradient-to-b from-transparent via-slot/10 to-transparent" />
      {/* corner brackets */}
      {["left-2 top-2 border-l border-t", "right-2 top-2 border-r border-t", "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"].map((c) => (
        <span key={c} aria-hidden className={cn("absolute size-4 border-slot/70 transition-all duration-300 group-hover:size-6", c)} />
      ))}
      <span className="label-mono relative flex items-center gap-2 text-slot">
        <span className="size-1.5 animate-blink rounded-full bg-slot" />
        Fill-in · {slot}
      </span>
      <h3 className="relative text-lg font-medium text-foreground">{title}</h3>
      {hint && <p className="relative max-w-md text-sm text-muted-foreground">{hint}</p>}
      {inputs && inputs.length > 0 && (
        <div className="relative flex flex-wrap justify-center gap-1.5">
          {inputs.map((i) => (
            <code key={i} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
              {i}
            </code>
          ))}
        </div>
      )}
    </div>
  );
}
