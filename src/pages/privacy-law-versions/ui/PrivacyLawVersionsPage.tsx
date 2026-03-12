import { Suspense } from "react";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { LawVersionList } from "@/features/privacy-law-viewer";

const PrivacyLawVersionsPage = () => (
  <ErrorBoundary inline>
    <Suspense fallback={<SuspenseLoader />}>
      <LawVersionList />
    </Suspense>
  </ErrorBoundary>
);

export default PrivacyLawVersionsPage;
