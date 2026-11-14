import { Link } from "@tanstack/react-router";
import { BookOpen, Globe2, ListOrdered, Scale } from "lucide-react";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", label: "Explorer", icon: Globe2 },
  { to: "/compare", label: "Compare", icon: Scale },
  { to: "/rank", label: "Rank", icon: ListOrdered },
  { to: "/methodology", label: "Method", icon: BookOpen },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <header className="no-print sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="relative grid size-7 place-items-center rounded-full border border-mars/60">
              <span className="size-2.5 rounded-full bg-mars" />
              <span className="absolute -right-0.5 top-0 size-1.5 rounded-full bg-moon" />
            </span>
            <span className="font-display text-lg font-semibold tracking-[0.2em]">ISIDION</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <nav className="no-print fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-background/95 backdrop-blur md:hidden">
        {NAV.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            activeOptions={{ exact: n.to === "/" }}
            className="flex flex-col items-center gap-1 py-2.5 text-[11px] text-muted-foreground data-[status=active]:text-primary"
          >
            <n.icon className="size-5" />
            {n.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="bg-hero border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
        <p className="label-mono">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold md:text-5xl">{title}</h1>
        {children && <div className="mt-3 max-w-2xl text-muted-foreground">{children}</div>}
      </div>
    </div>
  );
}
