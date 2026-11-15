/**
 * ISIDION engine — FILL-IN STUBS for the owner's live scoring code.
 * The site currently shows the fingerprint scores published in the research
 * report (see data.ts). The report's equations:
 *   S_{i,t,k} = 100 × (1 − |x_{i,k} − x_{t,k}| / R_k)
 *   S_{i,t,d} = Σ_k w_k · S_{i,t,k}
 */
import type { BodyId, DimKey, Site } from "./data";

export interface SimilarityResult {
  siteId: string;
  body: BodyId;
  /** 0–100 overall similarity */
  score: number;
  /** per-dimension similarity, 0–100 */
  perDimension: Record<DimKey, number>;
}

/** TODO: live similarity of one site to a target, given user-adjustable weights. */
export function computeSimilarity(
  _site: Site,
  _body: BodyId,
  _weights?: Record<DimKey, number>,
): SimilarityResult | null {
  return null;
}
