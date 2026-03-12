import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowForwardOutlined,
  CompareArrowsOutlined,
} from "@mui/icons-material";
import { privacyLawQueries } from "@/entities/privacy-law";

const CHANGE_COLORS: Record<string, "success" | "warning" | "error"> = {
  ADDED: "success",
  MODIFIED: "warning",
  DELETED: "error",
};

export const LawDiffList = () => {
  const navigate = useNavigate();
  const { data } = useSuspenseQuery(privacyLawQueries.diffs());
  const diffs = data.items;

  return (
    <Stack spacing={2}>
      {diffs.map((diff) => {
        const counts = diff.changes.reduce(
          (acc, c) => {
            acc[c.changeType] = (acc[c.changeType] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        );

        return (
          <Card key={diff.id} variant="outlined">
            <CardActionArea
              onClick={() => navigate(`/privacy-law/diffs/${diff.id}`)}
            >
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <CompareArrowsOutlined color="primary" fontSize="small" />
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Typography variant="subtitle2">
                        {diff.fromProclamationDate}
                      </Typography>
                      <ArrowForwardOutlined
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
                      <Typography variant="subtitle2">
                        {diff.toProclamationDate}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    {Object.entries(counts).map(([type, count]) => (
                      <Chip
                        key={type}
                        label={`${type} ${count}`}
                        size="small"
                        color={CHANGE_COLORS[type] ?? "default"}
                        variant="outlined"
                      />
                    ))}
                    <Chip
                      label={`${diff.changes.length}건`}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
      {diffs.length === 0 && (
        <Typography color="text.secondary" textAlign="center" py={4}>
          변경 이력이 없습니다.
        </Typography>
      )}
    </Stack>
  );
};
