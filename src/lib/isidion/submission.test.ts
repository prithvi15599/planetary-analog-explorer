import { describe, expect, it } from "vitest";
import { CHECKLIST, overallProgress, sectionProgress } from "./submission";

describe("submission checklist", () => {
  it("has the seven sections from the NASA submission checklist", () => {
    expect(CHECKLIST.map((s) => s.n)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("lists 11 main-product items", () => {
    expect(CHECKLIST[0]!.items).toHaveLength(11);
  });

  it("computes section progress from checked items", () => {
    const s = CHECKLIST.find((x) => x.id === "video")!; // 6 items
    expect(sectionProgress(s, Object.fromEntries(s.items.slice(0, 3).map((i) => [i.id, true])))).toBe(0.5);
  });

  it("overall progress is 1 when everything is checked", () => {
    const all = Object.fromEntries(CHECKLIST.flatMap((s) => s.items.map((i) => [i.id, true])));
    expect(overallProgress(all)).toBe(1);
  });
});
