import { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { SettingsOutlined } from "@mui/icons-material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { projectQueries, useUpdateProject } from "@/entities/project";

interface GeneralSettingsSectionProps {
  projectId: string;
}

export const GeneralSettingsSection = ({
  projectId,
}: GeneralSettingsSectionProps) => {
  const { data } = useSuspenseQuery(projectQueries.detail(projectId));
  const project = data.items;

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description ?? "");
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

  const handleSave = () => {
    if (!name.trim()) return;
    updateProject({
      id: projectId,
      name: name.trim(),
      description: description || undefined,
    });
  };

  const isDirty =
    name.trim() !== project.name ||
    (description || undefined) !== (project.description || undefined);

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Box
        sx={{
          px: 3,
          py: 2,
          bgcolor: "action.hover",
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <SettingsOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
        <Typography variant="subtitle2" fontWeight={700}>
          일반
        </Typography>
      </Box>
      <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextField
          label="프로젝트 키"
          value={project.key}
          size="small"
          fullWidth
          disabled
          helperText="프로젝트 키는 변경할 수 없어요"
        />
        <TextField
          label="프로젝트 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="small"
          fullWidth
        />
        <TextField
          label="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          size="small"
          fullWidth
          multiline
          rows={3}
          placeholder="프로젝트에 대한 간단한 설명을 입력하세요"
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!isDirty || !name.trim()}
            loading={isUpdating}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "none",
              borderRadius: 2,
              px: 3,
            }}
          >
            변경사항 저장
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
