import { Box, Button, Typography } from "@mui/material";

export const MenuRecommendationContent = () => {
  return (
    <div style={{ width: "100%", height: "calc(100% - 20px)" }}>
      <Box width="100%" display="flex" justifyContent="flex-end" mt={2}>
        <Button size="small" color="primary" variant="contained">
          Go to select
        </Button>
      </Box>
      <Box
        width="100%"
        height="calc(100% - 130px)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <div>
          <Typography typography="h6">Choice today's menu.</Typography>
          <Typography typography="subtitle1">
            What food should we eat today?
          </Typography>
          <Typography typography="caption">
            You can make menu recommendations as many times as you want per day.
          </Typography>
        </div>
      </Box>
    </div>
  );
};
