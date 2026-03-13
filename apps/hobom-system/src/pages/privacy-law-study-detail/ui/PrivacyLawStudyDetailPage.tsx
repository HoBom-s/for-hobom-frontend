import { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { ArrowBackOutlined, QuizOutlined } from "@mui/icons-material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { privacyLawQueries } from "@/entities/privacy-law";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { StudyMaterialContent, QuizCard } from "@/features/privacy-law-study";

const StudyDetailContent = ({ materialId }: { materialId: string }) => {
  const { data } = useSuspenseQuery(
    privacyLawQueries.studyMaterial(materialId),
  );
  const material = data.items;

  return (
    <Stack spacing={3}>
      <StudyMaterialContent materialId={materialId} />

      {material.quizzes.length > 0 && (
        <>
          <Divider />
          <Stack direction="row" alignItems="center" spacing={1}>
            <QuizOutlined color="primary" />
            <Typography variant="h6">퀴즈</Typography>
          </Stack>
          <QuizCard quizzes={material.quizzes} />
        </>
      )}
    </Stack>
  );
};

const PrivacyLawStudyDetailPage = () => {
  const { materialId } = useParams<{ materialId: string }>();
  const navigate = useNavigate();

  if (!materialId) return null;

  return (
    <>
      <Button
        startIcon={<ArrowBackOutlined />}
        onClick={() => navigate("/privacy-law/study")}
        sx={{ mb: 2 }}
        size="small"
      >
        목록으로
      </Button>
      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <StudyDetailContent materialId={materialId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default PrivacyLawStudyDetailPage;
