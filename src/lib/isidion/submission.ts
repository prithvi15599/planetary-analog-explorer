/** NASA Space Apps Challenge 2026 — ISIDION final submission checklist. */

export type ItemStatus = "live" | "slot" | "external";

export interface ChecklistItem {
  id: string;
  label: string;
  /** live = already in this app, slot = fill-in placeholder here, external = delivered outside the app */
  status: ItemStatus;
}

export interface ChecklistSection {
  id: string;
  n: number;
  title: string;
  blurb: string;
  items: ChecklistItem[];
}

const mk = (sec: string, rows: [string, ItemStatus][]): ChecklistItem[] =>
  rows.map(([label, status], i) => ({ id: `${sec}-${i + 1}`, label, status }));

export const CHALLENGE = {
  event: "NASA Space Apps Challenge 2026",
  title: "ISIDION — Final Project Submission",
  objective:
    "ISIDION should be a complete, working planetary analog discovery application that combines original scientific research, real NASA datasets, intelligent location ranking, and practical recommendations for future Moon and Mars exploration.",
};

export const CHECKLIST: ChecklistSection[] = [
  {
    id: "product", n: 1, title: "Main Product — ISIDION Application", blurb: "The working app you're looking at.",
    items: mk("product", [
      ["Fully functional ISIDION application", "slot"],
      ["Interactive global Earth map", "slot"],
      ["Five researched planetary analog locations", "live"],
      ["Moon and Mars comparison tools", "slot"],
      ["AI-powered similarity-ranking algorithm", "slot"],
      ["Analog Fingerprints for each location", "slot"],
      ["Planetary comparison visualizations", "slot"],
      ["Mission-specific recommendations", "live"],
      ["Scientific location reports", "live"],
      ["Data confidence and limitations indicators", "live"],
      ["Desktop and mobile compatibility", "live"],
    ]),
  },
  {
    id: "research", n: 2, title: "Scientific Research", blurb: "The evidence behind every score.",
    items: mk("research", [
      ["Scientific research report (PDF)", "external"],
      ["Five candidate locations thoroughly researched", "live"],
      ["Earth satellite and geological datasets", "external"],
      ["Moon and Mars datasets", "external"],
      ["Verified coordinates and measurements", "live"],
      ["NASA, ESA and USGS sources documented", "live"],
      ["Scientific comparisons and findings", "live"],
      ["Methodology, calculations and limitations explained", "live"],
    ]),
  },
  {
    id: "presentation", n: 3, title: "Presentation", blurb: "10–15 slides that tell the story.",
    items: mk("presentation", [
      ["PowerPoint / Google Slides presentation (10–15 slides)", "external"],
      ["Problem statement and proposed solution", "live"],
      ["ISIDION overview and features", "live"],
      ["Scientific methodology", "live"],
      ["Similarity algorithm explanation", "slot"],
      ["Five location discoveries", "live"],
      ["Scientific impact and future applications", "live"],
    ]),
  },
  {
    id: "video", n: 4, title: "Demonstration Video", blurb: "A 2–3 minute walkthrough.",
    items: mk("video", [
      ["2–3 minute demonstration video", "external"],
      ["Application walkthrough", "external"],
      ["Interactive map demonstration", "external"],
      ["Similarity-ranking demonstration", "external"],
      ["Analog Fingerprint demonstration", "external"],
      ["Showcase of the strongest scientific discovery", "external"],
    ]),
  },
  {
    id: "docs", n: 5, title: "Technical Documentation", blurb: "How it's built and how to run it.",
    items: mk("docs", [
      ["Technical documentation (PDF or README)", "live"],
      ["React frontend documentation", "live"],
      ["Python backend documentation", "slot"],
      ["Algorithm and scoring methodology", "slot"],
      ["Database structure", "live"],
      ["APIs and data sources", "live"],
      ["Installation and setup instructions", "live"],
      ["Project architecture", "live"],
    ]),
  },
  {
    id: "github", n: 6, title: "GitHub Repository", blurb: "Everything, open and reproducible.",
    items: mk("github", [
      ["Complete source code", "external"],
      ["Frontend and backend files", "external"],
      ["Database structure", "external"],
      ["Dataset references", "external"],
      ["README and project overview", "external"],
      ["Installation instructions", "external"],
      ["Screenshots and application preview", "external"],
    ]),
  },
  {
    id: "final", n: 7, title: "Final NASA Submission", blurb: "The last mile.",
    items: mk("final", [
      ["Project title and description", "live"],
      ["Team member names and contributions", "slot"],
      ["Application link", "external"],
      ["Demonstration video link", "external"],
      ["Presentation file", "external"],
      ["Scientific research report", "external"],
      ["GitHub repository link", "external"],
      ["Project screenshots", "external"],
      ["Final submission reviewed and completed", "external"],
    ]),
  },
];

export const STATUS_LABEL: Record<ItemStatus, string> = {
  live: "In app",
  slot: "Fill-in",
  external: "Off-site",
};

/** Fraction (0–1) of checked items in a section. */
export function sectionProgress(section: ChecklistSection, checked: Record<string, boolean>) {
  if (section.items.length === 0) return 0;
  return section.items.filter((i) => checked[i.id]).length / section.items.length;
}

export function overallProgress(checked: Record<string, boolean>) {
  const all = CHECKLIST.flatMap((s) => s.items);
  return all.filter((i) => checked[i.id]).length / all.length;
}
