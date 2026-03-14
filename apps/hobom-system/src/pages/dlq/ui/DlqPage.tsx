import { Suspense } from "react";
import { DlqManagementContent } from "@/features/dlq-management";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";

export default function DlqPage() {
  return (
    <ErrorBoundary inline>
      <Suspense fallback={<SuspenseLoader />}>
        <DlqManagementContent />
      </Suspense>
    </ErrorBoundary>
  );
}
