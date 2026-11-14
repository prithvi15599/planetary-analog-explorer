/**
 * ISIDION engine — FILL-IN STUBS.
 * These typed signatures are wired into the pages. Implement the bodies and the
 * UI slots that consume them will start showing real values.
 */
import type { BodyId, DimKey, MissionId, Site } from "./data";

export interface SimilarityResult {
  siteId: string;
  body: BodyId;
  /** 0–100 overall similarity */
  score: number;
  /** [low, high] uncertainty interval, 0–100 */
  interval: [number, number];
  /** 0–1 weighted data-confidence index */
  confidence: number;
  /** per-dimension similarity, 0–1 */
  perDimension: Record<DimKey, number>;
}

/** TODO: similarity of one site to Mars or the Moon, given dimension weights. */
export function computeSimilarity(
  _site: Site,
  _body: BodyId,
  _weights?: Record<DimKey, number>,
): SimilarityResult | null {
  return null;
}

/** TODO: rank all sites for a body + mission profile (or custom weights). */
export function rankSites(
  _body: BodyId,
  _mission: MissionId,
  _weights?: Record<DimKey, number>,
): SimilarityResult[] {
  return [];
}
