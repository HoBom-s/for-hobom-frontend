import { Box, Chip, Divider, Typography } from "@mui/material";
import { SubdirectoryArrowRightOutlined } from "@mui/icons-material";
import {
  ISSUE_KIND_LABEL,
  ISSUE_KIND_REGISTRY,
  ISSUE_STATUS_CATEGORY_LABEL,
  ISSUE_STATUS_CATEGORY_REGISTRY,
  type IssueType,
} from "@/entities/issue";
import type { DescendantProgress } from "@/entities/issue";

interface IssueChildrenSectionProps {
  childIssues: IssueType[];
  progress: DescendantProgress | null;
  onNavigateToIssue?: (issueId: string) => void;
}

export const IssueChildrenSection = ({
  childIssues,
  progress,
  onNavigateToIssue,
}: IssueChildrenSectionProps) => {
  if (childIssues.length === 0) return null;

  return (
    <>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Typography variant="subtitle2" fontWeight={600} sx={{ fontSize: 13 }}>
          하위 이슈 ({childIssues.length})
        </Typography>
        {progress && progress.total > 0 && (
          <Chip
            label={`${progress.completed}/${progress.total} 완료`}
            size="small"
            sx={{
              height: 18,
              fontSize: 10,
              fontWeight: 600,
              bgcolor:
                progress.completed === progress.total ? "#e8f5e9" : "#fff3e0",
              color:
                progress.completed === progress.total ? "#2ca87f" : "#e58a00",
            }}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {childIssues.map((child) => (
          <Box
            key={child.id}
            role={onNavigateToIssue ? "button" : undefined}
            tabIndex={onNavigateToIssue ? 0 : undefined}
            aria-label={
              onNavigateToIssue ? `${child.issueKey} ${child.title}` : undefined
            }
            onClick={() => onNavigateToIssue?.(child.id)}
            onKeyDown={
              onNavigateToIssue
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onNavigateToIssue(child.id);
                    }
                  }
                : undefined
            }
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 0.8,
              borderRadius: 1.5,
              cursor: onNavigateToIssue ? "pointer" : "default",
              "&:hover": onNavigateToIssue ? { bgcolor: "#f8f9fb" } : undefined,
              transition: "background 0.1s",
            }}
          >
            <SubdirectoryArrowRightOutlined
              aria-hidden="true"
              sx={{ fontSize: 14, color: "text.disabled" }}
            />
            <Chip
              label={ISSUE_KIND_LABEL[child.type]}
              size="small"
              sx={{
                height: 20,
                fontSize: 10,
                fontWeight: 700,
                bgcolor: `${ISSUE_KIND_REGISTRY[child.type].color}18`,
                color: ISSUE_KIND_REGISTRY[child.type].color,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: "text.disabled",
                fontWeight: 600,
                fontSize: 12,
              }}
            >
              {child.issueKey}
            </Typography>
            <Typography variant="body2" sx={{ flex: 1, fontSize: 13 }} noWrap>
              {child.title}
            </Typography>
            <Chip
              label={ISSUE_STATUS_CATEGORY_LABEL[child.statusCategory]}
              size="small"
              sx={{
                height: 20,
                fontSize: 10,
                fontWeight: 600,
                bgcolor: `${ISSUE_STATUS_CATEGORY_REGISTRY[child.statusCategory].color}18`,
                color:
                  ISSUE_STATUS_CATEGORY_REGISTRY[child.statusCategory].color,
              }}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};
