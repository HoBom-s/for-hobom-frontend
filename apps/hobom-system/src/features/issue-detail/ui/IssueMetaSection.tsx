import { useCallback, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { useProjectContext, usePopoverState } from "@/shared/model";
import {
  ISSUE_KIND_LABEL,
  ISSUE_PRIORITY_LABEL,
  ISSUE_PRIORITY_REGISTRY,
  ParentIssueAutocomplete,
} from "@/entities/issue";
import { getStatusName, getStatusColor } from "@/entities/project";
import {
  projectLabelQueries,
  ProjectLabelPicker,
} from "@/entities/project-label";
import { useIssueDetailContext } from "../model/useIssueDetailContext";

const MetaRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ display: "flex", alignItems: "center", py: 0.5 }}>
    <Typography
      variant="body2"
      sx={{ width: 100, color: "text.secondary", fontSize: 13, flexShrink: 0 }}
    >
      {label}
    </Typography>
    <Box sx={{ flex: 1 }}>{children}</Box>
  </Box>
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
      <Typography
        variant="body2"
        onClick={() => setEditing(true)}
        sx={{
          fontSize: 13,
          cursor: "pointer",
          color: value != null ? "text.primary" : "text.disabled",
          "&:hover": { color: "primary.main" },
        }}
      >
        {value != null ? value : "-"}
      </Typography>
    );
  }

  return (
    <TextField
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
  const { data: labelData } = useQuery(
    projectLabelQueries.listByProject(projectId),
  );
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
      <MetaRow label="상태">
        <Chip
          label={getStatusName(statuses, issue.status)}
          size="small"
          onClick={statusMenu.open}
          sx={{
            height: 22,
            fontSize: 11,
            fontWeight: 600,
            bgcolor: `${statusColor}18`,
            color: statusColor,
            cursor: "pointer",
            "&:hover": {
              bgcolor: `${statusColor}28`,
            },
          }}
        />
      </MetaRow>
      <MetaRow label="우선순위">
        <Chip
          label={ISSUE_PRIORITY_LABEL[issue.priority]}
          size="small"
          onClick={priorityMenu.open}
          sx={{
            height: 22,
            fontSize: 11,
            fontWeight: 500,
            bgcolor: `${ISSUE_PRIORITY_REGISTRY[issue.priority].color}18`,
            color: ISSUE_PRIORITY_REGISTRY[issue.priority].color,
            cursor: "pointer",
            "&:hover": {
              bgcolor: `${ISSUE_PRIORITY_REGISTRY[issue.priority].color}28`,
            },
          }}
        />
      </MetaRow>
      <MetaRow label="유형">
        <Typography variant="body2" sx={{ fontSize: 13 }}>
          {ISSUE_KIND_LABEL[issue.type]}
        </Typography>
      </MetaRow>
      <MetaRow label="담당자">
        {(() => {
          const assigneeName = issue.assignee
            ? (projectMembers.find((m) => m.userId === issue.assignee)
                ?.nickname ?? issue.assignee)
            : null;

          return (
            <Chip
              label={assigneeName ?? "미할당"}
              size="small"
              role="button"
              aria-label={`담당자: ${assigneeName ?? "미할당"}. 클릭하여 변경`}
              aria-haspopup="listbox"
              avatar={
                assigneeName ? (
                  <Avatar
                    alt={assigneeName}
                    sx={{
                      width: 22,
                      height: 22,
                      fontSize: 10,
                      fontWeight: 700,
                      bgcolor: "action.selected",
                      color: "text.secondary",
                    }}
                  >
                    {assigneeName.charAt(0).toUpperCase()}
                  </Avatar>
                ) : undefined
              }
              onClick={assigneeMenu.open}
              sx={{
                height: 22,
                fontSize: 11,
                fontWeight: 500,
                cursor: "pointer",
                color: issue.assignee ? "text.primary" : "text.disabled",
                "&:hover": { bgcolor: "action.hover" },
              }}
            />
          );
        })()}
      </MetaRow>
      <MetaRow label="라벨">
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {issue.labels.map((labelId) => {
            const label = labelMap.get(labelId);

            if (!label) return null;

            return (
              <Chip
                key={label.id}
                label={label.name}
                size="small"
                onClick={labelPopover.open}
                sx={{
                  height: 22,
                  fontSize: 11,
                  fontWeight: 500,
                  bgcolor: `${label.color}18`,
                  color: label.color,
                  cursor: "pointer",
                  "&:hover": { bgcolor: `${label.color}28` },
                }}
              />
            );
          })}
          <Chip
            icon={<AddOutlined sx={{ fontSize: 14 }} />}
            label="추가"
            size="small"
            variant="outlined"
            onClick={labelPopover.open}
            sx={{
              height: 22,
              fontSize: 11,
              cursor: "pointer",
              borderStyle: "dashed",
            }}
          />
        </Box>
        <ProjectLabelPicker
          anchorEl={labelPopover.anchor}
          onClose={labelPopover.close}
          projectId={projectId}
          selectedIds={selectedIds}
          onToggle={handleToggle}
        />
      </MetaRow>
      <MetaRow label="스프린트">
        <FormControl size="small" fullWidth>
          <Select
            value={issue.sprint ?? ""}
            displayEmpty
            onChange={(e) =>
              updateField({ sprint: e.target.value || undefined })
            }
            sx={{ fontSize: 13, "& .MuiSelect-select": { py: 0.75 } }}
          >
            <MenuItem value="" sx={{ fontSize: 13 }}>
              <Typography
                variant="body2"
                sx={{ fontSize: 13, color: "text.disabled" }}
              >
                없음
              </Typography>
            </MenuItem>
            {activeSprints.map((s) => (
              <MenuItem key={s.id} value={s.id} sx={{ fontSize: 13 }}>
                {s.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </MetaRow>
      <MetaRow label="스토리 포인트">
        <StoryPointsInput
          value={issue.storyPoints}
          onChange={(sp) => updateField({ storyPoints: sp })}
        />
      </MetaRow>
      {issue.dueDate && (
        <MetaRow label="마감일">
          <Typography variant="body2" sx={{ fontSize: 13 }}>
            {issue.dueDate}
          </Typography>
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
    </Box>
  );
};
