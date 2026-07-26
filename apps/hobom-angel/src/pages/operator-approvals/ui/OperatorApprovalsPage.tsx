import { Suspense } from "react";
import { OperatorApprovals } from "@/features/operator-approvals";
import { LoadingState } from "@/shared/ui";

export const OperatorApprovalsPage = () => (
  <Suspense fallback={<LoadingState />}>
    <OperatorApprovals />
  </Suspense>
);
