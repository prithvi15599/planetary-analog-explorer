import { useEffect, useState } from "react";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";
import { LINKS } from "@/lib/isidion/sources";

export function ApplicationLaunchDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button type="button" className="btn-ghost hidden px-3 py-1.5 text-xs sm:inline-flex" onClick={() => setOpen(true)}>
        Open application <ArrowUpRight className="size-3.5" />
      </button>
      <button type="button" className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground sm:hidden" aria-label="Open the ISIDION application details" onClick={() => setOpen(true)}>
        <ArrowUpRight className="size-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-background/75 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="application-dialog-title" aria-describedby="application-dialog-description" className="panel relative w-full max-w-md overflow-hidden rounded-xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button type="button" aria-label="Close dialog" onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <X className="size-4" />
            </button>
            <p className="label-mono text-earth">ISIDION · companion application</p>
            <h2 id="application-dialog-title" className="mt-3 pr-7 text-2xl font-semibold">Open the quantitative engine</h2>
            <p id="application-dialog-description" className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Visit the team's companion GitHub application for the planetary analog terrain-matching project. It opens in a new tab; this research explorer stays open here.
            </p>
            <a href={LINKS.app} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn-hero mt-6 w-full justify-center">
              Visit the application <ExternalLink className="size-4" />
            </a>
            <p className="mt-3 break-all font-mono text-[10px] text-muted-foreground">{LINKS.app}</p>
          </section>
        </div>
      )}
    </>
  );
}
