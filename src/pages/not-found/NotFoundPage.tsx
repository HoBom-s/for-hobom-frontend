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
            해당 페이지를 찾을 수 없어요.
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
            돌아가기
          </Button>
        </Box>
      </div>
    </div>
  );
}
