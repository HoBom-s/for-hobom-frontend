import {
  createElement,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import * as stylex from "@stylexjs/stylex";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline"
  | "button"
  | "inherit";

type TextAlign = "inherit" | "left" | "center" | "right" | "justify";

interface TextProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  /** Typography scale. Defaults to `"body1"`. */
  variant?: TextVariant;
  /** Text color: a semantic role (`"text.secondary"`, `"primary"`, …) or any CSS color. */
  color?: string;
  /** Text alignment. */
  align?: TextAlign;
  /** Truncate to a single line with an ellipsis. */
  noWrap?: boolean;
  /** Add a bottom margin (`0.35em`), matching the classic gutter. */
  gutterBottom?: boolean;
  /** Override the variant's font weight. */
  fontWeight?: number;
  /** Element to render. Defaults to the variant's semantic tag. */
  component?: ElementType;
  children?: ReactNode;
}

// The typography scale mirrors the values the app renders today: the default
// variants with the theme's overrides (h6/body1/body2/button/caption font sizes
// and the semibold h6). Sizes/line-heights/letter-spacing are kept identical so
// the migration is pixel-for-pixel.
const styles = stylex.create({
  base: {
    margin: 0,
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
  h1: { fontSize: "6rem", fontWeight: 300, lineHeight: 1.167, letterSpacing: "-0.01562em" },
  h2: { fontSize: "3.75rem", fontWeight: 300, lineHeight: 1.2, letterSpacing: "-0.00833em" },
  h3: { fontSize: "3rem", fontWeight: 400, lineHeight: 1.167, letterSpacing: "0em" },
  h4: { fontSize: "2.125rem", fontWeight: 400, lineHeight: 1.235, letterSpacing: "0.00735em" },
  h5: { fontSize: "1.5rem", fontWeight: 400, lineHeight: 1.334, letterSpacing: "0em" },
  h6: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.6, letterSpacing: "0.0075em" },
  subtitle1: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.75, letterSpacing: "0.00938em" },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.57,
    letterSpacing: "0.00714em",
  },
  body1: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5, letterSpacing: "0.00938em" },
  body2: { fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.43, letterSpacing: "0.01071em" },
  caption: { fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.66, letterSpacing: "0.03333em" },
  overline: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 2.66,
    letterSpacing: "0.08333em",
    textTransform: "uppercase",
  },
  button: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: "0.02857em",
    textTransform: "none",
  },
  inherit: {
    fontSize: "inherit",
    fontWeight: "inherit",
    lineHeight: "inherit",
    letterSpacing: "inherit",
  },
  noWrap: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  gutterBottom: { marginBottom: "0.35em" },
});

// Static variant → compiled-style map. StyleX tree-shakes `create` entries that
// are never referenced by a static member access, so we reference each one here
// (rather than indexing `styles[variant]`, which would emit nothing).
const VARIANT_STYLE = {
  h1: styles.h1,
  h2: styles.h2,
  h3: styles.h3,
  h4: styles.h4,
  h5: styles.h5,
  h6: styles.h6,
  subtitle1: styles.subtitle1,
  subtitle2: styles.subtitle2,
  body1: styles.body1,
  body2: styles.body2,
  caption: styles.caption,
  overline: styles.overline,
  button: styles.button,
  inherit: styles.inherit,
};

// Semantic element rendered per variant (default variant mapping).
const VARIANT_ELEMENT: Record<TextVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
  overline: "span",
  button: "span",
  inherit: "p",
};

// Semantic color roles resolve to the stable `--hb-*` vars so they flip in dark
// mode; anything else (hex/rgb/currentColor/…) passes through untouched.
const COLOR_ROLE: Record<string, string> = {
  "text.primary": "var(--hb-color-text-primary)",
  "text.secondary": "var(--hb-color-text-secondary)",
  "text.disabled": "var(--hb-color-text-disabled)",
  primary: "var(--hb-color-accent)",
  "primary.main": "var(--hb-color-accent)",
  secondary: "var(--hb-color-neutral)",
  error: "var(--hb-color-danger)",
  "error.main": "var(--hb-color-danger)",
  warning: "var(--hb-color-warning)",
  "warning.main": "var(--hb-color-warning)",
  success: "var(--hb-color-success)",
  "success.main": "var(--hb-color-success)",
};

const resolveColor = (color?: string): string | undefined =>
  color === undefined ? undefined : (COLOR_ROLE[color] ?? color);

export const Text = ({
  variant = "body1",
  color,
  align,
  noWrap = false,
  gutterBottom = false,
  fontWeight,
  component,
  className,
  style,
  children,
  ...rest
}: TextProps) => {
  const Component = component ?? VARIANT_ELEMENT[variant];
  const sx = stylex.props(
    styles.base,
    VARIANT_STYLE[variant],
    noWrap && styles.noWrap,
    gutterBottom && styles.gutterBottom,
  );

  const dynamic: CSSProperties = {
    color: resolveColor(color),
    textAlign: align === "inherit" ? undefined : align,
    fontWeight,
  };

  return createElement(
    Component,
    {
      ...rest,
      className: [sx.className, className].filter(Boolean).join(" ") || undefined,
      style: { ...sx.style, ...dynamic, ...style },
    },
    children,
  );
};
