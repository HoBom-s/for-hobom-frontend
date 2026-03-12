import { Suspense } from "react";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { LawDiffList } from "@/features/privacy-law-diff";

const PrivacyLawDiffsPage = () => (
  <ErrorBoundary inline>
    <Suspense fallback={<SuspenseLoader />}>
      <LawDiffList />
    </Suspense>
  </ErrorBoundary>
);

export default PrivacyLawDiffsPage;
