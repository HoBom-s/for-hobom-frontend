import { httpClient, parseResponse } from "@/shared/api";
import { toQueryString } from "@/shared/lib";
import { createdReviewSchema, reputationSchema, reviewsPageSchema } from "./review.schema";
import { toReputation, toReview } from "../lib/to-review.lib";
import type { ReviewPage, ShelterReputation } from "../model/review.model";
import type { ReviseReviewInput, SubmitReviewInput } from "./review.type";

const parsePage = parseResponse(reviewsPageSchema, "GET /shelters/:id/reviews");
const parseReputation = parseResponse(reputationSchema, "GET /shelters/:id/reviews/reputation");
const parseCreated = parseResponse(createdReviewSchema, "POST /shelters/:id/reviews");

/** A cursor page of a shelter's reviews (newest first). */
export const getShelterReviews = (
  shelterId: string,
  cursor?: string,
  signal?: AbortSignal,
): Promise<ReviewPage> =>
  httpClient
    .get(`/shelters/${shelterId}/reviews${toQueryString({ cursor, limit: 20 })}`, { signal })
    .then(parsePage)
    .then((page) => ({
      reviews: page.items.map(toReview),
      nextCursor: page.nextCursor,
      hasNext: page.hasNext,
    }));

/** A shelter's aggregate reputation (mean + star histogram). */
export const getShelterReputation = (
  shelterId: string,
  signal?: AbortSignal,
): Promise<ShelterReputation> =>
  httpClient
    .get(`/shelters/${shelterId}/reviews/reputation`, { signal })
    .then(parseReputation)
    .then(toReputation);

/** Write a review for a completed placement (완료된 입양/임보자만). */
export const submitReview = (shelterId: string, input: SubmitReviewInput): Promise<string> =>
  httpClient
    .post(`/shelters/${shelterId}/reviews`, input)
    .then(parseCreated)
    .then((created) => created.reviewId);

/** Edit one of the viewer's own reviews (작성자만). */
export const reviseReview = (reviewId: string, input: ReviseReviewInput): Promise<void> =>
  httpClient.patch(`/reviews/${reviewId}`, input).then(() => undefined);

/** Delete a review (작성자 또는 운영자). */
export const deleteReview = (reviewId: string): Promise<void> =>
  httpClient.delete(`/reviews/${reviewId}`).then(() => undefined);
