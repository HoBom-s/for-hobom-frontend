import { Box, Button, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { AuthLoginForm } from "@/features/submit-auth-login";
import { ErrorBoundary } from "@/shared/errors";

export default function AuthLoginPage() {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <ErrorBoundary fallback={<AuthLoginPage.Fallback />}>
        <AuthLoginForm />
      </ErrorBoundary>
    </Box>
  );
}

AuthLoginPage.Fallback = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Box sx={{ mx: "auto", textAlign: "center" }}>
        <ErrorOutline color="error" sx={{ fontSize: 48 }} />
        <Typography variant="h5" gutterBottom>
          Oops !
        </Typography>
        <Typography variant="caption" color="text.secondary">
          시스템에 문제가 생겼어요.
        </Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => {
              window.location.reload();
            }}
          >
            다시 시도하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
