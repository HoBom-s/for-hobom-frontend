import type { RawReputation, RawReview } from "../api/review.type";
import type { Review, ShelterReputation } from "../model/review.model";

export const toReview = (raw: RawReview): Review => ({
  id: raw.id,
  shelterId: raw.shelterId,
  authorId: raw.authorId,
  placementType: raw.placementType,
  rating: raw.rating,
  body: raw.body,
  createdAt: raw.createdAt,
});

export const toReputation = (raw: RawReputation): ShelterReputation => ({
  shelterId: raw.shelterId,
  reviewCount: raw.reviewCount,
  average: raw.average,
  distribution: {
    1: raw.distribution["1"],
    2: raw.distribution["2"],
    3: raw.distribution["3"],
    4: raw.distribution["4"],
    5: raw.distribution["5"],
  },
});
