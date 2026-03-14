import { SubdirectoryArrowRightOutlined } from "hobom-design-system/icons";
import { ISSUE_KIND_LABEL, ISSUE_KIND_REGISTRY } from "@/entities/issue";
import { getStatusName, getStatusColor } from "@/entities/project";
import { useProjectContext } from "@/shared/model";
import { Hb } from "@/shared/ui";
import { useIssueDetailContext } from "../model/useIssueDetailContext";

export const IssueChildrenSection = () => {
  const { childIssues, progress, onNavigateToIssue } = useIssueDetailContext();
  const { statuses } = useProjectContext();

  if (childIssues.length === 0) return null;

  return (
    <>
      <Hb.Divider sx={{ my: 2 }} />
      <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <Hb.Text variant="subtitle2" fontWeight={600} sx={{ fontSize: 13 }}>
          하위 이슈 ({childIssues.length})
        </Hb.Text>
        {progress && progress.total > 0 && (
          <Hb.Chip
            label={`${progress.completed}/${progress.total} 완료`}
            size="small"
            sx={{
              height: 18,
              fontSize: 10,
              fontWeight: 600,
              bgcolor: progress.completed === progress.total ? "#e8f5e9" : "#fff3e0",
              color: progress.completed === progress.total ? "#2ca87f" : "#e58a00",
            }}
          />
        )}
      </Hb.Box>
      <Hb.Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {childIssues.map((child) => {
          const statusColor = getStatusColor(statuses, child.status);

          return (
            <Hb.Box
              key={child.id}
              role={onNavigateToIssue ? "button" : undefined}
              tabIndex={onNavigateToIssue ? 0 : undefined}
              aria-label={onNavigateToIssue ? `${child.issueKey} ${child.title}` : undefined}
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
                "&:hover": onNavigateToIssue ? { bgcolor: "action.hover" } : undefined,
                transition: "background 0.1s",
              }}
            >
              <SubdirectoryArrowRightOutlined
                aria-hidden="true"
                sx={{ fontSize: 14, color: "text.disabled" }}
              />
              <Hb.Chip
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
              <Hb.Text
                variant="caption"
                sx={{
                  color: "text.disabled",
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                {child.issueKey}
              </Hb.Text>
              <Hb.Text variant="body2" sx={{ flex: 1, fontSize: 13 }} noWrap>
                {child.title}
              </Hb.Text>
              <Hb.Chip
                label={getStatusName(statuses, child.status)}
                size="small"
                sx={{
                  height: 20,
                  fontSize: 10,
                  fontWeight: 600,
                  bgcolor: `${statusColor}18`,
                  color: statusColor,
                }}
              />
            </Hb.Box>
          );
        })}
      </Hb.Box>
    </>
  );
};
