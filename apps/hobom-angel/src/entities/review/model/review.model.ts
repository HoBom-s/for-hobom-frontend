export type PlacementType = "ADOPTION" | "FOSTER";
export type StarRating = 1 | 2 | 3 | 4 | 5;

/** A shelter review, anchored to one completed placement (the verified
 *  experience that makes it trustworthy). Author PII is never exposed. */
export interface Review {
  id: string;
  shelterId: string;
  authorId: string;
  placementType: PlacementType;
  rating: number;
  body: string;
  createdAt: string | null;
}

/** A page of reviews (cursor pagination). */
export interface ReviewPage {
  reviews: Review[];
  nextCursor: string | null;
  hasNext: boolean;
}

/** A shelter's aggregate reputation: count, mean, and the star histogram. */
export interface ShelterReputation {
  shelterId: string;
  reviewCount: number;
  average: number;
  distribution: Record<StarRating, number>;
}

/** The placement that earned a review — shown as a trust badge on each card. */
export const PLACEMENT_LABEL: Record<PlacementType, string> = {
  ADOPTION: "입양자",
  FOSTER: "임보자",
};
