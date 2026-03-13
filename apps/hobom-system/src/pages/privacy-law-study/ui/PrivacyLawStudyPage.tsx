import { Suspense } from "react";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { StudyMaterialList } from "@/features/privacy-law-study";

const PrivacyLawStudyPage = () => (
  <ErrorBoundary inline>
    <Suspense fallback={<SuspenseLoader />}>
      <StudyMaterialList />
    </Suspense>
  </ErrorBoundary>
);

export default PrivacyLawStudyPage;
