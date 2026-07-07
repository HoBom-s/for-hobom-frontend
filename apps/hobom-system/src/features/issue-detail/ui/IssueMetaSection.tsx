import { useCallback, useMemo, useState } from "react";
import { AddOutlined } from "hobom-design-system/icons";
import { useQuery } from "hobom-data";
import * as stylex from "@stylexjs/stylex";
import { useProjectContext, usePopoverState } from "@/shared/model";
import { ISSUE_KIND_LABEL, ISSUE_PRIORITY_LABEL } from "@/entities/issue";
import { ISSUE_PRIORITY_REGISTRY, ParentIssueAutocomplete } from "@/entities/issue/ui";
import { getStatusName, getStatusColor } from "@/entities/project";
import { projectLabelQueries } from "@/entities/project-label";
import { ProjectLabelPicker } from "@/entities/project-label/ui";
import { Hb } from "@/shared/ui";
import { useIssueDetailContext } from "../model/useIssueDetailContext";

const styles = stylex.create({
  editable: {
    fontSize: 13,
    cursor: "pointer",
    ":hover": { color: "var(--hb-color-accent)" },
  },
  filled: { color: "var(--hb-color-text-primary)" },
  empty: { color: "var(--hb-color-text-disabled)" },
});

const MetaRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Hb.Box
    style={{
      display: "flex",
      alignItems: "center",
      paddingTop: 4,
      paddingBottom: 4,
    }}
  >
    <Hb.Text
      variant="body2"
      style={{
        width: 100,
        color: "var(--hb-color-text-secondary)",
        fontSize: 13,
        flexShrink: 0,
      }}
    >
      {label}
    </Hb.Text>
    <Hb.Box
      style={{
        flex: 1,
      }}
    >
      {children}
    </Hb.Box>
  </Hb.Box>
);

const StoryPointsInput = ({
  value,
  onChange,
}: {
  value?: number;
  onChange: (sp: number) => void;
}) => {
  const [draft, setDraft] = useState(value?.toString() ?? "");
  const [editing, setEditing] = useState(false);

  const commit = () => {
    setEditing(false);
    const parsed = Number(draft);

    if (draft === "" || isNaN(parsed) || parsed < 0) {
      setDraft(value?.toString() ?? "");

      return;
    }
    if (parsed !== value) onChange(parsed);
  };

  if (!editing) {
    return (
      <Hb.Text
        variant="body2"
        role="button"
        tabIndex={0}
        onClick={() => setEditing(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setEditing(true);
          }
        }}
        {...stylex.props(styles.editable, value != null ? styles.filled : styles.empty)}
      >
        {value != null ? value : "-"}
      </Hb.Text>
    );
  }

  return (
    <Hb.TextField
      autoFocus
      size="small"
      type="number"
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit();
        if (e.key === "Escape") {
          setDraft(value?.toString() ?? "");
          setEditing(false);
        }
      }}
      slotProps={{ htmlInput: { min: 0, step: 1 } }}
      sx={{
        width: 80,
        "& .MuiInputBase-input": { fontSize: 13, py: 0.5 },
      }}
    />
  );
};

