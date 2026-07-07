import { createElement, type AnchorHTMLAttributes, type CSSProperties, type ElementType } from "react";
import * as stylex from "@stylexjs/stylex";

type Underline = "none" | "hover" | "always";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Element to render (e.g. a router link). Defaults to `"a"`. */
  component?: ElementType;
  /** When to show the underline. Defaults to `"always"`. */
  underline?: Underline;
  /** Text color. Defaults to the accent. */
  color?: string;
  /** Destination for a router `component` (forwarded verbatim). */
  to?: string;
}

const styles = stylex.create({
  root: { cursor: "pointer" },
  none: { textDecorationLine: "none" },
  hover: { textDecorationLine: { default: "none", ":hover": "underline" } },
  always: { textDecorationLine: "underline" },
});

const UNDERLINE_STYLE = {
  none: styles.none,
  hover: styles.hover,
  always: styles.always,
} as const;

export const Link = ({
  component,
  underline = "always",
  color = "var(--hb-color-accent)",
  className,
  style,
  ...rest
}: LinkProps) => {
  const Component = component ?? "a";
  const sx = stylex.props(styles.root, UNDERLINE_STYLE[underline]);
  const dynamic: CSSProperties = { color };

  return createElement(Component, {
    ...rest,
    className: [sx.className, className].filter(Boolean).join(" ") || undefined,
    style: { ...sx.style, ...dynamic, ...style },
  });
};
