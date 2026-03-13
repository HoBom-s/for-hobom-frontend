import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { SchoolOutlined, QuizOutlined } from "@mui/icons-material";
import { privacyLawQueries } from "@/entities/privacy-law";

export const StudyMaterialList = () => {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery(privacyLawQueries.studyMaterials());
  const materials = data.items;

  return (
    <Stack spacing={2}>
      {materials.map((m) => (
        <Card key={m.id} variant="outlined">
          <CardActionArea
            onClick={() => navigate(`/privacy-law/study/${m.id}`)}
          >
            <CardContent>
              <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <SchoolOutlined
                    color="primary"
                    fontSize="small"
                    sx={{ mt: 0.25 }}
                  />
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      {m.summary.length > 80
                        ? `${m.summary.slice(0, 80)}...`
                        : m.summary}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      핵심 포인트 {m.keyPoints.length}개
                    </Typography>
                  </Box>
                </Stack>
                <Chip
                  icon={<QuizOutlined />}
                  label={`퀴즈 ${m.quizzes.length}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
      {materials.length === 0 && (
        <Typography color="text.secondary" textAlign="center" py={4}>
          학습 자료가 없습니다.
        </Typography>
      )}
    </Stack>
  );
};
