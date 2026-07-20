import { httpClient, parseResponse } from "@/shared/api";
import { toQueryString } from "@/shared/lib";
import { reputationSchema, reviewsPageSchema } from "./review.schema";
import { toReputation, toReview } from "../lib/to-review.lib";
import type { ReviewPage, ShelterReputation } from "../model/review.model";

const parsePage = parseResponse(reviewsPageSchema, "GET /shelters/:id/reviews");
const parseReputation = parseResponse(reputationSchema, "GET /shelters/:id/reviews/reputation");

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
