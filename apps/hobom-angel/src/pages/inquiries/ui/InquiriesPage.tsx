import { Suspense } from "react";
import { MyInquiries } from "@/features/my-inquiries";
import { LoadingState } from "@/shared/ui";

export const InquiriesPage = () => (
  <Suspense fallback={<LoadingState />}>
    <MyInquiries />
  </Suspense>
);
