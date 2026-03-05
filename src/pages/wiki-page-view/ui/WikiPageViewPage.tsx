import { useOutletContext, useParams } from "react-router-dom";
import { WikiPageViewWorkspace } from "@/widgets/wiki-page-view-workspace";

interface WikiSpaceContext {
  spaceKey: string;
}

const WikiPageViewPage = () => {
  const { spaceKey, pageId } = useParams<{
    spaceKey: string;
    pageId: string;
  }>();
  const context = useOutletContext<WikiSpaceContext>();
  const resolvedSpaceKey = spaceKey ?? context.spaceKey;

  if (!resolvedSpaceKey || !pageId) return null;

  return <WikiPageViewWorkspace spaceKey={resolvedSpaceKey} pageId={pageId} />;
};

export default WikiPageViewPage;
