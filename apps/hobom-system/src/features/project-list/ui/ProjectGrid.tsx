import { FolderOutlined } from "hobom-design-system/icons";
import { useNavigate } from "react-router";
import type { ProjectType } from "@/entities/project";
import { ProjectCard } from "@/entities/project/ui";
import { Hb } from "@/shared/ui";

interface ProjectGridProps {
  projects: ProjectType[];
}

export const ProjectGrid = ({ projects }: ProjectGridProps) => {
  const navigate = useNavigate();

  if (projects.length === 0) {
    return (
      <Hb.Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 280,
          gap: 12,
        }}
      >
        <FolderOutlined sx={{ fontSize: 96, color: "#dadce0", strokeWidth: 0.5 }} />
        <Hb.Text
          variant="body1"
          style={{
            color: "var(--hb-color-text-disabled)",
            fontSize: "1rem",
            fontWeight: 400,
          }}
        >
          프로젝트가 없어요. 새 프로젝트를 만들어 보세요.
        </Hb.Text>
      </Hb.Box>
    );
  }

  return (
    <Hb.Box
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 16,
      }}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={() => navigate(`/projects/${project.id}/board`)}
        />
      ))}
    </Hb.Box>
  );
};
