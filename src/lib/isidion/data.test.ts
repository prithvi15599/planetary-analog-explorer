import { describe, expect, it } from "vitest";
import { SITES, getSite, topSite } from "./data";

describe("research report scores", () => {
  it("has the report's five sites", () => {
    expect(SITES.map((s) => s.id)).toEqual(["dalangtan", "qaidam-yardang", "qaidam-dune", "atacama", "dry-valleys"]);
  });

  it("uses the report's overall Mars analog scores", () => {
    expect(Object.fromEntries(SITES.map((s) => [s.id, s.overall]))).toEqual({
      dalangtan: 66, "qaidam-yardang": 68, "qaidam-dune": 68, atacama: 67, "dry-valleys": 59,
    });
  });

  it("no site scores perfectly — highest overall is 68", () => {
    expect(topSite().overall).toBe(68);
  });

  it("Dalangtan has the strongest geology score (90)", () => {
    expect(getSite("dalangtan")!.scores.geology).toBe(90);
  });

  it("Dry Valleys lead water and ice (90)", () => {
    expect(getSite("dry-valleys")!.scores.water).toBe(90);
  });

  it("Dalangtan coordinates match the report", () => {
    const s = getSite("dalangtan")!;
    expect([s.lat, s.lon]).toEqual([38.596, 90.985]);
  });
});
