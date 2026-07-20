import type { PlacementType } from "../model/review.model";

export interface RawReview {
  id: string;
  shelterId: string;
  authorId: string;
  placementType: PlacementType;
  rating: number;
  body: string;
  createdAt: string | null;
}

export interface RawReviewsPage {
  items: RawReview[];
  nextCursor: string | null;
  hasNext: boolean;
}

export interface RawReputation {
  shelterId: string;
  reviewCount: number;
  average: number;
  distribution: { "1": number; "2": number; "3": number; "4": number; "5": number };
}
