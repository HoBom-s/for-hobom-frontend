import { useNavigate } from "react-router-dom";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import {
  AssignmentOutlined,
  AddCircleOutline,
  QuizOutlined,
} from "@mui/icons-material";
import { privacyLawQueries, privacyLawMutations } from "@/entities/privacy-law";
import { useToast } from "@/shared/model";
import { reportError } from "@/shared/lib";

export const ExamList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(privacyLawQueries.exams());
  const toast = useToast();
  const exams = data.items;

  const { mutate: generate, isPending } = useMutation({
    ...privacyLawMutations.generateExam(),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: privacyLawQueries.all() });
      toast.openSuccessToast({
        message: "모의고사 문제를 생성했어요. 이동할게요.",
      });
      navigate(`/privacy-law/exams/${res.items.id}`);
    },
    onError: (error) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.openErrorToast({ message: "모의고사 문제를 생성하지 못했어요." });
      reportError(error);
      console.error("[ExamList] 모의고사 생성 실패:", error);
    },
  });

  return (
    <Stack spacing={2}>
      <Button
        variant="contained"
        startIcon={<AddCircleOutline />}
        onClick={() => generate()}
        loading={isPending}
        sx={{ alignSelf: "flex-start" }}
      >
        {isPending ? "생성 중..." : "모의고사 생성"}
      </Button>

      {exams.map((exam) => (
        <Card key={exam.id} variant="outlined">
          <CardActionArea
            onClick={() => navigate(`/privacy-law/exams/${exam.id}`)}
          >
            <CardContent>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <AssignmentOutlined
                    color="primary"
                    fontSize="small"
                    sx={{ mt: 0.25 }}
                  />
                  <div>
                    <Typography variant="subtitle2" gutterBottom>
                      {exam.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(exam.createdAt).toLocaleDateString("ko-KR")}
                    </Typography>
                  </div>
                </Stack>
                <Chip
                  icon={<QuizOutlined />}
                  label={`${exam.totalQuestions}문제`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}

      {exams.length === 0 && (
        <Typography color="text.secondary" textAlign="center" py={4}>
          모의고사 이력이 없습니다. 위 버튼으로 새 모의고사를 생성해보세요.
        </Typography>
      )}
    </Stack>
  );
};
