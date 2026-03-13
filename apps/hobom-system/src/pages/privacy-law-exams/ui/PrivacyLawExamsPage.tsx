import { Suspense } from "react";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { ExamList } from "@/features/privacy-law-exam";

const PrivacyLawExamsPage = () => (
  <ErrorBoundary inline>
    <Suspense fallback={<SuspenseLoader />}>
      <ExamList />
    </Suspense>
  </ErrorBoundary>
);

export default PrivacyLawExamsPage;
