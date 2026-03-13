import { useSuspenseQuery } from "@tanstack/react-query";
import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import {
  AddCircleOutline,
  EditOutlined,
  RemoveCircleOutline,
  ArrowForwardOutlined,
} from "@mui/icons-material";
import { privacyLawQueries } from "@/entities/privacy-law";
import type { ArticleChange } from "@/entities/privacy-law";

interface Props {
  diffId: string;
}

const CHANGE_CONFIG = {
  ADDED: {
    color: "success" as const,
    icon: <AddCircleOutline fontSize="small" />,
    label: "신설",
    bg: "success.50",
  },
  MODIFIED: {
    color: "warning" as const,
    icon: <EditOutlined fontSize="small" />,
    label: "변경",
    bg: "warning.50",
  },
  DELETED: {
    color: "error" as const,
    icon: <RemoveCircleOutline fontSize="small" />,
    label: "삭제",
    bg: "error.50",
  },
};

const ChangeCard = ({ change }: { change: ArticleChange }) => {
  const config = CHANGE_CONFIG[change.changeType];

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
        <Chip
          label={change.articleNo}
          size="small"
          color="primary"
          sx={{ fontWeight: 600 }}
        />
        <Chip
          icon={config.icon}
          label={config.label}
          size="small"
          color={config.color}
          variant="outlined"
        />
      </Stack>

      {change.changeType === "MODIFIED" && (
        <Stack spacing={1}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: "error.50",
              borderLeft: 3,
              borderColor: "error.main",
            }}
          >
            <Typography variant="caption" color="error.main" fontWeight={600}>
              변경 전
            </Typography>
            <Typography
              variant="body2"
              sx={{ whiteSpace: "pre-wrap", mt: 0.5 }}
            >
              {change.before}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: "success.50",
              borderLeft: 3,
              borderColor: "success.main",
            }}
          >
            <Typography variant="caption" color="success.main" fontWeight={600}>
              변경 후
            </Typography>
            <Typography
              variant="body2"
              sx={{ whiteSpace: "pre-wrap", mt: 0.5 }}
            >
              {change.after}
            </Typography>
          </Box>
        </Stack>
      )}

      {change.changeType === "ADDED" && change.after && (
        <Box
          sx={{
            p: 1.5,
            borderRadius: 1,
            bgcolor: "success.50",
            borderLeft: 3,
            borderColor: "success.main",
          }}
        >
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            {change.after}
          </Typography>
        </Box>
      )}

      {change.changeType === "DELETED" && change.before && (
        <Box
          sx={{
            p: 1.5,
            borderRadius: 1,
            bgcolor: "error.50",
            borderLeft: 3,
            borderColor: "error.main",
            textDecoration: "line-through",
          }}
        >
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            {change.before}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export const LawDiffViewer = ({ diffId }: Props) => {
  const { data } = useSuspenseQuery(privacyLawQueries.diff(diffId));
  const diff = data.items;

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <Typography variant="h6">{diff.fromProclamationDate}</Typography>
        <ArrowForwardOutlined sx={{ color: "text.secondary" }} />
        <Typography variant="h6">{diff.toProclamationDate}</Typography>
        <Chip
          label={`${diff.changes.length}건 변경`}
          size="small"
          color="primary"
          variant="outlined"
        />
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={2}>
        {diff.changes.map((change, i) => (
          <ChangeCard key={`${change.articleNo}-${i}`} change={change} />
        ))}
      </Stack>
    </Box>
  );
};
