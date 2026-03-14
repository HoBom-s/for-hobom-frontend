import { mutationOptions } from "hobom-data";
import { postCreateLabel, patchUpdateLabel, deleteLabel } from "./label.api";

export const labelMutations = {
  labels: () => ["labels"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...labelMutations.labels(), "create"] as const,
      mutationFn: postCreateLabel,
    }),
  update: () =>
    mutationOptions({
      mutationKey: [...labelMutations.labels(), "update"] as const,
      mutationFn: patchUpdateLabel,
    }),
  delete: () =>
    mutationOptions({
      mutationKey: [...labelMutations.labels(), "delete"] as const,
      mutationFn: deleteLabel,
    }),
} as const;
