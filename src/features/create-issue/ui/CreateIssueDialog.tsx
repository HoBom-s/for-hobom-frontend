import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import {
  ISSUE_KIND_LABEL,
  ISSUE_PRIORITY_LABEL,
  issueQueries,
  useCreateIssue,
  type IssueKind,
  type IssuePriority,
  type IssueType,
} from "@/entities/issue";
import {
  projectLabelQueries,
  ProjectLabelPicker,
} from "@/entities/project-label";

const PARENT_ISSUE_KINDS: IssueKind[] = ["EPIC", "STORY"];

interface CreateIssueDialogProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  defaultParentId?: string;
}

export const CreateIssueDialog = ({
  open,
  onClose,
  projectId,
  defaultParentId,
}: CreateIssueDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [kind, setKind] = useState<IssueKind>("TASK");
  const [priority, setPriority] = useState<IssuePriority>("MEDIUM");
  const [parentIssue, setParentIssue] = useState<IssueType | null>(null);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [labelAnchor, setLabelAnchor] = useState<HTMLElement | null>(null);
  const { mutate, isPending } = useCreateIssue();

  const { data: issueData } = useQuery({
    ...issueQueries.listByProject(projectId),
    enabled: open,
  });

  const { data: labelData } = useQuery({
    ...projectLabelQueries.listByProject(projectId),
    enabled: open,
  });
  const allLabels = labelData?.items ?? [];
  const labelMap = new Map(allLabels.map((l) => [l.id, l]));

  const parentCandidates = (issueData?.items ?? []).filter((i) =>
    PARENT_ISSUE_KINDS.includes(i.type),
  );

  useEffect(() => {
    if (!open || !defaultParentId || !issueData) return;
    const items = issueData.items ?? [];
    const found = items.find(
      (i) => i.id === defaultParentId && PARENT_ISSUE_KINDS.includes(i.type),
    );
    if (found) setParentIssue(found);
  }, [open, defaultParentId, issueData]);

  const reset = () => {
    setTitle("");
    setDescription("");
    setKind("TASK");
    setPriority("MEDIUM");
    setParentIssue(null);
    setSelectedLabels([]);
  };

  const handleSubmit = () => {
    if (!title.trim()) return;
    mutate(
      {
        projectId,
        title: title.trim(),
        description: description || undefined,
        type: kind,
        priority,
        parent: parentIssue?.id,
        labels: selectedLabels.length > 0 ? selectedLabels : undefined,
      },
      {
        onSuccess: () => {
          onClose();
          reset();
        },
      },
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {defaultParentId ? "하위 이슈 만들기" : "이슈 만들기"}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          size="small"
          sx={{ mt: 1 }}
        />
        <TextField
          label="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          size="small"
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>유형</InputLabel>
            <Select
              value={kind}
              label="유형"
              onChange={(e) => setKind(e.target.value as IssueKind)}
            >
              {Object.entries(ISSUE_KIND_LABEL).map(([k, label]) => (
                <MenuItem key={k} value={k}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>우선순위</InputLabel>
            <Select
              value={priority}
              label="우선순위"
              onChange={(e) => setPriority(e.target.value as IssuePriority)}
            >
              {Object.entries(ISSUE_PRIORITY_LABEL).map(([k, label]) => (
                <MenuItem key={k} value={k}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{ mb: 0.5, fontSize: 13, color: "text.secondary" }}
          >
            라벨
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {selectedLabels.map((labelId) => {
              const label = labelMap.get(labelId);
              if (!label) return null;
              return (
                <Chip
                  key={label.id}
                  label={label.name}
                  size="small"
                  onDelete={() =>
                    setSelectedLabels((prev) =>
                      prev.filter((id) => id !== labelId),
                    )
                  }
                  sx={{
                    height: 22,
                    fontSize: 11,
                    fontWeight: 500,
                    bgcolor: `${label.color}18`,
                    color: label.color,
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
            selectedIds={new Set(selectedLabels)}
            onToggle={(labelId) => {
              setSelectedLabels((prev) =>
                prev.includes(labelId)
                  ? prev.filter((id) => id !== labelId)
                  : [...prev, labelId],
              );
            }}
          />
        </Box>
        <Autocomplete
          size="small"
          options={parentCandidates}
          value={parentIssue}
          onChange={(_, value) => setParentIssue(value)}
          getOptionLabel={(option) => `${option.issueKey} ${option.title}`}
          groupBy={(option) => ISSUE_KIND_LABEL[option.type]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="상위 이슈 (선택)"
              placeholder="에픽 또는 스토리 검색"
            />
          )}
          noOptionsText="상위 이슈가 없어요"
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          취소
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!title.trim()}
          loading={isPending}
        >
          만들기
        </Button>
      </DialogActions>
    </Dialog>
  );
};
