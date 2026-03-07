import { mutationOptions } from "@tanstack/react-query";
import {
  postCreateProject,
  patchUpdateProject,
  deleteProject,
  postAddMember,
  deleteRemoveMember,
} from "./project.api";
import { putUpdateWorkflow } from "./workflow.api";

export const projectMutations = {
  projects: () => ["projects"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...projectMutations.projects(), "create"] as const,
      mutationFn: postCreateProject,
    }),
  update: () =>
    mutationOptions({
      mutationKey: [...projectMutations.projects(), "update"] as const,
      mutationFn: patchUpdateProject,
    }),
  delete: () =>
    mutationOptions({
      mutationKey: [...projectMutations.projects(), "delete"] as const,
      mutationFn: deleteProject,
    }),
  addMember: () =>
    mutationOptions({
      mutationKey: [...projectMutations.projects(), "addMember"] as const,
      mutationFn: postAddMember,
    }),
  removeMember: () =>
    mutationOptions({
      mutationKey: [...projectMutations.projects(), "removeMember"] as const,
      mutationFn: deleteRemoveMember,
    }),
  updateWorkflow: () =>
    mutationOptions({
      mutationKey: [...projectMutations.projects(), "updateWorkflow"] as const,
      mutationFn: putUpdateWorkflow,
    }),
} as const;
