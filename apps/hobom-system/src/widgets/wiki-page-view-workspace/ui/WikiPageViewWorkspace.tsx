import { Suspense } from "react";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { PageContent } from "./PageContent";

export const WikiPageViewWorkspace = ({
  spaceKey,
  pageId,
}: {
  spaceKey: string;
  pageId: string;
}) => (
  <ErrorBoundary inline resetKey={`${spaceKey}/${pageId}`}>
    <Suspense fallback={<SuspenseLoader />}>
      <PageContent spaceKey={spaceKey} pageId={pageId} />
    </Suspense>
  </ErrorBoundary>
);
