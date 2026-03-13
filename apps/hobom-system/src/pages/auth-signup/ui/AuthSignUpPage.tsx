import { ErrorOutline } from "hobom-design-system/icons";
import { AuthSignUpForm } from "@/features/submit-auth-signup";
import { ErrorBoundary, Hb } from "@/shared/ui";

export default function AuthSignUpPage() {
  return (
    <Hb.Box
      component="main"
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ bgcolor: "background.default" }}
    >
      <Hb.Box
        sx={{
          width: "100%",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Hb.Box sx={{ textAlign: "center" }}>
          <Hb.Text
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "primary.main",
              letterSpacing: "-0.02em",
              mb: 0.5,
            }}
          >
            HoBom
          </Hb.Text>
          <Hb.Text variant="body2" color="text.secondary">
            HoBom System
          </Hb.Text>
        </Hb.Box>

        <Hb.Box
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
        </Hb.Box>
      </Hb.Box>
    </Hb.Box>
  );
}

AuthSignUpPage.Fallback = () => {
  return (
    <Hb.Box sx={{ textAlign: "center", py: 2 }}>
      <ErrorOutline color="error" sx={{ fontSize: 48, mb: 1 }} />
      <Hb.Text variant="h6" fontWeight={600} gutterBottom>
        앗!
      </Hb.Text>
      <Hb.Text variant="body2" color="text.secondary" mb={3}>
        시스템에 문제가 생겼어요.
      </Hb.Text>
      <Hb.Button
        variant="primary"
        size="small"
        onClick={() => window.location.reload()}
      >
        다시 시도하기
      </Hb.Button>
    </Hb.Box>
  );
};
