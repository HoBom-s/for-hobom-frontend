import { mutationOptions } from "@tanstack/react-query";
import { patchFutureMessage, deleteFutureMessage } from "./future-message.api";

export const futureMessageMutations = {
  futureMessages: () => ["future-messages"] as const,

  update: () =>
    mutationOptions({
      mutationKey: [...futureMessageMutations.futureMessages(), "update"] as const,
      mutationFn: patchFutureMessage,
    }),
  delete: () =>
    mutationOptions({
      mutationKey: [...futureMessageMutations.futureMessages(), "delete"] as const,
      mutationFn: deleteFutureMessage,
    }),
} as const;
