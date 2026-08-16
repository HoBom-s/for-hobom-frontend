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

/** `POST /shelters/:id/reviews` request — anchored to a completed placement. */
export interface SubmitReviewInput {
  placementType: PlacementType;
  /** The completed adoption/foster application id. */
  placementRef: string;
  rating: number;
  body: string;
}

export interface RawCreatedReview {
  reviewId: string;
}

/** `PATCH /reviews/:reviewId` request — the author edits rating + body. */
export interface ReviseReviewInput {
  rating: number;
  body: string;
}
