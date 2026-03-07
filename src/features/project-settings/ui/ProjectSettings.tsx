import { Suspense } from "react";
import { Avatar, Box, Chip, CircularProgress, Typography } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { projectQueries } from "@/entities/project";
import { GeneralSettingsSection } from "./GeneralSettingsSection";
import { MemberSettingsSection } from "./MemberSettingsSection";
import { BoardSettingsSection } from "./BoardSettingsSection";
import { DangerZoneSection } from "./DangerZoneSection";

const SuspenseFallback = () => (
  <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
    <CircularProgress size={24} />
  </Box>
);

interface ProjectSettingsProps {
  projectId: string;
}

export const ProjectSettings = ({ projectId }: ProjectSettingsProps) => {
  const { data } = useSuspenseQuery(projectQueries.detail(projectId));
  const project = data.items;

  return (
    <Box sx={{ maxWidth: 1080, mx: "auto" }}>
      {/* 헤더 */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: "#4680ff",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          {project.key.charAt(0)}
        </Avatar>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h6" fontWeight={700}>
              {project.name}
            </Typography>
            <Chip
              label={project.key}
              size="small"
              sx={{
                height: 22,
                fontSize: 11,
                fontWeight: 700,
                bgcolor: "#4680ff18",
                color: "#4680ff",
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            프로젝트 설정을 관리할 수 있어요.
          </Typography>
        </Box>
      </Box>

      {/* 2-column 레이아웃 */}
      <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
        {/* 좌측: 일반 + 위험 구역 */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            minWidth: 0,
          }}
        >
          <GeneralSettingsSection projectId={projectId} />
          <DangerZoneSection projectId={projectId} />
        </Box>

        {/* 우측: 보드 + 멤버 */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            minWidth: 0,
          }}
        >
          <Suspense fallback={<SuspenseFallback />}>
            <BoardSettingsSection projectId={projectId} />
          </Suspense>
          <MemberSettingsSection projectId={projectId} />
        </Box>
      </Box>
    </Box>
  );
};
