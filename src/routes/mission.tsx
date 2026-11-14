import { createFileRoute } from "@tanstack/react-router";
import { Check, FileText, Github, Link2, Presentation, Users, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { CHALLENGE, CHECKLIST, STATUS_LABEL, overallProgress, sectionProgress, type ChecklistSection } from "@/lib/isidion/submission";
import { PageHeader } from "@/components/isidion/AppShell";
import { Reveal, TiltCard } from "@/components/isidion/motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "Mission Dossier — ISIDION Space Apps 2026 Submission" },
      { name: "description", content: "Track every deliverable of the ISIDION NASA Space Apps Challenge 2026 submission." },
      { property: "og:title", content: "Mission Dossier — ISIDION Space Apps 2026 Submission" },
      { property: "og:description", content: "Track every deliverable of the ISIDION NASA Space Apps Challenge 2026 submission." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Mission,
});

const KEY = "isidion-checklist-v1";

const statusTone = {
  live: "text-conf-high border-conf-high/40",
  slot: "text-slot border-slot/40",
  external: "text-muted-foreground border-border",
} as const;

function Ring({ value, size = 140, stroke = 8, label }: { value: number; size?: number; stroke?: number; label?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`ring-${size}`} x1="0" x2="1">
            <stop offset="0%" stopColor="var(--mars)" />
            <stop offset="100%" stopColor="var(--moon)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`url(#ring-${size})`} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - value)} className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="font-display text-2xl font-semibold">{Math.round(value * 100)}%</p>
          {label && <p className="label-mono">{label}</p>}
        </div>
      </div>
    </div>
  );
}

function Burst() {
  return (
    <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2">
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <span
            key={i}
            className={cn("absolute size-1.5 animate-burst rounded-full", i % 2 ? "bg-mars" : "bg-moon")}
            style={{ "--bx": `${Math.cos(a) * 26}px`, "--by": `${Math.sin(a) * 26}px` } as React.CSSProperties}
          />
        );
      })}
    </span>
  );
}

function SectionCard({ section, checked, toggle, popped }: { section: ChecklistSection; checked: Record<string, boolean>; toggle: (id: string) => void; popped: string | null }) {
  const p = sectionProgress(section, checked);
  return (
    <TiltCard max={4} className="panel h-full rounded-xl">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-primary">{String(section.n).padStart(2, "0")}</p>
            <h3 className="mt-1 text-lg font-semibold">{section.title}</h3>
            <p className="text-sm text-muted-foreground">{section.blurb}</p>
          </div>
          <Ring value={p} size={64} stroke={5} />
        </div>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-gradient-to-r from-mars to-moon transition-[width] duration-700" style={{ width: `${p * 100}%` }} />
        </div>
        <ul className="mt-4 space-y-1">
          {section.items.map((it) => {
            const on = !!checked[it.id];
            return (
              <li key={it.id}>
                <button
                  onClick={() => toggle(it.id)}
                  className="group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors hover:bg-secondary"
                >
                  <span className={cn("relative grid size-5 shrink-0 place-items-center rounded border transition-all duration-300", on ? "scale-110 border-primary bg-primary text-primary-foreground" : "border-border group-hover:border-primary/60")}>
                    {on && <Check className="size-3.5 animate-in zoom-in-50 spin-in-90 duration-300" />}
                    {popped === it.id && on && <Burst />}
                  </span>
                  <span className={cn("flex-1 text-sm transition-colors", on && "text-muted-foreground line-through decoration-primary/60")}>{it.label}</span>
                  <span className={cn("hidden rounded-full border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider sm:inline", statusTone[it.status])}>
                    {STATUS_LABEL[it.status]}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </TiltCard>
  );
}

const KIT = [
  { icon: Link2, label: "Application link" },
  { icon: Video, label: "Demonstration video" },
  { icon: Presentation, label: "Presentation file" },
  { icon: FileText, label: "Scientific research report" },
  { icon: Github, label: "GitHub repository" },
  { icon: Users, label: "Team members & contributions" },
];

function Mission() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [popped, setPopped] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch { /* ignore corrupt storage */ }
  }, []);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
    setPopped(id);
    window.setTimeout(() => setPopped((p) => (p === id ? null : p)), 750);
  };

  const total = CHECKLIST.reduce((n, s) => n + s.items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <>
      <PageHeader eyebrow={CHALLENGE.event} title="Mission dossier">
        Every deliverable for the final ISIDION submission. Tick items off as your team completes them — progress is saved in this browser.
      </PageHeader>

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 md:px-6">
        <Reveal>
          <div className="border-spin flex flex-col items-center gap-8 rounded-2xl p-6 md:flex-row md:p-8">
            <Ring value={overallProgress(checked)} size={160} stroke={10} label="Complete" />
            <div className="flex-1">
              <p className="label-mono">Launch readiness</p>
              <p className="mt-2 font-display text-3xl font-semibold">{done} of {total} items done</p>
              <div className="mt-4 grid grid-cols-7 gap-1.5">
                {CHECKLIST.map((s) => (
                  <div key={s.id} title={s.title} className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-gradient-to-r from-mars to-moon transition-[width] duration-700" style={{ width: `${sectionProgress(s, checked) * 100}%` }} />
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span><b className="text-conf-high">In app</b> — already on this site</span>
                <span><b className="text-slot">Fill-in</b> — placeholder waiting for your code</span>
                <span><b className="text-foreground">Off-site</b> — delivered separately</span>
              </div>
            </div>
            <button onClick={() => { setChecked({}); localStorage.removeItem(KEY); }} className="btn-ghost text-xs">
              Reset
            </button>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          {CHECKLIST.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 120}>
              <SectionCard section={s} checked={checked} toggle={toggle} popped={popped} />
            </Reveal>
          ))}
        </div>

        <section>
          <Reveal>
            <p className="label-mono">Submission kit</p>
            <h2 className="mt-2 text-3xl font-semibold">Links & files</h2>
          </Reveal>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {KIT.map((k, i) => (
              <Reveal key={k.label} delay={i * 70}>
                <div className="fill-slot group flex items-center gap-4 p-5 transition-transform hover:-translate-y-1">
                  <span className="grid size-11 place-items-center rounded-lg border border-slot/40 text-slot transition-transform duration-500 group-hover:rotate-[360deg]">
                    <k.icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-medium">{k.label}</p>
                    <p className="font-mono text-[11px] text-slot">[ add link — not provided yet ]</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
