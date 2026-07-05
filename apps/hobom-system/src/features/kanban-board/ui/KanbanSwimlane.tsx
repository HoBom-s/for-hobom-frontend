import type { DescendantProgress } from "@/entities/issue";
import { Hb } from "@/shared/ui";

interface KanbanSwimlaneProps {
  epicKey: string | null;
  epicTitle: string;
  progress?: DescendantProgress;
  children: React.ReactNode;
}

export const KanbanSwimlane = ({ epicKey, epicTitle, progress, children }: KanbanSwimlaneProps) => (
  <Hb.Box sx={{ mb: 1.5 }}>
    <Hb.Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.75,
        mb: 0.75,
        px: 0.5,
      }}
    >
      <Hb.Text
        variant="caption"
        sx={{
          fontWeight: 700,
          fontSize: 10,
          color: epicKey ? "#7c3aed" : "text.disabled",
          textTransform: "uppercase",
        }}
      >
        {epicKey ?? "에픽 없음"}
      </Hb.Text>
      <Hb.Text variant="caption" sx={{ fontSize: 10, color: "text.secondary" }} noWrap>
        {epicTitle}
      </Hb.Text>
      {progress && progress.total > 0 && (
        <Hb.Chip
          label={`${progress.completed}/${progress.total}`}
          size="small"
          style={{
            height: 16,
            fontSize: 9,
            fontWeight: 600,
            backgroundColor: progress.completed === progress.total ? "#e8f5e9" : "#fff3e0",
            color: progress.completed === progress.total ? "#2ca87f" : "#e58a00",
          }}
        />
      )}
    </Hb.Box>
    <Hb.Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>{children}</Hb.Box>
  </Hb.Box>
);
