import { mutationOptions } from "hobom-data";
import { submitReview } from "./review.api";
import type { SubmitReviewInput } from "./review.type";

export const reviewMutations = {
  // shelterId changes with the application under review, so it rides in the
  // mutate vars rather than being bound at render time.
  submit: () =>
    mutationOptions({
      mutationFn: (vars: { shelterId: string; input: SubmitReviewInput }) =>
        submitReview(vars.shelterId, vars.input),
    }),
} as const;
