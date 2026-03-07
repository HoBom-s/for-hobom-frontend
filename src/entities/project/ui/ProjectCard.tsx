import {
  Card,
  CardActionArea,
  CardContent,
  Avatar,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import { PeopleOutline } from "@mui/icons-material";
import type { ProjectType } from "../api/project.type";

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
  project: ProjectType;
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const color = getProjectColor(project.key);

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        transition: "box-shadow 0.15s",
        "&:hover": { boxShadow: 3 },
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 1.5,
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

          {project.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1.5,
                fontSize: 12,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {project.description}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Chip
              icon={<PeopleOutline sx={{ fontSize: 14 }} />}
              label={`${project.members.length}명`}
              size="small"
              sx={{
                height: 22,
                fontSize: 11,
                fontWeight: 500,
                bgcolor: "action.selected",
                "& .MuiChip-icon": { ml: 0.5 },
              }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
