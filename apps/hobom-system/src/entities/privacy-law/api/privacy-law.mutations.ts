import { mutationOptions } from "@tanstack/react-query";
import { postAskQuestion, postFetchLaw } from "./privacy-law.api";

export const privacyLawMutations = {
  all: () => ["privacy-law"] as const,

  ask: () =>
    mutationOptions({
      mutationKey: [...privacyLawMutations.all(), "ask"] as const,
      mutationFn: postAskQuestion,
    }),

  fetch: () =>
    mutationOptions({
      mutationKey: [...privacyLawMutations.all(), "fetch"] as const,
      mutationFn: postFetchLaw,
    }),
} as const;
