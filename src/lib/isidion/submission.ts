/** NASA Space Apps Challenge 2026 — ISIDION final submission checklist (from the team report). */

export type ItemStatus = "live" | "repo" | "external";

export interface ChecklistItem {
  id: string;
  label: string;
  /** live = shown on this site, repo = in the GitHub application, external = delivered separately */
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
  name: "Identify Earth Locations that Analog the Permanent Moon Base Locations and Mars",
  brief:
    "Places on Earth that have analogous characteristics to the Moon or Mars allow mission teams to test equipment and methods before they fly; however, such terrestrial analog sites are not entirely well characterized. The challenge: use open Earth, Moon, and Mars data from NASA and other space agencies to identify and characterize new terrestrial analogs for future bases or landing sites, then present the findings as a map, visualization, or other tool.",
  differentiator:
    "Moving beyond superficial visual comparisons to a multi-factor, physics-driven geospatial matching engine using official NASA/USGS elevation and illumination datasets, surfaced via an interactive mission-planning dashboard.",
  objective:
    "ISIDION should be a complete, working planetary analog discovery application that combines original scientific research, real NASA datasets, intelligent location ranking, and practical recommendations for future Moon and Mars exploration.",
  date: "November 14, 2026",
};

export const TEAM = ["Prady", "Henry", "Shreyas", "Prithvi"];

export const CHECKLIST: ChecklistSection[] = [
  {
    id: "product", n: 1, title: "Main Product — ISIDION Application", blurb: "This site plus the terrain-matching engine.",
    items: mk("product", [
      ["Fully functional ISIDION application", "repo"],
      ["Interactive global Earth map", "live"],
      ["Five researched planetary analog locations", "live"],
      ["Moon and Mars comparison tools", "live"],
      ["AI-powered similarity-ranking algorithm", "repo"],
      ["Analog Fingerprints for each location", "live"],
      ["Planetary comparison visualizations", "live"],
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
      ["Earth satellite and geological datasets", "live"],
      ["Moon and Mars datasets", "live"],
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
      ["Similarity algorithm explanation", "live"],
      ["Five location discoveries", "live"],
      ["Scientific impact and future applications", "live"],
    ]),
  },
  {
    id: "demo", n: 4, title: "Official NASA Project Demo", blurb: "30-second video or a 7-slide deck.",
    items: mk("demo", [
      ["Project demo video (30 s max) OR slide deck (7 slides max)", "external"],
      ["Application walkthrough", "external"],
      ["Interactive map demonstration", "external"],
      ["Similarity-ranking demonstration", "external"],
      ["Analog Fingerprint demonstration", "external"],
      ["Showcase of the strongest scientific discovery", "external"],
      ["Publicly accessible external hosting link", "external"],
      ["English subtitles if the video uses another spoken language", "external"],
    ]),
  },
  {
    id: "docs", n: 5, title: "Technical Documentation", blurb: "How it's built and how to run it.",
    items: mk("docs", [
      ["Technical documentation (PDF or README)", "repo"],
      ["React frontend documentation", "live"],
      ["Python backend documentation", "live"],
      ["Algorithm and scoring methodology", "live"],
      ["Database structure", "live"],
      ["APIs and data sources", "live"],
      ["Installation and setup instructions", "live"],
      ["Project architecture", "live"],
    ]),
  },
  {
    id: "github", n: 6, title: "GitHub Repository", blurb: "Everything, open and reproducible.",
    items: mk("github", [
      ["Complete source code", "repo"],
      ["Frontend and backend files", "repo"],
      ["Database structure", "repo"],
      ["Dataset references", "repo"],
      ["README and project overview", "repo"],
      ["Installation instructions", "repo"],
      ["Screenshots and application preview", "repo"],
    ]),
  },
  {
    id: "final", n: 7, title: "Final NASA Submission", blurb: "The last mile.",
    items: mk("final", [
      ["Project title and description", "live"],
      ["Team member names and contributions", "live"],
      ["Application link", "repo"],
      ["Demonstration video link", "external"],
      ["Presentation file", "external"],
      ["Scientific research report", "external"],
      ["GitHub repository link", "repo"],
      ["Project screenshots", "external"],
      ["Final submission reviewed and completed", "external"],
    ]),
  },
];

/** Items already marked complete in the team's checklist. */
export const PRECHECKED: Record<string, boolean> = { "presentation-2": true, "presentation-6": true };

export const STATUS_LABEL: Record<ItemStatus, string> = {
  live: "On site",
  repo: "GitHub",
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
