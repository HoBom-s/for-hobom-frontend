import type { CSSProperties, ReactNode, SVGProps } from "react";
import * as stylex from "@stylexjs/stylex";

type FontSizeVariant = "inherit" | "small" | "medium" | "large";

type IconFontSize = number | string | FontSizeVariant;

/**
 * The `sx` shape the icon call sites use — plain CSS properties plus the
 * `m*` spacing shorthands and the `fontSize` size variants — so the in-house
 * icons are a drop-in replacement (`<Icon sx={{ fontSize, color }} />`).
 */
interface IconSx extends Omit<CSSProperties, "fontSize"> {
  fontSize?: IconFontSize;
  m?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  mx?: number;
  my?: number;
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

/** Translate the icon `sx` (+ top-level props) into a plain style. */
const toStyle = (sx: IconSx | undefined, fontSize?: IconFontSize, color?: string): CSSProperties => {
  const { fontSize: sxFontSize, m, mt, mb, ml, mr, mx, my, ...rest } = sx ?? {};
  const style: CSSProperties = { ...rest };
  const size = resolveSize(fontSize ?? sxFontSize);

  if (size) style.fontSize = size;
  if (color != null) style.color = color;
  if (m != null) style.margin = m * SP;
  if (mx != null) style.marginInline = mx * SP;
  if (my != null) style.marginBlock = my * SP;
  if (mt != null) style.marginTop = mt * SP;
  if (mb != null) style.marginBottom = mb * SP;
  if (ml != null) style.marginLeft = ml * SP;
  if (mr != null) style.marginRight = mr * SP;

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

/** Build an icon component from its 24×24 SVG content. */
export const createIcon = (node: ReactNode, displayName: string) => {
  const IconComponent = (props: Omit<IconProps, "children">) => (
    <Icon {...props} data-icon={displayName}>
      {node}
    </Icon>
  );

  IconComponent.displayName = displayName;

  return IconComponent;
};
