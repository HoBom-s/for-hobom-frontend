import { useNavigate } from "react-router-dom";
import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { CloudDownloadOutlined, GavelOutlined } from "@mui/icons-material";
import { privacyLawQueries, privacyLawMutations } from "@/entities/privacy-law";

export const LawVersionList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(privacyLawQueries.versions());
  const versions = data.items;

  const fetchMutation = useMutation({
    ...privacyLawMutations.fetch(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: privacyLawQueries.all(),
      });
    },
  });

  return (
    <Stack spacing={2}>
      {versions.length === 0 && (
        <Card
          variant="outlined"
          sx={{ textAlign: "center", py: 4, bgcolor: "background.default" }}
        >
          <CardContent>
            <GavelOutlined
              sx={{ fontSize: 48, color: "text.disabled", mb: 1 }}
            />
            <Typography color="text.secondary" gutterBottom>
              등록된 법률 버전이 없습니다.
            </Typography>
            <Typography variant="caption" color="text.disabled" gutterBottom>
              법률 데이터를 수집하면 최신 개인정보보호법을 불러옵니다.
            </Typography>
            <Box mt={2}>
              <Button
                variant="contained"
                startIcon={<CloudDownloadOutlined />}
                onClick={() => fetchMutation.mutate()}
                disabled={fetchMutation.isPending}
              >
                {fetchMutation.isPending ? "수집 중..." : "법률 데이터 수집"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {versions.map((version) => (
        <Card key={version.id} variant="outlined">
          <CardActionArea
            onClick={() => navigate(`/privacy-law/versions/${version.id}`)}
          >
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <GavelOutlined color="primary" fontSize="small" />
                  <Box>
                    <Typography variant="subtitle2">
                      {version.lawName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {version.articles.length}개 조문
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={`공포 ${version.proclamationDate}`}
                    size="small"
                    variant="outlined"
                  />
                  <Chip
                    label={`시행 ${version.enforcementDate}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Stack>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  );
};
