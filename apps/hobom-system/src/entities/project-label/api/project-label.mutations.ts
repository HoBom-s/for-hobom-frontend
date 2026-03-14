import { mutationOptions } from "hobom-data";
import {
  postCreateProjectLabel,
  patchUpdateProjectLabel,
  deleteProjectLabel,
} from "./project-label.api";

export const projectLabelMutations = {
  labels: () => ["project-labels"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...projectLabelMutations.labels(), "create"] as const,
      mutationFn: postCreateProjectLabel,
    }),
  update: () =>
    mutationOptions({
      mutationKey: [...projectLabelMutations.labels(), "update"] as const,
      mutationFn: patchUpdateProjectLabel,
    }),
  delete: () =>
    mutationOptions({
      mutationKey: [...projectLabelMutations.labels(), "delete"] as const,
      mutationFn: deleteProjectLabel,
    }),
} as const;
