// Claude Design의 종이색·녹색 기반 브랜드 토큰을 앱 전역에 제공하는 테마
export const ANGEL_THEME_CSS =
  `:root{` +
  `--hb-color-canvas:#F3EDE3;` +
  `--hb-color-surface:#FBF7F0;` +
  `--hb-color-bg:#F3EDE3;` +
  `--hb-color-border:#E7DFD1;` +
  `--hb-color-text-primary:#22312A;` +
  `--hb-color-text-secondary:#5C6A61;` +
  `--hb-color-text-disabled:#9AA096;` +
  `--hb-color-neutral:#7C8A80;` +
  `--hb-color-accent:#2E6B4E;` +
  `--hb-color-accent-dark:#1F4C37;` +
  `--hb-color-accent-contrast:#FBF7F0;` +
  `--hb-color-danger:#8A3F2E;` +
  `--hb-color-success:#3C8060;` +
  `--hb-color-success-subtle:#E7F0E7;` +
  `--hb-color-warning:#B4763A;` +
  `--hb-color-warning-subtle:#FBEEDF;` +
  `--hb-color-chrome:#FBF7F0;` +
  `--hb-radius-control:18px;` +
  `--hb-font-display:'Gowun Batang',serif;` +
  `--hb-font-body:'IBM Plex Sans KR',system-ui,sans-serif;` +
  `--hb-font-mono:ui-monospace,SFMono-Regular,Menlo,monospace;` +
  `--hb-angel-green-deep:#1F4C37;` +
  `--hb-angel-green-tint:#E7F0E7;` +
  `--hb-angel-green-tint-strong:#D5E6D8;` +
  `--hb-angel-accent-warm:#F6C89A;` +
  `--hb-angel-accent-warm-dark:#B4763A;` +
  `--hb-angel-accent-warm-contrast:#3A2A18;` +
  `--hb-angel-warm-tint:#FBEEDF;` +
  `--hb-angel-warm-tint-strong:#F4DFC8;` +
  `--hb-angel-urgent:#8A3F2E;` +
  `--hb-angel-urgent-tint:#F6E4E0;` +
  `--hb-angel-surface-alt:#F4EFE6;` +
  `--hb-angel-card:#FFFFFF;` +
  `--hb-angel-footer:#EFE8DC;` +
  `--hb-angel-footer-border:#D9CFBE;` +
  `--hb-angel-on-photo:#FBF7F0;` +
  `--hb-angel-on-photo-strong:rgba(251,247,240,0.92);` +
  `--hb-angel-on-photo-muted:rgba(251,247,240,0.78);` +
  `--hb-angel-on-photo-fill:rgba(251,247,240,0.18);` +
  `--hb-angel-on-photo-shadow:0 1px 6px rgba(34,49,42,0.45);` +
  `--hb-angel-disc-scrim:rgba(34,49,42,0.28);` +
  `--hb-angel-disc-scrim-strong:rgba(34,49,42,0.44);` +
  `--hb-angel-radius-card:22px;` +
  `--hb-angel-radius-md:18px;` +
  `--hb-angel-radius-sm:16px;` +
  `--hb-angel-radius-control:18px;` +
  `--hb-angel-radius-pill:999px;` +
  `--hb-angel-shadow-sm:0 1px 2px rgba(34,49,42,0.05);` +
  `--hb-angel-shadow-md:0 1px 2px rgba(34,49,42,0.05),0 10px 24px -18px rgba(34,49,42,0.25);` +
  `--hb-angel-shadow-lg:0 2px 4px rgba(34,49,42,0.05),0 30px 70px -40px rgba(34,49,42,0.35);` +
  `--hb-angel-shadow:0 1px 2px rgba(34,49,42,0.05),0 10px 24px -18px rgba(34,49,42,0.25);` +
  `--hb-angel-glow-accent:0 10px 24px -12px rgba(46,107,78,0.70);` +
  `--hb-angel-glow-warm:0 10px 24px -12px rgba(180,118,58,0.42);` +
  `--hb-angel-focus-ring:0 0 0 3px rgba(46,107,78,0.24);` +
  `--hb-angel-cta-gradient:linear-gradient(150deg,#2E6B4E,#1F4C37);` +
  `--hb-angel-hero-wash:linear-gradient(180deg,#FBF7F0 0%,#F8F3EA 100%);` +
  `--hb-angel-photo-scrim:linear-gradient(to top,rgba(34,49,42,0.68),rgba(34,49,42,0.08) 58%,transparent);` +
  `--hb-angel-media-scrim:linear-gradient(to top,rgba(34,49,42,0.58),rgba(34,49,42,0.22));` +
  `--hb-angel-photo-scrim-brand:linear-gradient(155deg,rgba(46,107,78,0.76),rgba(31,76,55,0.34) 55%,rgba(34,49,42,0.68));` +
  `--hb-angel-space-section:clamp(44px,6vw,72px);` +
  `--hb-angel-space-header:22px;` +
  `--hb-angel-measure:34rem;` +
  `--hb-angel-dur-fast:140ms;` +
  `--hb-angel-dur:180ms;` +
  `--hb-angel-dur-slow:300ms;` +
  `--hb-angel-ease:cubic-bezier(0.22,0.61,0.36,1);` +
  `--hb-angel-ease-spring:cubic-bezier(0.34,1.3,0.64,1);` +
  `}`;

export const AngelThemeVars = () => <style>{ANGEL_THEME_CSS}</style>;
