/** MUI GlobalStyles에 주입하는 전역 스타일. */
export const GLOBAL_STYLES = {
  "body, #root, .MuiPaper-root, .MuiAppBar-root": {
    transition: "background-color 0.3s ease, color 0.2s ease",
  },

  /* ── Toss-style toast (shared) ── */
  ".Toastify__toast-container--top-center": {
    top: "24px !important",
  },
  ".Toastify__toast": {
    borderRadius: 12,
    padding: "14px 20px",
    minHeight: "auto",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "Inter, sans-serif",
    backdropFilter: "blur(8px)",
  },
  ".Toastify__toast-body": {
    padding: 0,
    margin: 0,
  },

  /* ── Light mode ── */
  ".Toastify__toast, .Toastify__toast--success, .Toastify__toast--error, .Toastify__toast--warning, .Toastify__toast--info":
    {
      background: "#1b1d1f",
      color: "#f9fafb",
      border: "1px solid rgba(255,255,255,0.06)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
    },

  /* ── Dark mode ── */
  '[data-mui-color-scheme="dark"] .Toastify__toast, [data-mui-color-scheme="dark"] .Toastify__toast--success, [data-mui-color-scheme="dark"] .Toastify__toast--error, [data-mui-color-scheme="dark"] .Toastify__toast--warning, [data-mui-color-scheme="dark"] .Toastify__toast--info':
    {
      background: "#2d3748",
      color: "#e2e8f0",
      border: "1px solid rgba(255,255,255,0.1)",
      boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
    },
} as const;
