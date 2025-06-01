import { Box, Button, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { AuthLoginForm } from "src/features/submit-auth-login";
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
          Something went wrong.
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
            Reload
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
