import { mutationOptions } from "hobom-data";
import { deleteReview, reviseReview, submitReview } from "./review.api";
import type { ReviseReviewInput, SubmitReviewInput } from "./review.type";

export const reviewMutations = {
  // shelterId changes with the application under review, so it rides in the
  // mutate vars rather than being bound at render time.
  submit: () =>
    mutationOptions({
      mutationFn: (vars: { shelterId: string; input: SubmitReviewInput }) =>
        submitReview(vars.shelterId, vars.input),
    }),

  revise: () =>
    mutationOptions({
      mutationFn: (vars: { reviewId: string; input: ReviseReviewInput }) =>
        reviseReview(vars.reviewId, vars.input),
    }),

  remove: () =>
    mutationOptions({
      mutationFn: (reviewId: string) => deleteReview(reviewId),
    }),
} as const;
