import { Box, Typography } from "@mui/material";

export const PickMenuHeader = () => {
  return (
    <Box sx={{ p: 2, mt: 3 }}>
      <Box>
        <Typography
          sx={{ lineHeight: 1, fontSize: 20 }}
          variant="h6"
          component="div"
        >
          Please select a menu.
        </Typography>
        <Typography variant="caption" sx={{ fontSize: 14 }}>
          Which menu should I add to my list of recommendations?
        </Typography>
      </Box>
    </Box>
  );
};
