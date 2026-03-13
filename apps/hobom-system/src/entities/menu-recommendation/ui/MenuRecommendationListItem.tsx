import type { ReactNode } from "react";
import { Hb } from "@/shared/ui";
import type { MenuRecommendationType } from "@/entities/menu-recommendation";

const MENU_KIND_LABEL: Record<string, string> = {
  KOREAN: "한식",
  JAPANESE: "일식",
  CHINESE: "중식",
  INDIAN: "인도식",
  MEXICAN: "멕시칸",
  AMERICAN: "양식",
  ITALIAN: "이탈리안",
};

const MENU_KIND_COLORS: Record<string, string> = {
  KOREAN: "#e3f2fd",
  JAPANESE: "#fce4ec",
  CHINESE: "#fff3e0",
  INDIAN: "#f3e5f5",
  MEXICAN: "#e8f5e9",
  AMERICAN: "#e0f7fa",
  ITALIAN: "#fff8e1",
};

const TIME_LABEL: Record<string, string> = {
  BREAKFAST: "아침",
  LUNCH: "점심",
  DINNER: "저녁",
};

const FOOD_TYPE_LABEL: Record<string, string> = {
  MEAL: "식사",
  DESERT: "디저트",
  BOTH: "식사+디저트",
};

export const MenuRecommendationListItem = ({
  item,
  showDivider,
  rightAddon = null,
}: {
  item: MenuRecommendationType;
  showDivider: boolean;
  rightAddon?: ReactNode;
}) => (
  <>
    <Hb.List.Item secondaryAction={rightAddon} sx={{ py: 1.5, px: 2.5 }}>
      <Hb.List.ItemText
        primary={item.name}
        primaryTypographyProps={{
          fontWeight: 600,
          fontSize: 14,
          color: "text.primary",
          mb: 0.75,
        }}
        secondary={
          <Hb.Box
            component="span"
            sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}
          >
            <Hb.Chip
              label={MENU_KIND_LABEL[item.menuKind] ?? item.menuKind}
              size="small"
              sx={{
                height: 22,
                fontSize: 11,
                fontWeight: 500,
                bgcolor: MENU_KIND_COLORS[item.menuKind] ?? "#f5f5f5",
              }}
            />
            <Hb.Chip
              label={TIME_LABEL[item.timeOfMeal] ?? item.timeOfMeal}
              size="small"
              variant="outlined"
              sx={{ height: 22, fontSize: 11 }}
            />
            <Hb.Chip
              label={FOOD_TYPE_LABEL[item.foodType] ?? item.foodType}
              size="small"
              variant="outlined"
              sx={{ height: 22, fontSize: 11 }}
            />
          </Hb.Box>
        }
      />
    </Hb.List.Item>
    {showDivider && <Hb.Divider component="li" />}
  </>
);
