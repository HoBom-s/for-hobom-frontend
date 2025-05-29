import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { StopScreenShareOutlined } from "@mui/icons-material";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Box sx={{ mx: "auto", textAlign: "center" }}>
          <StopScreenShareOutlined sx={{ fontSize: 48 }} />
          <Typography variant="h5" gutterBottom>
            404
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Cannot found this page.
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            size="small"
            color="info"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </Box>
      </div>
    </div>
  );
}
