import { useSuspenseQuery } from "@tanstack/react-query";
import {
  CheckCircleOutline,
  LightbulbOutlined,
} from "hobom-design-system/icons";
import { privacyLawQueries } from "@/entities/privacy-law";
import { Hb } from "@/shared/ui";

interface Props {
  materialId: string;
}

export const StudyMaterialContent = ({ materialId }: Props) => {
  const { data } = useSuspenseQuery(
    privacyLawQueries.studyMaterial(materialId),
  );
  const material = data.items;

  return (
    <Hb.Box>
      <Hb.Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Hb.Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <LightbulbOutlined color="warning" />
          <Hb.Text variant="h6">요약</Hb.Text>
        </Hb.Stack>
        <Hb.Text variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
          {material.summary}
        </Hb.Text>
      </Hb.Paper>

      <Hb.Text variant="h6" gutterBottom>
        핵심 포인트
      </Hb.Text>
      <Hb.Divider sx={{ mb: 1 }} />
      <Hb.List.Root disablePadding>
        {material.keyPoints.map((point, i) => (
          <Hb.List.Item key={i} disableGutters>
            <Hb.List.ItemIcon sx={{ minWidth: 36 }}>
              <Hb.Chip label={i + 1} size="small" color="primary" />
            </Hb.List.ItemIcon>
            <Hb.List.ItemText>
              <Hb.Text variant="body2">{point}</Hb.Text>
            </Hb.List.ItemText>
          </Hb.List.Item>
        ))}
      </Hb.List.Root>

      {material.quizzes.length > 0 && (
        <Hb.Stack direction="row" alignItems="center" spacing={1} mt={3}>
          <CheckCircleOutline color="primary" fontSize="small" />
          <Hb.Text variant="subtitle2" color="text.secondary">
            이 학습 자료에 {material.quizzes.length}개의 퀴즈가 있습니다.
            아래에서 풀어보세요.
          </Hb.Text>
        </Hb.Stack>
      )}
    </Hb.Box>
  );
};
