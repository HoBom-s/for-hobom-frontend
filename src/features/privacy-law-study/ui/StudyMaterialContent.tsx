import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { CheckCircleOutline, LightbulbOutlined } from "@mui/icons-material";
import { privacyLawQueries } from "@/entities/privacy-law";

interface Props {
  materialId: string;
}

export const StudyMaterialContent = ({ materialId }: Props) => {
  const { data } = useSuspenseQuery(
    privacyLawQueries.studyMaterial(materialId),
  );
  const material = data.items;

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <LightbulbOutlined color="warning" />
          <Typography variant="h6">요약</Typography>
        </Stack>
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
          {material.summary}
        </Typography>
      </Paper>

      <Typography variant="h6" gutterBottom>
        핵심 포인트
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <List disablePadding>
        {material.keyPoints.map((point, i) => (
          <ListItem key={i} disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Chip label={i + 1} size="small" color="primary" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2">{point}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>

      {material.quizzes.length > 0 && (
        <Stack direction="row" alignItems="center" spacing={1} mt={3}>
          <CheckCircleOutline color="primary" fontSize="small" />
          <Typography variant="subtitle2" color="text.secondary">
            이 학습 자료에 {material.quizzes.length}개의 퀴즈가 있습니다.
            아래에서 풀어보세요.
          </Typography>
        </Stack>
      )}
    </Box>
  );
};
