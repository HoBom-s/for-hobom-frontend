import { Fragment, type ReactNode } from "react";
import { Divider, ListItem, ListItemText, Typography } from "@mui/material";
import type {
  FoodType,
  MenuKindType,
  MenuRecommendationType,
  TimeOfMealType,
} from "@/entities/menu-recommendation";

export const MenuRecommendationListItem = ({
  item,
  showDivider,
  rightAddon = null,
}: {
  item: MenuRecommendationType;
  showDivider: boolean;
  rightAddon?: ReactNode;
}) => (
  <div style={{ marginBottom: "4px" }}>
    <ListItem alignItems="flex-start" secondaryAction={rightAddon}>
      <ListItemText
        primary={item.name}
        secondary={
          <MenuRecommendationDescription
            foodType={item.foodType}
            menuKind={item.menuKind}
            timeOfMeal={item.timeOfMeal}
          />
        }
      />
    </ListItem>
    {showDivider && <Divider />}
  </div>
);

const MenuRecommendationDescription = ({
  foodType,
  menuKind,
  timeOfMeal,
}: {
  foodType: FoodType;
  menuKind: MenuKindType;
  timeOfMeal: TimeOfMealType;
}) => (
  <Fragment>
    <Typography
      component="span"
      variant="body2"
      sx={{ color: "text.primary", display: "inline" }}
    >
      {foodType} {menuKind} {timeOfMeal}
    </Typography>
  </Fragment>
);
