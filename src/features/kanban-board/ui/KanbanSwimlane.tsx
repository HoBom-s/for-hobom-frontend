import { Box, Chip, Typography } from "@mui/material";
import type { DescendantProgress } from "@/entities/issue";

interface KanbanSwimlaneProps {
  epicKey: string | null;
  epicTitle: string;
  progress?: DescendantProgress;
  children: React.ReactNode;
}

export const KanbanSwimlane = ({
  epicKey,
  epicTitle,
  progress,
  children,
}: KanbanSwimlaneProps) => (
  <Box sx={{ mb: 1.5 }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.75,
        mb: 0.75,
        px: 0.5,
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontWeight: 700,
          fontSize: 10,
          color: epicKey ? "#7c3aed" : "text.disabled",
          textTransform: "uppercase",
        }}
      >
        {epicKey ?? "에픽 없음"}
      </Typography>
      <Typography
        variant="caption"
        sx={{ fontSize: 10, color: "text.secondary" }}
        noWrap
      >
        {epicTitle}
      </Typography>
      {progress && progress.total > 0 && (
        <Chip
          label={`${progress.completed}/${progress.total}`}
          size="small"
          sx={{
            height: 16,
            fontSize: 9,
            fontWeight: 600,
            bgcolor:
              progress.completed === progress.total ? "#e8f5e9" : "#fff3e0",
            color:
              progress.completed === progress.total ? "#2ca87f" : "#e58a00",
            "& .MuiChip-label": { px: 0.5 },
          }}
        />
      )}
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {children}
    </Box>
  </Box>
);
