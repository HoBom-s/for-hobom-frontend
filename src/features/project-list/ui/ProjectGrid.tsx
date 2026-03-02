import { Box, Typography } from "@mui/material";
import { FolderOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ProjectCard, type ProjectSummaryType } from "@/entities/project";

interface ProjectGridProps {
  projects: ProjectSummaryType[];
}

export const ProjectGrid = ({ projects }: ProjectGridProps) => {
  const navigate = useNavigate();

  if (projects.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 280,
          gap: 1.5,
        }}
      >
        <FolderOutlined
          sx={{ fontSize: 96, color: "#dadce0", strokeWidth: 0.5 }}
        />
        <Typography
          variant="body1"
          sx={{ color: "text.disabled", fontSize: "1rem", fontWeight: 400 }}
        >
          프로젝트가 없어요. 새 프로젝트를 만들어 보세요.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 2,
      }}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id.value}
          project={project}
          onClick={() => navigate(`/projects/${project.id.value}/board`)}
        />
      ))}
    </Box>
  );
};
