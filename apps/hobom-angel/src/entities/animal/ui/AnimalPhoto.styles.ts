import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  // Branded empty tile — a green-tint → warm-tint wash with the paw mark,
  // never bare grey. Fills the DS Image frame it's rendered into.
  fallback: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.5rem",
    backgroundImage:
      "linear-gradient(135deg, var(--hb-angel-green-tint) 0%, var(--hb-angel-warm-tint) 100%)",
    color: "var(--hb-color-accent-dark)",
    opacity: 0.9,
  },
});
