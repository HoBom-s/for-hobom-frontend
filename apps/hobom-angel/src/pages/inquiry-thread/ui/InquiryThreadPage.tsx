import { Suspense } from "react";
import { useParams } from "react-router";
import { InquiryThread } from "@/features/inquiry-thread";
import { LoadingState, NotFoundState } from "@/shared/ui";

export const InquiryThreadPage = () => {
  const { inquiryId } = useParams<{ inquiryId: string }>();

  if (!inquiryId) return <NotFoundState />;

  return (
    <Suspense fallback={<LoadingState />}>
      <InquiryThread inquiryId={inquiryId} />
    </Suspense>
  );
};
