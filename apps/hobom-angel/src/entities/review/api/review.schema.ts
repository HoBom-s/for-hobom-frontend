import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { RawReputation, RawReview, RawReviewsPage } from "./review.type";

const reviewSchema: Schema<RawReview> = HoBomSchema.object({
  id: HoBomSchema.string(),
  shelterId: HoBomSchema.string(),
  authorId: HoBomSchema.string(),
  placementType: HoBomSchema.enum(["ADOPTION", "FOSTER"]),
  rating: HoBomSchema.number(),
  body: HoBomSchema.string(),
  createdAt: HoBomSchema.string().nullable(),
});

/** `GET /shelters/:id/reviews` — a cursor page of reviews. */
export const reviewsPageSchema: Schema<RawReviewsPage> = HoBomSchema.object({
  items: HoBomSchema.array(reviewSchema),
  nextCursor: HoBomSchema.string().nullable(),
  hasNext: HoBomSchema.boolean(),
});

/** `GET /shelters/:id/reviews/reputation` — mean + star histogram. */
export const reputationSchema: Schema<RawReputation> = HoBomSchema.object({
  shelterId: HoBomSchema.string(),
  reviewCount: HoBomSchema.number(),
  average: HoBomSchema.number(),
  distribution: HoBomSchema.object({
    "1": HoBomSchema.number(),
    "2": HoBomSchema.number(),
    "3": HoBomSchema.number(),
    "4": HoBomSchema.number(),
    "5": HoBomSchema.number(),
  }),
});
