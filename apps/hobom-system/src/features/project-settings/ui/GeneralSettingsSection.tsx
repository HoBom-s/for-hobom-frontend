import { useState } from "react";
import { SettingsOutlined } from "hobom-design-system/icons";
import { useSuspenseQuery } from "hobom-data";
import { projectQueries, useUpdateProject } from "@/entities/project";
import { Hb } from "@/shared/ui";

interface GeneralSettingsSectionProps {
  projectId: string;
}

export const GeneralSettingsSection = ({ projectId }: GeneralSettingsSectionProps) => {
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
    <Hb.Paper
      variant="outlined"
      style={{
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <Hb.Box
        style={{
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
          paddingBottom: 16,
          backgroundColor: "var(--hb-color-border)",
          borderBottom: "1px solid",
          borderColor: "var(--hb-color-border)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <SettingsOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
        <Hb.Text variant="subtitle2" fontWeight={700}>
          일반
        </Hb.Text>
      </Hb.Box>
      <Hb.Box
        style={{
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <Hb.TextField
          label="프로젝트 키"
          value={project.key}
          size="small"
          fullWidth
          disabled
          helperText="프로젝트 키는 변경할 수 없어요"
        />
        <Hb.TextField
          label="프로젝트 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="small"
          fullWidth
        />
        <Hb.TextField
          label="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          size="small"
          fullWidth
          multiline
          rows={3}
          placeholder="프로젝트에 대한 간단한 설명을 입력하세요"
        />
        <Hb.Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Hb.Button
            variant="primary"
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
          </Hb.Button>
        </Hb.Box>
      </Hb.Box>
    </Hb.Paper>
  );
};
