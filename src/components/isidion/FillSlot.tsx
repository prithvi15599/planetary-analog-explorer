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
        "fill-slot bg-grid relative flex min-h-48 flex-col items-center justify-center gap-3 p-6 text-center",
        className,
      )}
    >
      <span className="label-mono text-slot">Fill-in · {slot}</span>
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      {hint && <p className="max-w-md text-sm text-muted-foreground">{hint}</p>}
      {inputs && inputs.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5">
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
