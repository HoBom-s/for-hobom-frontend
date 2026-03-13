import { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Typography, Stack } from "@mui/material";
import { ErrorBoundary, SuspenseLoader } from "@/shared/ui";
import { privacyLawQueries } from "@/entities/privacy-law";
import { ExamQuestionCard } from "@/features/privacy-law-exam";

const ExamDetail = () => {
  const { examId } = useParams<{ examId: string }>();
  const { data } = useSuspenseQuery(privacyLawQueries.exam(examId!));
  const exam = data.items;

  return (
    <Stack spacing={2}>
      <Typography variant="h6" fontWeight={600}>
        {exam.title}
      </Typography>
      <ExamQuestionCard questions={exam.questions} />
    </Stack>
  );
};

const PrivacyLawExamDetailPage = () => (
  <ErrorBoundary inline>
    <Suspense fallback={<SuspenseLoader />}>
      <ExamDetail />
    </Suspense>
  </ErrorBoundary>
);

export default PrivacyLawExamDetailPage;
