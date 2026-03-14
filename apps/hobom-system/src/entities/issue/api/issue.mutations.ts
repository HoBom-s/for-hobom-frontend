import { mutationOptions } from "hobom-data";
import {
  postCreateIssue,
  patchUpdateIssue,
  deleteIssue,
  postTransitionIssue,
  patchAssignIssue,
} from "./issue.api";

export const issueMutations = {
  issues: () => ["issues"] as const,

  create: () =>
    mutationOptions({
      mutationKey: [...issueMutations.issues(), "create"] as const,
      mutationFn: postCreateIssue,
    }),
  update: () =>
    mutationOptions({
      mutationKey: [...issueMutations.issues(), "update"] as const,
      mutationFn: patchUpdateIssue,
    }),
  delete: () =>
    mutationOptions({
      mutationKey: [...issueMutations.issues(), "delete"] as const,
      mutationFn: deleteIssue,
    }),
  transition: () =>
    mutationOptions({
      mutationKey: [...issueMutations.issues(), "transition"] as const,
      mutationFn: postTransitionIssue,
    }),
  assign: () =>
    mutationOptions({
      mutationKey: [...issueMutations.issues(), "assign"] as const,
      mutationFn: patchAssignIssue,
    }),
} as const;
