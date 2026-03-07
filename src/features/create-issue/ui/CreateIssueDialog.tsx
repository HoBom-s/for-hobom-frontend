import {
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
import {
  ISSUE_KIND_LABEL,
  ISSUE_PRIORITY_LABEL,
  ParentIssueAutocomplete,
  type IssueKind,
  type IssuePriority,
} from "@/entities/issue";
import { type SprintType } from "@/entities/sprint";
import { ProjectLabelPicker } from "@/entities/project-label";
import { useCreateIssueForm } from "../model/useCreateIssueForm";

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
  const {
    fields,
    labelAnchor,
    setLabelAnchor,
    handleSubmit,
    isPending,
    parentCandidates,
    activeSprints,
    labelMap,
  } = useCreateIssueForm({
    projectId,
    defaultParentId,
    enabled: open,
    onSuccess: onClose,
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {defaultParentId ? "하위 이슈 만들기" : "이슈 만들기"}
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="제목"
          value={fields.title}
          onChange={(e) => fields.setTitle(e.target.value)}
          fullWidth
          size="small"
          sx={{ mt: 1 }}
        />
        <TextField
          label="설명"
          value={fields.description}
          onChange={(e) => fields.setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          size="small"
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl size="small" sx={{ flex: 1 }}>
            <InputLabel>유형</InputLabel>
            <Select
              value={fields.kind}
              label="유형"
              onChange={(e) => fields.setKind(e.target.value as IssueKind)}
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
              value={fields.priority}
              label="우선순위"
              onChange={(e) =>
                fields.setPriority(e.target.value as IssuePriority)
              }
            >
              {Object.entries(ISSUE_PRIORITY_LABEL).map(([k, label]) => (
                <MenuItem key={k} value={k}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {activeSprints.length > 0 && (
          <FormControl size="small" fullWidth>
            <InputLabel>스프린트 (선택)</InputLabel>
            <Select
              value={fields.sprint}
              label="스프린트 (선택)"
              displayEmpty
              onChange={(e) => fields.setSprint(e.target.value)}
            >
              <MenuItem value="">없음</MenuItem>
              {activeSprints.map((s: SprintType) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
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
            {fields.selectedLabels.map((labelId) => {
              const label = labelMap.get(labelId);
              if (!label) return null;
              return (
                <Chip
                  key={label.id}
                  label={label.name}
                  size="small"
                  onDelete={() =>
                    fields.setSelectedLabels((prev) =>
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
            selectedIds={new Set(fields.selectedLabels)}
            onToggle={(labelId) => {
              fields.setSelectedLabels((prev) =>
                prev.includes(labelId)
                  ? prev.filter((id) => id !== labelId)
                  : [...prev, labelId],
              );
            }}
          />
        </Box>
        <ParentIssueAutocomplete
          value={fields.parentIssue}
          options={parentCandidates}
          onChange={fields.setParentIssue}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          취소
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!fields.title.trim()}
          loading={isPending}
        >
          만들기
        </Button>
      </DialogActions>
    </Dialog>
  );
};
