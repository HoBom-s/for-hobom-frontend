import { useState } from "react";
import {
  ExpandMore,
  ExpandLess,
  PlayArrowOutlined,
  CheckCircleOutline,
} from "hobom-design-system/icons";
import * as stylex from "@stylexjs/stylex";
import { getDescendantProgress, type IssueType } from "@/entities/issue";
import { SPRINT_STATUS_LABEL, type SprintType } from "@/entities/sprint";
import { Hb } from "@/shared/ui";
import { useBacklogContext } from "../model/useBacklogContext";
import { useCollapsibleTree } from "../model/useCollapsibleTree";
import { useSprintActions } from "../model/useSprintActions";
import { STATUS_COLOR } from "./backlog-constants";
import { IssueRow } from "./IssueRow";

const styles = stylex.create({
  headerActiveHover: {
    ":hover": { backgroundColor: "rgba(var(--mui-palette-primary-mainChannel) / 0.1)" },
  },
  headerHover: {
    ":hover": { backgroundColor: "var(--hb-color-border)" },
  },
  startButton: {
    fontSize: 11,
    textTransform: "none",
    boxShadow: "none",
    borderRadius: 12,
    paddingTop: 2.4,
    paddingBottom: 2.4,
    paddingLeft: 12,
    paddingRight: 12,
    fontWeight: 600,
    ":hover": { boxShadow: "0 2px 8px rgba(0,0,0,0.18)" },
  },
});

export const SprintSection = ({ sprint, issues }: { sprint: SprintType; issues: IssueType[] }) => {
  const { projectId, doneStatusIds } = useBacklogContext();
  const { issueTree, flatTree, collapsedIds, toggleCollapse } = useCollapsibleTree(issues);
  const { handleStart, handleComplete } = useSprintActions(projectId, sprint);
  const [expanded, setExpanded] = useState(true);

  return (
    <Hb.Paper
      variant="outlined"
      style={{
        borderRadius: 20,
        overflow: "hidden",
        borderColor: sprint.status === "ACTIVE" ? "color-mix(in srgb, var(--hb-color-accent) 25%, transparent)" : "var(--hb-color-border)",
      }}
    >
      <Hb.Box
        {...stylex.props(
          sprint.status === "ACTIVE" ? styles.headerActiveHover : styles.headerHover,
        )}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 9.6,
          paddingBottom: 9.6,
          backgroundColor:
            sprint.status === "ACTIVE"
              ? "rgba(var(--mui-palette-primary-mainChannel) / 0.06)"
              : "var(--hb-color-border)",
          cursor: "pointer",
          transition: "background 0.15s",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Hb.Button.Icon
          size="small"
          style={{
            padding: 0,
          }}
        >
          {expanded ? <ExpandMore sx={{ fontSize: 20 }} /> : <ExpandLess sx={{ fontSize: 20 }} />}
        </Hb.Button.Icon>
        <Hb.Text
          variant="subtitle2"
          fontWeight={700}
          style={{
            fontSize: 13,
          }}
        >
          {sprint.name}
        </Hb.Text>
        <Hb.Chip
          label={SPRINT_STATUS_LABEL[sprint.status]}
          size="small"
          style={{
            height: 20,
            fontSize: 10,
            fontWeight: 700,
            backgroundColor: `${STATUS_COLOR[sprint.status]}18`,
            color: STATUS_COLOR[sprint.status],
            letterSpacing: "0.02em",
          }}
        />
        <Hb.Text
          variant="caption"
          color="text.disabled"
          style={{
            fontSize: 11,
          }}
        >
          {issues.length}건
        </Hb.Text>
        <Hb.Box
          style={{
            flex: 1,
          }}
        />
        {sprint.status === "PLANNING" && (
          <Hb.Button
            size="small"
            variant="primary"
            startIcon={<PlayArrowOutlined sx={{ fontSize: 14 }} />}
            onClick={(e) => {
              e.stopPropagation();
              handleStart();
            }}
            {...stylex.props(styles.startButton)}
          >
            스프린트 시작
          </Hb.Button>
        )}
        {sprint.status === "ACTIVE" && (
          <Hb.Button
            size="small"
            variant="secondary"
            startIcon={<CheckCircleOutline sx={{ fontSize: 14 }} />}
            onClick={(e) => {
              e.stopPropagation();
              handleComplete();
            }}
            style={{
              fontSize: 11,
              textTransform: "none",
              borderRadius: 12,
              paddingTop: 2.4,
              paddingBottom: 2.4,
              paddingLeft: 12,
              paddingRight: 12,
              fontWeight: 600,
            }}
          >
            스프린트 완료
          </Hb.Button>
        )}
      </Hb.Box>
      <Hb.Collapse in={expanded}>
        {issues.length === 0 ? (
          <Hb.Box
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 24,
              paddingBottom: 24,
              textAlign: "center",
            }}
          >
            <Hb.Text
              variant="body2"
              color="text.disabled"
              style={{
                fontSize: 13,
              }}
            >
              스프린트에 이슈가 없어요
            </Hb.Text>
            <Hb.Text
              variant="caption"
              color="text.disabled"
              style={{
                fontSize: 11,
              }}
            >
              백로그 이슈의 ⋮ 메뉴에서 이 스프린트로 이동할 수 있어요
            </Hb.Text>
          </Hb.Box>
        ) : (
          flatTree.map(({ issue, depth, childCount }) => {
            const progress =
              childCount > 0
                ? getDescendantProgress(issue.id, issueTree.childrenMap, doneStatusIds)
                : undefined;

            return (
              <IssueRow
                key={issue.id}
                issue={issue}
                depth={depth}
                childCount={childCount}
                isCollapsed={collapsedIds.has(issue.id)}
                onToggleCollapse={toggleCollapse}
                progress={progress}
              />
            );
          })
        )}
      </Hb.Collapse>
    </Hb.Paper>
  );
};
