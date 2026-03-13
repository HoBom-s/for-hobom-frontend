import { LocalFireDepartment } from "hobom-design-system/icons";
import { Hb } from "@/shared/ui";

interface StreakBadgeProps {
  currentStreak: number;
  longestStreak: number;
}

export const StreakBadge = ({
  currentStreak,
  longestStreak,
}: StreakBadgeProps) => {
  return (
    <Hb.Box
      sx={{
        display: "flex",
        gap: 2,
      }}
    >
      <Hb.Box
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
        <Hb.Text variant="h4" fontWeight={700}>
          {currentStreak}
        </Hb.Text>
        <Hb.Text variant="caption" color="text.secondary">
          현재 연속
        </Hb.Text>
      </Hb.Box>
      <Hb.Box
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
        <Hb.Text variant="h4" fontWeight={700}>
          {longestStreak}
        </Hb.Text>
        <Hb.Text variant="caption" color="text.secondary">
          최장 연속
        </Hb.Text>
      </Hb.Box>
    </Hb.Box>
  );
};
