import { Suspense } from "react";
import { useSuspenseQuery } from "hobom-data";
import { projectQueries } from "@/entities/project";
import { Hb } from "@/shared/ui";
import { GeneralSettingsSection } from "./GeneralSettingsSection";
import { MemberSettingsSection } from "./MemberSettingsSection";
import { BoardSettingsSection } from "./BoardSettingsSection";
import { DangerZoneSection } from "./DangerZoneSection";

const SuspenseFallback = () => (
  <Hb.Box
    style={{
      display: "flex",
      justifyContent: "center",
      paddingTop: 32,
      paddingBottom: 32,
    }}
  >
    <Hb.Progress.Circular size={24} />
  </Hb.Box>
);

interface ProjectSettingsProps {
  projectId: string;
}

export const ProjectSettings = ({ projectId }: ProjectSettingsProps) => {
  const { data } = useSuspenseQuery(projectQueries.detail(projectId));
  const project = data.items;

  return (
    <Hb.Box style={{ maxWidth: 1080, marginLeft: "auto", marginRight: "auto" }}>
      {/* 헤더 */}
      <Hb.Box
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <Hb.Avatar
          style={{
            width: 48,
            height: 48,
            backgroundColor: "var(--hb-color-accent)",
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          {project.key.charAt(0)}
        </Hb.Avatar>
        <Hb.Box>
          <Hb.Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Hb.Text variant="h6" fontWeight={700}>
              {project.name}
            </Hb.Text>
            <Hb.Chip
              label={project.key}
              size="small"
              style={{
                height: 22,
                fontSize: 11,
                fontWeight: 700,
                backgroundColor: "rgba(var(--mui-palette-primary-mainChannel) / 0.1)",
                color: "var(--hb-color-accent)",
              }}
            />
          </Hb.Box>
          <Hb.Text variant="body2" color="text.secondary">
            프로젝트 설정을 관리할 수 있어요.
          </Hb.Text>
        </Hb.Box>
      </Hb.Box>
      {/* 2-column 레이아웃 */}
      <Hb.Box
        style={{
          display: "flex",
          gap: 24,
          alignItems: "flex-start",
        }}
      >
        {/* 좌측: 일반 + 위험 구역 */}
        <Hb.Box
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            minWidth: 0,
          }}
        >
          <GeneralSettingsSection projectId={projectId} />
          <DangerZoneSection projectId={projectId} />
        </Hb.Box>

        {/* 우측: 보드 + 멤버 */}
        <Hb.Box
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            minWidth: 0,
          }}
        >
          <Suspense fallback={<SuspenseFallback />}>
            <BoardSettingsSection projectId={projectId} />
          </Suspense>
          <MemberSettingsSection projectId={projectId} />
        </Hb.Box>
      </Hb.Box>
    </Hb.Box>
  );
};
