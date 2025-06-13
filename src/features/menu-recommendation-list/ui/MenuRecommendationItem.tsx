import { List, ListItem, ListItemText } from "@mui/material";

export const MenuRecommendationItem = () => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItem>
        <ListItemText primary="Rice" secondary="KOREA FOOD" />
      </ListItem>
    </List>
  );
};
