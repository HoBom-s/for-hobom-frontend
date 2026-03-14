import { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowBackOutlined } from "hobom-design-system/icons";
import { Hb, ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { LawDiffViewer } from "@/features/privacy-law-diff";

const PrivacyLawDiffDetailPage = () => {
  const { diffId } = useParams<{ diffId: string }>();
  const navigate = useNavigate();

  if (!diffId) return null;

  return (
    <>
      <Hb.Button
        startIcon={<ArrowBackOutlined />}
        onClick={() => navigate("/privacy-law/diffs")}
        sx={{ mb: 2 }}
        size="small"
        variant="ghost"
      >
        목록으로
      </Hb.Button>
      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <LawDiffViewer diffId={diffId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default PrivacyLawDiffDetailPage;
