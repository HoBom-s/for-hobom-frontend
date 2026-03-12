import { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ArrowBackOutlined } from "@mui/icons-material";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { LawArticleViewer } from "@/features/privacy-law-viewer";

const PrivacyLawVersionDetailPage = () => {
  const { versionId } = useParams<{ versionId: string }>();
  const navigate = useNavigate();

  if (!versionId) return null;

  return (
    <>
      <Button
        startIcon={<ArrowBackOutlined />}
        onClick={() => navigate("/privacy-law/versions")}
        sx={{ mb: 2 }}
        size="small"
      >
        목록으로
      </Button>
      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <LawArticleViewer versionId={versionId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default PrivacyLawVersionDetailPage;
