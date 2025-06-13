import { Box, Typography } from "@mui/material";

export const MenuRecommendationHeader = () => {
  return (
    <Box sx={{ p: 2, mt: 3 }}>
      <Box>
        <Typography
          sx={{ lineHeight: 1, fontSize: 20 }}
          variant="h6"
          component="div"
        >
          Today Menu
          <br />
          What menu would you recommend?
        </Typography>
        <Typography variant="caption" sx={{ fontSize: 14 }}>
          You can choose the food to recommend a menu for you.
        </Typography>
      </Box>
    </Box>
  );
};
