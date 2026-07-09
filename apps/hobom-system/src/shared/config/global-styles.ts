/** Global styles injected once via `Hb.GlobalStyles` (a plain CSS string). */
export const GLOBAL_STYLES = `
body, #root {
  transition: background-color 0.3s ease, color 0.2s ease;
}

/* ── Toss-style toast (shared) ── */
.Toastify__toast-container--top-center { top: 24px !important; }
.Toastify__toast {
  border-radius: 12px;
  padding: 14px 20px;
  min-height: auto;
  font-size: 14px;
  font-weight: 500;
  font-family: Inter, sans-serif;
  backdrop-filter: blur(8px);
}
.Toastify__toast-body { padding: 0; margin: 0; }

/* ── Light mode ── */
.Toastify__toast,
.Toastify__toast--success,
.Toastify__toast--error,
.Toastify__toast--warning,
.Toastify__toast--info {
  background: #1b1d1f;
  color: #f9fafb;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.18);
}

/* ── Dark mode ── */
[data-hb-scheme="dark"] .Toastify__toast,
[data-hb-scheme="dark"] .Toastify__toast--success,
[data-hb-scheme="dark"] .Toastify__toast--error,
[data-hb-scheme="dark"] .Toastify__toast--warning,
[data-hb-scheme="dark"] .Toastify__toast--info {
  background: #2d3748;
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}
`;
