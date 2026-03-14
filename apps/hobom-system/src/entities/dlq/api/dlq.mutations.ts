import { mutationOptions } from "@tanstack/react-query";
import { retryDlqItem } from "./dlq.api";

export const dlqMutations = {
  all: () => ["dlq"] as const,

  retry: () =>
    mutationOptions({
      mutationKey: [...dlqMutations.all(), "retry"] as const,
      mutationFn: retryDlqItem,
    }),
} as const;
