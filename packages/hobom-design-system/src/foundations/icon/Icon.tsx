import type { CSSProperties, ReactNode, SVGProps } from "react";
import * as stylex from "@stylexjs/stylex";

type FontSizeVariant = "inherit" | "small" | "medium" | "large";

type IconFontSize = number | string | FontSizeVariant;

/**
 * The subset of MUI's `sx` that the icon call sites actually use, so the
 * in-house icons are a drop-in replacement (`<Icon sx={{ fontSize, color }} />`).
 */
interface IconSx {
  fontSize?: IconFontSize;
  color?: string;
  m?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  mx?: number;
  my?: number;
  opacity?: number;
  cursor?: CSSProperties["cursor"];
  transform?: string;
  transition?: string;
  verticalAlign?: CSSProperties["verticalAlign"];
}

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, "fontSize" | "color" | "ref"> {
  fontSize?: IconFontSize;
  color?: string;
  sx?: IconSx;
  children?: ReactNode;
}

const VARIANT_PX: Record<FontSizeVariant, string> = {
  inherit: "1em",
  small: "20px",
  medium: "24px",
  large: "35px",
};

const resolveSize = (value: IconFontSize | undefined): string | undefined => {
  if (value == null) return undefined;
  if (typeof value === "number") return `${value}px`;
  if (value in VARIANT_PX) return VARIANT_PX[value as FontSizeVariant];

  return value;
};

const styles = stylex.create({
  root: {
    width: "1em",
    height: "1em",
    fontSize: "1.5rem",
    display: "inline-block",
    flexShrink: 0,
    fill: "currentColor",
    userSelect: "none",
  },
});

const SP = 8;

/** Translate the icon `sx` subset (+ top-level props) into a plain style. */
const toStyle = (sx: IconSx | undefined, fontSize?: IconFontSize, color?: string): CSSProperties => {
  const merged: IconSx = { ...sx };
  const size = resolveSize(fontSize ?? merged.fontSize);
  const style: CSSProperties = {};

  if (size) style.fontSize = size;
  if (color ?? merged.color) style.color = color ?? merged.color;
  if (merged.m != null) style.margin = merged.m * SP;
  if (merged.mx != null) style.marginInline = merged.mx * SP;
  if (merged.my != null) style.marginBlock = merged.my * SP;
  if (merged.mt != null) style.marginTop = merged.mt * SP;
  if (merged.mb != null) style.marginBottom = merged.mb * SP;
  if (merged.ml != null) style.marginLeft = merged.ml * SP;
  if (merged.mr != null) style.marginRight = merged.mr * SP;
  if (merged.opacity != null) style.opacity = merged.opacity;
  if (merged.cursor) style.cursor = merged.cursor;
  if (merged.transform) style.transform = merged.transform;
  if (merged.transition) style.transition = merged.transition;
  if (merged.verticalAlign) style.verticalAlign = merged.verticalAlign;

  return style;
};

export const Icon = ({ fontSize, color, sx, style, className, children, ...rest }: IconProps) => {
  const cls = stylex.props(styles.root);

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...rest}
      className={[cls.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...cls.style, ...toStyle(sx, fontSize, color), ...style }}
    >
      {children}
    </svg>
  );
};

/** Build an icon component from a single 24×24 path. */
export const createIcon = (path: string, displayName: string) => {
  const IconComponent = (props: Omit<IconProps, "children">) => (
    <Icon {...props} data-icon={displayName}>
      <path d={path} />
    </Icon>
  );

  IconComponent.displayName = displayName;

  return IconComponent;
};
