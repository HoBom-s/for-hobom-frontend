// Claude Design 보호소 상세의 커버와 겹침 프로필 카드 스타일
import * as stylex from "@stylexjs/stylex";

const TABLET = "@media (min-width: 640px)";

export const styles = stylex.create({
  root: { position: "relative", paddingBottom: 2 },
  cover: {
    overflow: "hidden",
    height: { default: 170, [TABLET]: 250 },
    borderRadius: 24,
    backgroundColor: "var(--hb-angel-surface-alt)",
  },
  fallbackImage: {
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
  },
  profile: {
    position: "relative",
    zIndex: 1,
    marginInline: { default: 12, [TABLET]: 24 },
    marginTop: -58,
    padding: "22px 24px",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 14,
    borderRadius: 24,
    backgroundColor: "var(--hb-angel-card)",
    boxShadow: "0 2px 4px rgba(34,49,42,0.05),0 20px 46px -32px rgba(34,49,42,0.40)",
  },
  avatar: {
    width: 56,
    height: 56,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-accent)",
    fontFamily: "var(--hb-font-display)",
    fontSize: "1.625rem",
    fontWeight: 700,
  },
  identity: { flex: 1, minWidth: 180 },
  nameRow: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  name: {
    margin: 0,
    fontFamily: "var(--hb-font-display)",
    fontSize: "1.5625rem",
    fontWeight: 700,
    color: "var(--hb-color-text-primary)",
  },
  trust: {
    paddingBlock: 4,
    paddingInline: 10,
    borderRadius: "var(--hb-angel-radius-pill)",
    backgroundColor: "var(--hb-angel-green-tint)",
    color: "var(--hb-color-accent)",
    fontSize: "0.6875rem",
    fontWeight: 600,
  },
  address: { margin: 0, marginTop: 7, fontSize: "0.8125rem", color: "#8A9187" },
  follow: { display: "flex", marginInlineStart: "auto" },
});
