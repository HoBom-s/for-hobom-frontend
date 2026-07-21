import { Suspense } from "react";
import { MyApplications } from "@/features/my-applications";
import { LoadingState } from "@/shared/ui";

export const ApplicationsPage = () => (
  <Suspense fallback={<LoadingState />}>
    <MyApplications />
  </Suspense>
);
