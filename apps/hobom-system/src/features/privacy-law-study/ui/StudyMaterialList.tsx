import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "hobom-data";
import { SchoolOutlined, QuizOutlined } from "hobom-design-system/icons";
import { privacyLawQueries } from "@/entities/privacy-law";
import { Hb } from "@/shared/ui";

export const StudyMaterialList = () => {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery(privacyLawQueries.studyMaterials());
  const materials = data.items;

  return (
    <Hb.Stack spacing={2}>
      {materials.map((m) => (
        <Hb.Card.Root key={m.id} variant="outlined">
          <Hb.Card.Clickable onClick={() => navigate(`/privacy-law/study/${m.id}`)}>
            <Hb.Card.Content>
              <Hb.Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                <Hb.Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <SchoolOutlined color="primary" fontSize="small" sx={{ mt: 0.25 }} />
                  <Hb.Box>
                    <Hb.Text variant="subtitle2" gutterBottom>
                      {m.summary.length > 80 ? `${m.summary.slice(0, 80)}...` : m.summary}
                    </Hb.Text>
                    <Hb.Text variant="caption" color="text.secondary">
                      핵심 포인트 {m.keyPoints.length}개
                    </Hb.Text>
                  </Hb.Box>
                </Hb.Stack>
                <Hb.Chip
                  icon={<QuizOutlined />}
                  label={`퀴즈 ${m.quizzes.length}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Hb.Stack>
            </Hb.Card.Content>
          </Hb.Card.Clickable>
        </Hb.Card.Root>
      ))}
      {materials.length === 0 && (
        <Hb.Text color="text.secondary" textAlign="center" py={4}>
          학습 자료가 없습니다.
        </Hb.Text>
      )}
    </Hb.Stack>
  );
};
