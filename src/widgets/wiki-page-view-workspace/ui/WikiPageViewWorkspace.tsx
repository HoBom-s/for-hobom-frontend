import { Suspense } from "react";
import { SuspenseLoader } from "@/shared/ui";
import { PageContent } from "./PageContent";

export const WikiPageViewWorkspace = ({
  spaceKey,
  pageId,
}: {
  spaceKey: string;
  pageId: string;
}) => (
  <Suspense fallback={<SuspenseLoader />}>
    <PageContent spaceKey={spaceKey} pageId={pageId} />
  </Suspense>
);
