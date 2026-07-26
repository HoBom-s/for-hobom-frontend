import { mutationOptions } from "hobom-data";
import { decideApproval } from "./approval.api";
import type { DecideApprovalInput } from "./approval.type";

export const approvalMutations = {
  decide: () =>
    mutationOptions({
      mutationFn: (vars: { approvalId: string; input: DecideApprovalInput }) =>
        decideApproval(vars.approvalId, vars.input),
    }),
} as const;
