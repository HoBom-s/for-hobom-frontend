import { Suspense } from "react";
import { VolunteerCertificates } from "@/features/volunteer-certificate";
import { LoadingState } from "@/shared/ui";

export const VolunteerCertificatesPage = () => (
  <Suspense fallback={<LoadingState />}>
    <VolunteerCertificates />
  </Suspense>
);
