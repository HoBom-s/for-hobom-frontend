import { ErrorOutline } from "hobom-design-system/icons";
import { AuthSignUpForm } from "@/features/submit-auth-signup";
import { ErrorBoundary, Hb } from "@/shared/ui";

export default function AuthSignUpPage() {
  return (
    <Hb.Box
      component="main"
      style={{
        backgroundColor: "var(--hb-color-canvas)",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Hb.Box
        style={{
          width: "100%",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <Hb.Box
          style={{
            textAlign: "center",
          }}
        >
          <Hb.Text
            variant="h4"
            style={{
              fontWeight: 800,
              color: "var(--hb-color-accent)",
              letterSpacing: "-0.02em",
              marginBottom: 4,
            }}
          >
            HoBom
          </Hb.Text>
          <Hb.Text variant="body2" color="text.secondary">
            HoBom System
          </Hb.Text>
        </Hb.Box>

        <Hb.Box
          style={{
            width: "100%",
            backgroundColor: "var(--hb-color-surface)",
            borderRadius: 24,
            boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
            padding: 32,
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
    <Hb.Box
      style={{
        textAlign: "center",
        paddingTop: 16,
        paddingBottom: 16,
      }}
    >
      <ErrorOutline color="error" sx={{ fontSize: 48, mb: 1 }} />
      <Hb.Text variant="h6" fontWeight={600} gutterBottom>
        앗!
      </Hb.Text>
      <Hb.Text variant="body2" color="text.secondary" style={{ marginBottom: 24 }}>
        시스템에 문제가 생겼어요.
      </Hb.Text>
      <Hb.Button variant="primary" size="small" onClick={() => window.location.reload()}>
        다시 시도하기
      </Hb.Button>
    </Hb.Box>
  );
};
