import { useSuspenseQuery } from "hobom-data";
import {
  AddCircleOutline,
  EditOutlined,
  RemoveCircleOutline,
  ArrowForwardOutlined,
} from "hobom-design-system/icons";
import { privacyLawQueries } from "@/entities/privacy-law";
import type { ArticleChange } from "@/entities/privacy-law";
import { Hb } from "@/shared/ui";

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
    <Hb.Paper variant="outlined" sx={{ p: 2 }}>
      <Hb.Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
        <Hb.Chip label={change.articleNo} size="small" color="primary" sx={{ fontWeight: 600 }} />
        <Hb.Chip
          icon={config.icon}
          label={config.label}
          size="small"
          color={config.color}
          variant="outlined"
        />
      </Hb.Stack>

      {change.changeType === "MODIFIED" && (
        <Hb.Stack spacing={1}>
          <Hb.Box
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: "error.50",
              borderLeft: 3,
              borderColor: "error.main",
            }}
          >
            <Hb.Text variant="caption" color="error.main" fontWeight={600}>
              변경 전
            </Hb.Text>
            <Hb.Text variant="body2" sx={{ whiteSpace: "pre-wrap", mt: 0.5 }}>
              {change.before}
            </Hb.Text>
          </Hb.Box>
          <Hb.Box
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: "success.50",
              borderLeft: 3,
              borderColor: "success.main",
            }}
          >
            <Hb.Text variant="caption" color="success.main" fontWeight={600}>
              변경 후
            </Hb.Text>
            <Hb.Text variant="body2" sx={{ whiteSpace: "pre-wrap", mt: 0.5 }}>
              {change.after}
            </Hb.Text>
          </Hb.Box>
        </Hb.Stack>
      )}

      {change.changeType === "ADDED" && change.after && (
        <Hb.Box
          sx={{
            p: 1.5,
            borderRadius: 1,
            bgcolor: "success.50",
            borderLeft: 3,
            borderColor: "success.main",
          }}
        >
          <Hb.Text variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            {change.after}
          </Hb.Text>
        </Hb.Box>
      )}

      {change.changeType === "DELETED" && change.before && (
        <Hb.Box
          sx={{
            p: 1.5,
            borderRadius: 1,
            bgcolor: "error.50",
            borderLeft: 3,
            borderColor: "error.main",
            textDecoration: "line-through",
          }}
        >
          <Hb.Text variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            {change.before}
          </Hb.Text>
        </Hb.Box>
      )}
    </Hb.Paper>
  );
};

export const LawDiffViewer = ({ diffId }: Props) => {
  const { data } = useSuspenseQuery(privacyLawQueries.diff(diffId));
  const diff = data.items;

  return (
    <Hb.Box>
      <Hb.Stack direction="row" alignItems="center" spacing={1} mb={3}>
        <Hb.Text variant="h6">{diff.fromProclamationDate}</Hb.Text>
        <ArrowForwardOutlined sx={{ color: "text.secondary" }} />
        <Hb.Text variant="h6">{diff.toProclamationDate}</Hb.Text>
        <Hb.Chip
          label={`${diff.changes.length}건 변경`}
          size="small"
          color="primary"
          variant="outlined"
        />
      </Hb.Stack>
      <Hb.Divider
        style={{
          marginBottom: 16,
        }}
      />
      <Hb.Stack spacing={2}>
        {diff.changes.map((change, i) => (
          <ChangeCard key={`${change.articleNo}-${i}`} change={change} />
        ))}
      </Hb.Stack>
    </Hb.Box>
  );
};
