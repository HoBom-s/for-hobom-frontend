import { Fragment, Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  fetchMenuRecommendationListQueryOption,
  type FoodType,
  type MenuKindType,
  type MenuRecommendationType,
  type TimeOfMealType,
} from "@/entities/menu-recommendation";
import { HoBomSkeleton } from "@/shared/skeleton";
import { Bom } from "@/packages/bom";

export const MenuRecommendationList = () => (
  <Suspense
    fallback={Array.from({ length: 6 }).map((_, i) => (
      <HoBomSkeleton.List key={i} />
    ))}
  >
    <MenuRecommendationListContent />
  </Suspense>
);

const MenuRecommendationListContent = () => {
  const { data } = useSuspenseQuery(fetchMenuRecommendationListQueryOption());

  const itemList = Bom.prop(data, "items");

  return (
    <List
      dense
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      {itemList.map((item, index) => (
        <MenuRecommendationListItem
          key={item.id}
          item={item}
          showDivider={index < itemList.length - 1}
        />
      ))}
    </List>
  );
};

const MenuRecommendationListItem = ({
  item,
  showDivider,
}: {
  item: MenuRecommendationType;
  showDivider: boolean;
}) => (
  <div style={{ marginBottom: "4px" }}>
    <ListItem alignItems="flex-start">
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