export const IssueMetaSection = () => {
  const {
    issue,
    projectId,
    activeSprints,
    parentIssue,
    availableParents,
    updateField,
    statusMenu,
    priorityMenu,
    assigneeMenu,
    projectMembers,
  } = useIssueDetailContext();
  const { statuses } = useProjectContext();

  const labelPopover = usePopoverState();
  const { data: labelData } = useQuery(projectLabelQueries.listByProject(projectId));
  const labelMap = useMemo(
    () => new Map((labelData?.items ?? []).map((l) => [l.id, l])),
    [labelData?.items],
  );
  const selectedIds = useMemo(() => new Set(issue.labels), [issue.labels]);

  const handleToggle = useCallback(
    (labelId: string) => {
      const next = selectedIds.has(labelId)
        ? issue.labels.filter((id) => id !== labelId)
        : [...issue.labels, labelId];

      updateField({ labels: next });
    },
    [issue.labels, selectedIds, updateField],
  );

  const statusColor = getStatusColor(statuses, issue.status);

  return (
    <Hb.Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        marginBottom: 16,
      }}
    >
      <MetaRow label="상태">
        <Hb.Chip
          label={getStatusName(statuses, issue.status)}
          size="small"
          onClick={statusMenu.open}
          tone={statusColor}
          style={{ height: 22, fontSize: 11, fontWeight: 600 }}
        />
      </MetaRow>
      <MetaRow label="우선순위">
        <Hb.Chip
          label={ISSUE_PRIORITY_LABEL[issue.priority]}
          size="small"
          onClick={priorityMenu.open}
          tone={ISSUE_PRIORITY_REGISTRY[issue.priority].color}
          style={{ height: 22, fontSize: 11, fontWeight: 500 }}
        />
      </MetaRow>
      <MetaRow label="유형">
        <Hb.Text
          variant="body2"
          style={{
            fontSize: 13,
          }}
        >
          {ISSUE_KIND_LABEL[issue.type]}
        </Hb.Text>
      </MetaRow>
      <MetaRow label="담당자">
        {(() => {
          const assigneeName = issue.assignee
            ? (projectMembers.find((m) => m.userId === issue.assignee)?.nickname ?? issue.assignee)
            : null;

          return (
            <Hb.Chip
              label={assigneeName ?? "미할당"}
              size="small"
              role="button"
              aria-label={`담당자: ${assigneeName ?? "미할당"}. 클릭하여 변경`}
              aria-haspopup="listbox"
              avatar={
                assigneeName ? (
                  <Hb.Avatar
                    alt={assigneeName}
                    style={{
                      width: 22,
                      height: 22,
                      fontSize: 10,
                      fontWeight: 700,
                      backgroundColor: "var(--hb-color-border)",
                      color: "var(--hb-color-text-secondary)",
                    }}
                  >
                    {assigneeName.charAt(0).toUpperCase()}
                  </Hb.Avatar>
                ) : undefined
              }
              onClick={assigneeMenu.open}
              style={{
                height: 22,
                fontSize: 11,
                fontWeight: 500,
                color: issue.assignee
                  ? "var(--hb-color-text-primary)"
                  : "var(--hb-color-text-secondary)",
              }}
            />
          );
        })()}
      </MetaRow>
      <MetaRow label="라벨">
        <Hb.Box
          style={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {issue.labels.map((labelId) => {
            const label = labelMap.get(labelId);

            if (!label) return null;

            return (
              <Hb.Chip
                key={label.id}
                label={label.name}
                size="small"
                onClick={labelPopover.open}
                tone={label.color}
                style={{ height: 22, fontSize: 11, fontWeight: 500 }}
              />
            );
          })}
          <Hb.Chip
            icon={<AddOutlined sx={{ fontSize: 14 }} />}
            label="추가"
            size="small"
            variant="outlined"
            onClick={labelPopover.open}
            style={{
              height: 22,
              fontSize: 11,
              cursor: "pointer",
              borderStyle: "dashed",
            }}
          />
        </Hb.Box>
        <ProjectLabelPicker
          anchorEl={labelPopover.anchor}
          onClose={labelPopover.close}
          projectId={projectId}
          selectedIds={selectedIds}
          onToggle={handleToggle}
        />
      </MetaRow>
      <MetaRow label="스프린트">
        <Hb.Form.Control size="small" fullWidth>
          <Hb.Form.Select
            value={issue.sprint ?? ""}
            displayEmpty
            onChange={(e) => updateField({ sprint: e.target.value || undefined })}
            sx={{ fontSize: 13, "& .MuiSelect-select": { py: 0.75 } }}
          >
            <Hb.Menu.Item value="" sx={{ fontSize: 13 }}>
              <Hb.Text
                variant="body2"
                style={{
                  fontSize: 13,
                  color: "var(--hb-color-text-disabled)",
                }}
              >
                없음
              </Hb.Text>
            </Hb.Menu.Item>
            {activeSprints.map((s) => (
              <Hb.Menu.Item key={s.id} value={s.id} sx={{ fontSize: 13 }}>
                {s.name}
              </Hb.Menu.Item>
            ))}
          </Hb.Form.Select>
        </Hb.Form.Control>
      </MetaRow>
      <MetaRow label="스토리 포인트">
        <StoryPointsInput
          value={issue.storyPoints}
          onChange={(sp) => updateField({ storyPoints: sp })}
        />
      </MetaRow>
      {issue.dueDate && (
        <MetaRow label="마감일">
          <Hb.Text
            variant="body2"
            style={{
              fontSize: 13,
            }}
          >
            {issue.dueDate}
          </Hb.Text>
        </MetaRow>
      )}
      <MetaRow label="상위 이슈">
        <ParentIssueAutocomplete
          value={parentIssue ?? null}
          options={availableParents}
          onChange={(parent) => updateField({ parent: parent?.id ?? null })}
          label=""
          placeholder="상위 이슈 선택"
        />
      </MetaRow>
    </Hb.Box>
  );
};
