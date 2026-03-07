import { useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { useProjectContext } from "@/shared/model";
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
  } = useIssueDetailContext();
  const { statuses } = useProjectContext();

  const [labelAnchor, setLabelAnchor] = useState<HTMLElement | null>(null);
  const { data: labelData } = useQuery(
    projectLabelQueries.listByProject(projectId),
  );
  const allLabels = labelData?.items ?? [];
  const labelMap = new Map(allLabels.map((l) => [l.id, l]));
  const selectedIds = new Set(issue.labels);

  const handleToggle = (labelId: string) => {
    const next = selectedIds.has(labelId)
      ? issue.labels.filter((id) => id !== labelId)
      : [...issue.labels, labelId];
    updateField({ labels: next });
  };

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
        {issue.assignee ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                width: 22,
                height: 22,
                fontSize: 10,
                fontWeight: 700,
                bgcolor: "#e8eaed",
                color: "#5f6368",
              }}
            >
              {issue.assignee.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2" sx={{ fontSize: 13 }}>
              {issue.assignee}
            </Typography>
          </Box>
        ) : (
          <Typography
            variant="body2"
            sx={{ fontSize: 13, color: "text.disabled" }}
          >
            -
          </Typography>
        )}
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
                onClick={(e) => setLabelAnchor(e.currentTarget)}
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
            onClick={(e) => setLabelAnchor(e.currentTarget)}
            sx={{
              height: 22,
              fontSize: 11,
              cursor: "pointer",
              borderStyle: "dashed",
            }}
          />
        </Box>
        <ProjectLabelPicker
          anchorEl={labelAnchor}
          onClose={() => setLabelAnchor(null)}
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
      {issue.storyPoints != null && (
        <MetaRow label="스토리 포인트">
          <Typography variant="body2" sx={{ fontSize: 13 }}>
            {issue.storyPoints}
          </Typography>
        </MetaRow>
      )}
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
