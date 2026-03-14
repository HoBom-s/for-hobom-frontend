import { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowBackOutlined, QuizOutlined } from "hobom-design-system/icons";
import { useSuspenseQuery } from "hobom-data";
import { privacyLawQueries } from "@/entities/privacy-law";
import { Hb, ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { StudyMaterialContent, QuizCard } from "@/features/privacy-law-study";

const StudyDetailContent = ({ materialId }: { materialId: string }) => {
  const { data } = useSuspenseQuery(privacyLawQueries.studyMaterial(materialId));
  const material = data.items;

  return (
    <Hb.Stack spacing={3}>
      <StudyMaterialContent materialId={materialId} />

      {material.quizzes.length > 0 && (
        <>
          <Hb.Divider />
          <Hb.Stack direction="row" alignItems="center" spacing={1}>
            <QuizOutlined color="primary" />
            <Hb.Text variant="h6">퀴즈</Hb.Text>
          </Hb.Stack>
          <QuizCard quizzes={material.quizzes} />
        </>
      )}
    </Hb.Stack>
  );
};

const PrivacyLawStudyDetailPage = () => {
  const { materialId } = useParams<{ materialId: string }>();
  const navigate = useNavigate();

  if (!materialId) return null;

  return (
    <>
      <Hb.Button
        startIcon={<ArrowBackOutlined />}
        onClick={() => navigate("/privacy-law/study")}
        sx={{ mb: 2 }}
        size="small"
        variant="ghost"
      >
        목록으로
      </Hb.Button>
      <ErrorBoundary inline>
        <Suspense fallback={<SuspenseLoader />}>
          <StudyDetailContent materialId={materialId} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default PrivacyLawStudyDetailPage;
