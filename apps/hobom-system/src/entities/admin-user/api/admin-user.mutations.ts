import { mutationOptions } from "@tanstack/react-query";
import { patchApproveUser, patchRejectUser } from "./admin-user.api";

export const adminUserMutations = {
  all: () => ["admin-users"] as const,

  approve: () =>
    mutationOptions({
      mutationKey: [...adminUserMutations.all(), "approve"] as const,
      mutationFn: patchApproveUser,
    }),

  reject: () =>
    mutationOptions({
      mutationKey: [...adminUserMutations.all(), "reject"] as const,
      mutationFn: patchRejectUser,
    }),
} as const;
