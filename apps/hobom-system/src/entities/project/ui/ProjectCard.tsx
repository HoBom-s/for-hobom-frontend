import * as stylex from "@stylexjs/stylex";
import { PeopleOutline } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";
import type { ProjectType } from "../api/project.type";

const styles = stylex.create({
  card: {
    borderRadius: 16,
    transition: "box-shadow 0.15s",
    // Elevation-2 card shadow on hover.
    ":hover": { boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)" },
  },
  content: {
    padding: 20,
    ":last-child": { paddingBottom: 20 },
  },
});

const PROJECT_COLORS = ["#4680ff", "#2ca87f", "#7c3aed", "#e58a00", "#dc2626", "#0891b2"];

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
    <Hb.Card.Clickable onClick={onClick} {...stylex.props(styles.card)}>
      <Hb.Card.Content {...stylex.props(styles.content)}>
        <Hb.Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <Hb.Avatar
            style={{
              width: 36,
              height: 36,
              backgroundColor: color,
              fontSize: 14,
              fontWeight: 700,
              borderRadius: 12,
            }}
            variant="rounded"
          >
            {project.key.slice(0, 2)}
          </Hb.Avatar>
          <Hb.Box
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Hb.Text variant="subtitle2" fontWeight={600} noWrap>
              {project.name}
            </Hb.Text>
            <Hb.Text
              variant="caption"
              color="text.disabled"
              style={{
                fontSize: 11,
              }}
            >
              {project.key}
            </Hb.Text>
          </Hb.Box>
        </Hb.Box>

        {project.description && (
          <Hb.Text
            variant="body2"
            color="text.secondary"
            style={{
              marginBottom: 12,
              fontSize: 12,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {project.description}
          </Hb.Text>
        )}

        <Hb.Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Hb.Chip
            icon={<PeopleOutline sx={{ fontSize: 14 }} />}
            label={`${project.members.length}명`}
            size="small"
            style={{
              height: 22,
              fontSize: 11,
              fontWeight: 500,
              backgroundColor: "var(--hb-color-border)",
            }}
          />
        </Hb.Box>
      </Hb.Card.Content>
    </Hb.Card.Clickable>
  );
};
