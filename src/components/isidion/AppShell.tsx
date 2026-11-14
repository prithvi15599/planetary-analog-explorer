import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Code2, Globe2, Info, ListOrdered, Menu, Rocket, Scale } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CursorGlow, ScrambleText, ScrollProgress, Starfield } from "./motion";

const NAV = [
  { to: "/", label: "Explorer", icon: Globe2 },
  { to: "/compare", label: "Compare", icon: Scale },
  { to: "/rank", label: "Rank", icon: ListOrdered },
  { to: "/methodology", label: "Method", icon: BookOpen },
  { to: "/docs", label: "Docs", icon: Code2 },
  { to: "/about", label: "About", icon: Info },
  { to: "/mission", label: "Mission", icon: Rocket },
] as const;

const MOBILE_PRIMARY = ["/", "/compare", "/rank", "/mission"];

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="relative grid size-8 place-items-center">
        <span className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-mars/60" />
        <span className="planet-mars size-3 rounded-full transition-transform group-hover:scale-125" />
        <span className="absolute inset-0 animate-orbit">
          <span className="planet-moon absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full" />
        </span>
      </span>
      <span className="font-display text-lg font-semibold tracking-[0.25em] group-hover:animate-glitch">
        <ScrambleText text="ISIDION" />
      </span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  return (
    <div className="relative min-h-screen overflow-x-clip pb-20 md:pb-0">
      <Starfield />
      <CursorGlow />
      <ScrollProgress />

      <header className="no-print sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Logo />
          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="nav-link rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:flex">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-conf-high" />
                <span className="relative size-2 rounded-full bg-conf-high" />
              </span>
              Space Apps 2026
            </span>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground lg:hidden" aria-label="Open menu">
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent side="right" className="border-border bg-background/95 backdrop-blur-xl">
                <SheetTitle className="label-mono">Navigate</SheetTitle>
                <nav className="mt-6 flex flex-col gap-1">
                  {NAV.map((n, i) => (
                    <Link
                      key={n.to}
                      to={n.to}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: n.to === "/" }}
                      style={{ animationDelay: `${i * 60}ms` }}
                      className="flex animate-in items-center gap-3 rounded-md px-3 py-3 text-lg font-display fade-in slide-in-from-right-8 fill-mode-both duration-500 data-[status=active]:bg-secondary data-[status=active]:text-primary"
                    >
                      <n.icon className="size-5" />
                      {n.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main key={pathname} className="relative z-10 animate-in fade-in slide-in-from-bottom-3 duration-700">
        {children}
      </main>

      <footer className="no-print relative z-10 border-t border-border/70 bg-background/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
          <span className="font-mono uppercase tracking-widest">ISIDION · Planetary analog discovery</span>
          <span>NASA Space Apps Challenge 2026</span>
        </div>
      </footer>

      <nav className="no-print fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-background/90 backdrop-blur-xl lg:hidden">
        {NAV.filter((n) => MOBILE_PRIMARY.includes(n.to)).map((n) => (
          <Link
            key={n.to}
            to={n.to}
            activeOptions={{ exact: n.to === "/" }}
            className="group flex flex-col items-center gap-1 py-2.5 text-[11px] text-muted-foreground data-[status=active]:text-primary"
          >
            <n.icon className="size-5 transition-transform group-active:scale-90 group-data-[status=active]:-translate-y-0.5" />
            {n.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="bg-hero relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute -right-24 -top-24 size-80 animate-spin-slow rounded-full border border-dashed border-mars/25" />
      <div className="pointer-events-none absolute -right-8 -top-8 size-48 animate-orbit-rev rounded-full border border-moon/15">
        <span className="planet-moon absolute left-0 top-1/2 size-2.5 -translate-x-1/2 rounded-full" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <p className="label-mono flex items-center gap-2">
          <span className="h-px w-8 bg-gradient-to-r from-mars to-transparent" />
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-semibold md:text-6xl">
          <ScrambleText text={title} />
        </h1>
        {children && <div className="mt-4 max-w-2xl text-muted-foreground animate-in fade-in slide-in-from-bottom-2 fill-mode-both delay-300 duration-700">{children}</div>}
      </div>
    </div>
  );
}
