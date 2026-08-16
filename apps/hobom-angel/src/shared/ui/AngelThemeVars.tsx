/**
 * Angel brand theme — "Meadow & Marigold".
 *
 * Angel doesn't fork the design system — it *themes* it. This overrides the core
 * `--hb-color-*` tokens and adds a brand token layer the consumer surface needs:
 * a two-hue system (meadow green = trust, marigold = hope), a 3-tier elevation
 * ramp, a warm-neutral canvas, a real type scale, and motion tokens. Every value
 * is WCAG-AA credible. Mount once after the DS `ColorSchemeVars`.
 */
export const ANGEL_THEME_CSS = `:root{` +
  // ── Core retheme: meadow green as the trust primary ──
  `--hb-color-accent:oklch(0.62 0.15 152);` +
  `--hb-color-accent-dark:oklch(0.46 0.13 152);` +
  `--hb-color-accent-contrast:oklch(0.99 0.004 95);` +
  // Warm-neutral canvas (not clinical grey).
  `--hb-color-surface:oklch(0.995 0.004 95);` +
  `--hb-color-bg:oklch(0.965 0.014 92);` +
  // Control radius per the Angel spec.
  `--hb-radius-control:12px;` +

  // ── Green family (trust / status) ──
  `--hb-angel-green-deep:oklch(0.40 0.10 152);` +
  `--hb-angel-green-tint:oklch(0.95 0.045 152);` +
  `--hb-angel-green-tint-strong:oklch(0.90 0.07 152);` +

  // ── On-photo / on-accent foregrounds (text over the brand hero photo) ──
  `--hb-angel-on-photo:oklch(1 0 0);` +
  `--hb-angel-on-photo-strong:oklch(1 0 0 / 0.92);` +
  `--hb-angel-on-photo-muted:oklch(1 0 0 / 0.88);` +
  `--hb-angel-on-photo-fill:oklch(1 0 0 / 0.22);` +
  // Text shadow keeping the on-photo name legible over the media scrim.
  `--hb-angel-on-photo-shadow:0 1px 6px oklch(0.20 0.04 152 / 0.45);` +
  // Frosted disc behind an action floating over photo media (resting / hover).
  `--hb-angel-disc-scrim:oklch(0.20 0.04 152 / 0.28);` +
  `--hb-angel-disc-scrim-strong:oklch(0.20 0.04 152 / 0.44);` +

  // ── Warm marigold-apricot family (HOPE / one emotional CTA per surface) ──
  `--hb-angel-accent-warm:oklch(0.78 0.16 62);` +
  `--hb-angel-accent-warm-dark:oklch(0.60 0.15 55);` +
  `--hb-angel-accent-warm-contrast:oklch(0.28 0.06 55);` +
  `--hb-angel-warm-tint:oklch(0.96 0.035 68);` +
  `--hb-angel-warm-tint-strong:oklch(0.92 0.06 66);` +

  // ── Urgency (마감 임박 — distinct from warm) ──
  `--hb-angel-urgent:oklch(0.64 0.19 32);` +
  `--hb-angel-urgent-tint:oklch(0.95 0.04 40);` +

  // ── Surfaces ──
  `--hb-angel-surface-alt:oklch(0.975 0.012 90);` +

  // ── Radii (refined — less bubbly than the first pass) ──
  `--hb-angel-radius-card:16px;` +
  `--hb-angel-radius-md:14px;` +
  `--hb-angel-radius-sm:12px;` +
  `--hb-angel-radius-control:12px;` +
  `--hb-angel-radius-pill:999px;` +

  // ── Elevation (3-tier resting ramp; -md aliased to the legacy name) ──
  `--hb-angel-shadow-sm:0 1px 2px rgba(28,45,38,0.05), 0 2px 8px -4px rgba(28,45,38,0.10);` +
  `--hb-angel-shadow-md:0 4px 12px -4px rgba(28,45,38,0.10), 0 10px 26px -14px rgba(28,45,38,0.18);` +
  `--hb-angel-shadow-lg:0 12px 30px -12px rgba(28,45,38,0.20), 0 30px 60px -28px rgba(28,45,38,0.28);` +
  `--hb-angel-shadow:0 4px 12px -4px rgba(28,45,38,0.10), 0 10px 26px -14px rgba(28,45,38,0.18);` +
  `--hb-angel-glow-accent:0 6px 20px -6px oklch(0.62 0.15 152 / 0.40);` +
  `--hb-angel-glow-warm:0 6px 20px -6px oklch(0.78 0.16 62 / 0.45);` +
  `--hb-angel-focus-ring:0 0 0 3px oklch(0.62 0.15 152 / 0.35);` +

  // ── Gradients / washes ──
  `--hb-angel-cta-gradient:linear-gradient(135deg, oklch(0.62 0.15 152) 0%, oklch(0.52 0.15 148) 55%, oklch(0.60 0.15 62) 130%);` +
  `--hb-angel-hero-wash:radial-gradient(120% 120% at 15% 10%, oklch(0.96 0.035 68) 0%, oklch(0.97 0.02 90) 45%, oklch(0.965 0.014 92) 100%);` +
  `--hb-angel-photo-scrim:linear-gradient(to top, oklch(0.20 0.04 152 / 0.72) 0%, oklch(0.20 0.04 152 / 0.10) 45%, transparent 70%);` +
  // Uniform full-media scrim: darkens an entire thumbnail so centered on-photo
  // counts read on hover (the bottom-anchored photo-scrim can't cover center).
  `--hb-angel-media-scrim:linear-gradient(to top, oklch(0.20 0.04 152 / 0.62) 0%, oklch(0.20 0.04 152 / 0.30) 100%);` +
  // Diagonal brand-hero scrim: keeps overlaid brand copy legible over the auth photo.
  `--hb-angel-photo-scrim-brand:linear-gradient(155deg, oklch(0.40 0.10 152 / 0.78) 0%, oklch(0.40 0.10 152 / 0.30) 55%, oklch(0.20 0.04 152 / 0.72) 100%);` +

  // ── Editorial rhythm (grafted from Warm Ledger) ──
  `--hb-angel-space-section:clamp(56px, 7vw, 96px);` +
  `--hb-angel-space-header:28px;` +
  `--hb-angel-measure:34rem;` +

  // ── Motion ──
  `--hb-angel-dur-fast:120ms;` +
  `--hb-angel-dur:180ms;` +
  `--hb-angel-dur-slow:320ms;` +
  `--hb-angel-ease:cubic-bezier(0.22, 0.61, 0.36, 1);` +
  `--hb-angel-ease-spring:cubic-bezier(0.34, 1.56, 0.64, 1);` +
  `}`;

export const AngelThemeVars = () => <style>{ANGEL_THEME_CSS}</style>;
