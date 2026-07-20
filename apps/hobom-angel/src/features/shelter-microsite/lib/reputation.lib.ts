import type { ShelterReputation, StarRating } from "@/entities/review";

export interface DistributionBar {
  star: StarRating;
  count: number;
  /** Share of all reviews, 0–100 (rounded). */
  pct: number;
}

const STARS_DESC: StarRating[] = [5, 4, 3, 2, 1];

/** The star histogram as rows (5★ first) with each star's share of the total. */
export const distributionBars = (reputation: ShelterReputation): DistributionBar[] =>
  STARS_DESC.map((star) => {
    const count = reputation.distribution[star];

    return {
      star,
      count,
      pct: reputation.reviewCount > 0 ? Math.round((count / reputation.reviewCount) * 100) : 0,
    };
  });

/** Average rating to one decimal, e.g. 4 → "4.0". */
export const formatAverage = (average: number): string => average.toFixed(1);

/** Round a rating to whole filled stars (0–5) for the star row. */
export const filledStars = (rating: number): number => Math.max(0, Math.min(5, Math.round(rating)));
