import { Hb } from "@/shared/ui";
export const LoginTransitionOverlay = () => (
  <Hb.Box
    sx={{
      position: "fixed",
      inset: 0,
      zIndex: "modal",
      bgcolor: "primary.main",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 3,
      animation: "fadeIn 0.4s ease",
      "@keyframes fadeIn": {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
    }}
  >
    <Hb.Text variant="h4" sx={{ fontWeight: 800, color: "white", letterSpacing: "-0.02em" }}>
      HoBom
    </Hb.Text>
    <Hb.Progress.Linear
      sx={{
        width: 240,
        borderRadius: 1,
        bgcolor: "rgba(255,255,255,0.2)",
        "& .MuiLinearProgress-bar": { bgcolor: "white" },
      }}
    />
    <Hb.Text variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
      호봄 시스템으로 이동할게요.
    </Hb.Text>
  </Hb.Box>
);
