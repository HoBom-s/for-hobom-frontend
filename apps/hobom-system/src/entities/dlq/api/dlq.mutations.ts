import { mutationOptions } from "hobom-data";
import { retryDlqItem } from "./dlq.api";

export const dlqMutations = {
  all: () => ["dlq"] as const,

  retry: () =>
    mutationOptions({
      mutationKey: [...dlqMutations.all(), "retry"] as const,
      mutationFn: retryDlqItem,
    }),
} as const;
