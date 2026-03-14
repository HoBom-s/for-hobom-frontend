import { useNavigate } from "react-router-dom";
import { useMutation, useDataLot, useSuspenseQuery } from "hobom-data";
import { AssignmentOutlined, AddCircleOutline, QuizOutlined } from "hobom-design-system/icons";
import { privacyLawQueries, privacyLawMutations } from "@/entities/privacy-law";
import { useToast } from "@/shared/model";
import { reportError } from "@/shared/lib";
import { Hb } from "@/shared/ui";

export const ExamList = () => {
  const navigate = useNavigate();
  const dataLot = useDataLot();
  const { data } = useSuspenseQuery(privacyLawQueries.exams());
  const toast = useToast();
  const exams = data.items;

  const { mutate: generate, isPending } = useMutation({
    ...privacyLawMutations.generateExam(),
    onSuccess: (res) => {
      dataLot.invalidateQueries({ queryKey: privacyLawQueries.all() });
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
    <Hb.Stack spacing={2}>
      <Hb.Button
        variant="primary"
        startIcon={<AddCircleOutline />}
        onClick={() => generate()}
        loading={isPending}
        sx={{ alignSelf: "flex-start" }}
      >
        {isPending ? "생성 중..." : "모의고사 생성"}
      </Hb.Button>

      {exams.map((exam) => (
        <Hb.Card.Root key={exam.id} variant="outlined">
          <Hb.Card.Clickable onClick={() => navigate(`/privacy-law/exams/${exam.id}`)}>
            <Hb.Card.Content>
              <Hb.Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                <Hb.Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <AssignmentOutlined color="primary" fontSize="small" sx={{ mt: 0.25 }} />
                  <div>
                    <Hb.Text variant="subtitle2" gutterBottom>
                      {exam.title}
                    </Hb.Text>
                    <Hb.Text variant="caption" color="text.secondary">
                      {new Date(exam.createdAt).toLocaleDateString("ko-KR")}
                    </Hb.Text>
                  </div>
                </Hb.Stack>
                <Hb.Chip
                  icon={<QuizOutlined />}
                  label={`${exam.totalQuestions}문제`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Hb.Stack>
            </Hb.Card.Content>
          </Hb.Card.Clickable>
        </Hb.Card.Root>
      ))}

      {exams.length === 0 && (
        <Hb.Text color="text.secondary" textAlign="center" py={4}>
          모의고사 이력이 없습니다. 위 버튼으로 새 모의고사를 생성해보세요.
        </Hb.Text>
      )}
    </Hb.Stack>
  );
};
