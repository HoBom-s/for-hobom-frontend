import * as stylex from "@stylexjs/stylex";
import { Hb } from "@/shared/ui";

const fadeIn = stylex.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1300,
    backgroundColor: "var(--hb-color-accent)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    animationName: fadeIn,
    animationDuration: "0.4s",
    animationTimingFunction: "ease",
  },
});

export const LoginTransitionOverlay = () => (
  <Hb.Box {...stylex.props(styles.overlay)}>
    <Hb.Text
      variant="h4"
      style={{
        fontWeight: 800,
        color: "white",
        letterSpacing: "-0.02em",
      }}
    >
      HoBom
    </Hb.Text>
    <Hb.Progress.Linear
      color="white"
      style={{ width: 240, borderRadius: 8, backgroundColor: "rgba(255,255,255,0.2)" }}
    />
    <Hb.Text
      variant="body2"
      style={{
        color: "rgba(255,255,255,0.85)",
      }}
    >
      호봄 시스템으로 이동할게요.
    </Hb.Text>
  </Hb.Box>
);
