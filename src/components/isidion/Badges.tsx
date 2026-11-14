import type { BodyId, Confidence, Limitation } from "@/lib/isidion/data";
import { cn } from "@/lib/utils";

const confClass: Record<Confidence, string> = {
  high: "text-conf-high border-conf-high/40 bg-conf-high/10",
  medium: "text-conf-medium border-conf-medium/40 bg-conf-medium/10",
  low: "text-conf-low border-conf-low/40 bg-conf-low/10",
};

export function ConfidenceBadge({ level, className }: { level: Confidence; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        confClass[level],
        className,
      )}
      title={`Data confidence: ${level}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {level}
    </span>
  );
}

const sevClass: Record<Limitation["severity"], string> = {
  major: "text-conf-low border-conf-low/40",
  moderate: "text-conf-medium border-conf-medium/40",
  minor: "text-muted-foreground border-border",
};

export function SeverityBadge({ severity }: { severity: Limitation["severity"] }) {
  return (
    <span className={cn("rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider", sevClass[severity])}>
      {severity}
    </span>
  );
}

export function BodyBadge({ body }: { body: BodyId | "both" }) {
  const label = body === "both" ? "Moon + Mars" : body === "mars" ? "Mars analog" : "Moon analog";
  const cls =
    body === "mars"
      ? "text-mars border-mars/40 bg-mars/10"
      : body === "moon"
        ? "text-moon border-moon/40 bg-moon/10"
        : "text-earth border-earth/40 bg-earth/10";
  return (
    <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider", cls)}>
      {label}
    </span>
  );
}

export function formatCoords(lat: number, lon: number) {
  const la = `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? "N" : "S"}`;
  const lo = `${Math.abs(lon).toFixed(2)}°${lon >= 0 ? "E" : "W"}`;
  return `${la} ${lo}`;
}
