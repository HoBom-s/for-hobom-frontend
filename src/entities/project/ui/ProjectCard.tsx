import {
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  Box,
  Typography,
  LinearProgress,
} from "@mui/material";
import type { ProjectSummaryType } from "../api/project.type";

const PROJECT_COLORS = [
  "#4680ff",
  "#2ca87f",
  "#7c3aed",
  "#e58a00",
  "#dc2626",
  "#0891b2",
];

const getProjectColor = (key: string) => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PROJECT_COLORS[Math.abs(hash) % PROJECT_COLORS.length];
};

interface ProjectCardProps {
  project: ProjectSummaryType;
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const color = getProjectColor(project.key);

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "grey.200",
        transition: "all 0.2s",
        "&:hover": {
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          borderColor: "grey.300",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: color,
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 1.5,
              }}
              variant="rounded"
            >
              {project.key.slice(0, 2)}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" fontWeight={600} noWrap>
                {project.name}
              </Typography>
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ fontSize: 11 }}
              >
                {project.key}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.5,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: 11 }}
              >
                이슈 진행률
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: 11, fontWeight: 600 }}
              >
                {project.issueCount}건
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={project.issueCount > 0 ? 35 : 0}
              sx={{
                height: 4,
                borderRadius: 2,
                bgcolor: "grey.100",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 2,
                  bgcolor: color,
                },
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ fontSize: 11 }}
              >
                스프린트 {project.sprintCount}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Avatar
                sx={{
                  width: 18,
                  height: 18,
                  fontSize: 9,
                  fontWeight: 700,
                  bgcolor: "#e8eaed",
                  color: "#5f6368",
                }}
              >
                {project.lead.name.charAt(0)}
              </Avatar>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: 11 }}
              >
                {project.lead.name}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
