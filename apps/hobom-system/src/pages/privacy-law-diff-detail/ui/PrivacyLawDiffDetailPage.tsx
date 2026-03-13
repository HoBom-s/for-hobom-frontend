import { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ArrowBackOutlined } from "@mui/icons-material";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { LawDiffViewer } from "@/features/privacy-law-diff";

const PrivacyLawDiffDetailPage = () => {
  const { diffId } = useParams<{ diffId: string }>();
  const navigate = useNavigate();

  if (!diffId) return null;

  return (
    <>
      <Button
        startIcon={<ArrowBackOutlined />}
        onClick={() => navigate("/privacy-law/diffs")}
        sx={{ mb: 2 }}
        size="small"
      >
        목록으로
      </Button>
      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <LawDiffViewer diffId={diffId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default PrivacyLawDiffDetailPage;
