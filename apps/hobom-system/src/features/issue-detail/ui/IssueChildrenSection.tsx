import * as stylex from "@stylexjs/stylex";
import { SubdirectoryArrowRightOutlined } from "hobom-design-system/icons";
import { ISSUE_KIND_LABEL } from "@/entities/issue";
import { ISSUE_KIND_REGISTRY } from "@/entities/issue/ui";
import { getStatusName, getStatusColor, useProjectContext } from "@/entities/project";
import { Hb } from "@/shared/ui";
import { useIssueDetailContext } from "../model/useIssueDetailContext";

const styles = stylex.create({
  childRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6.4,
    paddingBottom: 6.4,
    borderRadius: 12,
    transition: "background 0.1s",
  },
  childRowHover: {
    ":hover": { backgroundColor: "var(--hb-color-border)" },
  },
});

export const IssueChildrenSection = () => {
  const { childIssues, progress, onNavigateToIssue } = useIssueDetailContext();
  const { statuses } = useProjectContext();

  if (childIssues.length === 0) return null;

  return (
    <>
      <Hb.Divider
        style={{
          marginTop: 16,
          marginBottom: 16,
        }}
      />
      <Hb.Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <Hb.Text
          variant="subtitle2"
          fontWeight={600}
          style={{
            fontSize: 13,
          }}
        >
          하위 이슈 ({childIssues.length})
        </Hb.Text>
        {progress && progress.total > 0 && (
          <Hb.Chip
            label={`${progress.completed}/${progress.total} 완료`}
            size="small"
            style={{
              height: 18,
              fontSize: 10,
              fontWeight: 600,
              backgroundColor: progress.completed === progress.total ? "#e8f5e9" : "#fff3e0",
              color: progress.completed === progress.total ? "#2ca87f" : "#e58a00",
            }}
          />
        )}
      </Hb.Box>
      <Hb.Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
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
              {...stylex.props(styles.childRow, onNavigateToIssue && styles.childRowHover)}
              style={{ cursor: onNavigateToIssue ? "pointer" : "default" }}
            >
              <SubdirectoryArrowRightOutlined
                aria-hidden="true"
                sx={{ fontSize: 14, color: "text.disabled" }}
              />
              <Hb.Chip
                label={ISSUE_KIND_LABEL[child.type]}
                size="small"
                style={{
                  height: 20,
                  fontSize: 10,
                  fontWeight: 700,
                  backgroundColor: `${ISSUE_KIND_REGISTRY[child.type].color}18`,
                  color: ISSUE_KIND_REGISTRY[child.type].color,
                }}
              />
              <Hb.Text
                variant="caption"
                style={{
                  color: "var(--hb-color-text-disabled)",
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                {child.issueKey}
              </Hb.Text>
              <Hb.Text
                variant="body2"
                style={{
                  flex: 1,
                  fontSize: 13,
                }}
                noWrap
              >
                {child.title}
              </Hb.Text>
              <Hb.Chip
                label={getStatusName(statuses, child.status)}
                size="small"
                style={{
                  height: 20,
                  fontSize: 10,
                  fontWeight: 600,
                  backgroundColor: `${statusColor}18`,
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
