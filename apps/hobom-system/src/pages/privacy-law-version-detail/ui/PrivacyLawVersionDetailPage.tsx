import { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowBackOutlined } from "hobom-design-system/icons";
import { Hb, ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { LawArticleViewer } from "@/features/privacy-law-viewer";

const PrivacyLawVersionDetailPage = () => {
  const { versionId } = useParams<{ versionId: string }>();
  const navigate = useNavigate();

  if (!versionId) return null;

  return (
    <>
      <Hb.Button
        startIcon={<ArrowBackOutlined />}
        onClick={() => navigate("/privacy-law/versions")}
        sx={{ mb: 2 }}
        size="small"
        variant="ghost"
      >
        목록으로
      </Hb.Button>
      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <LawArticleViewer versionId={versionId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default PrivacyLawVersionDetailPage;
