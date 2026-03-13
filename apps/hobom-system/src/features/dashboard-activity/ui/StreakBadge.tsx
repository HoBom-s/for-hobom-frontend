import { Box, Typography } from "@mui/material";
import { LocalFireDepartment } from "@mui/icons-material";

interface StreakBadgeProps {
  currentStreak: number;
  longestStreak: number;
}

export const StreakBadge = ({
  currentStreak,
  longestStreak,
}: StreakBadgeProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
      }}
    >
      <Box
        sx={{
          flex: 1,
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <LocalFireDepartment sx={{ color: "warning.main", fontSize: 32 }} />
        <Typography variant="h4" fontWeight={700}>
          {currentStreak}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          현재 연속
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          p: 2,
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <LocalFireDepartment sx={{ color: "error.main", fontSize: 32 }} />
        <Typography variant="h4" fontWeight={700}>
          {longestStreak}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          최장 연속
        </Typography>
      </Box>
    </Box>
  );
};
