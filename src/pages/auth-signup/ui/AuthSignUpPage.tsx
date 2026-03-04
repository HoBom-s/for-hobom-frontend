import { Box, Button, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { AuthSignUpForm } from "@/features/submit-auth-signup";
import { ErrorBoundary } from "@/shared/ui";

export default function AuthSignUpPage() {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ bgcolor: "background.default" }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "primary.main",
              letterSpacing: "-0.02em",
              mb: 0.5,
            }}
          >
            HoBom
          </Typography>
          <Typography variant="body2" color="text.secondary">
            HoBom System
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
            p: 4,
          }}
        >
          <ErrorBoundary fallback={<AuthSignUpPage.Fallback />}>
            <AuthSignUpForm />
          </ErrorBoundary>
        </Box>
      </Box>
    </Box>
  );
}

AuthSignUpPage.Fallback = () => {
  return (
    <Box sx={{ textAlign: "center", py: 2 }}>
      <ErrorOutline color="error" sx={{ fontSize: 48, mb: 1 }} />
      <Typography variant="h6" fontWeight={600} gutterBottom>
        앗!
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        시스템에 문제가 생겼어요.
      </Typography>
      <Button
        variant="contained"
        size="small"
        onClick={() => window.location.reload()}
      >
        다시 시도하기
      </Button>
    </Box>
  );
};
