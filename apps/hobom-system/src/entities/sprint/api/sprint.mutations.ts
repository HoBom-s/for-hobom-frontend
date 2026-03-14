import { mutationOptions } from "hobom-data";
import {
  postCreateSprint,
  patchUpdateSprint,
  deleteSprint,
  postStartSprint,
  postCompleteSprint,
} from "./sprint.api";

export const sprintMutations = {
  sprints: () => ["sprints"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...sprintMutations.sprints(), "create"] as const,
      mutationFn: postCreateSprint,
    }),
  update: () =>
    mutationOptions({
      mutationKey: [...sprintMutations.sprints(), "update"] as const,
      mutationFn: patchUpdateSprint,
    }),
  delete: () =>
    mutationOptions({
      mutationKey: [...sprintMutations.sprints(), "delete"] as const,
      mutationFn: deleteSprint,
    }),
  start: () =>
    mutationOptions({
      mutationKey: [...sprintMutations.sprints(), "start"] as const,
      mutationFn: postStartSprint,
    }),
  complete: () =>
    mutationOptions({
      mutationKey: [...sprintMutations.sprints(), "complete"] as const,
      mutationFn: postCompleteSprint,
    }),
} as const;
