import type { CSSProperties, HTMLAttributes, MouseEvent, ReactElement, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";

type ChipVariant = "filled" | "outlined" | "soft";
type ChipColor = "default" | "primary" | "secondary";
type ChipSize = "small" | "medium";

interface ChipProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  label?: ReactNode;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  icon?: ReactElement;
  avatar?: ReactElement;
  onDelete?: () => void;
  deleteIcon?: ReactElement;
  /**
   * A single accent color for a tonal chip: background becomes a light tint of
   * it, text takes the color, and hover deepens the tint. Overrides
   * variant/color. Accepts any CSS color (hex, rgb, …).
   */
  tone?: string;
}

const styles = stylex.create({
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    boxSizing: "border-box",
    borderRadius: 6,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    fontWeight: 500,
    lineHeight: 1,
    whiteSpace: "nowrap",
    maxWidth: "100%",
    verticalAlign: "middle",
  },
  small: { height: 24, fontSize: "0.75rem", paddingInline: 8 },
  medium: { height: 32, fontSize: "0.8125rem", paddingInline: 12 },
  clickable: { cursor: "pointer" },
  soft: { opacity: 0.85 },
  label: { overflow: "hidden", textOverflow: "ellipsis" },
  icon: { display: "inline-flex", fontSize: "1.05em", marginInlineStart: -2 },
  delete: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginInlineEnd: -2,
    marginInlineStart: 2,
    padding: 0,
    border: "none",
    backgroundColor: "transparent",
    color: "inherit",
    cursor: "pointer",
    opacity: 0.7,
    fontSize: "1.15em",
    lineHeight: 1,
  },
});

const COLORS = {
  default: "var(--hb-color-border)",
  primary: "var(--hb-color-accent)",
  secondary: "var(--hb-color-text-secondary)",
} as const;
const ON_FILLED = {
  default: "var(--hb-color-text-primary)",
  primary: "var(--hb-color-accent-contrast)",
  secondary: "var(--hb-color-accent-contrast)",
} as const;

// Surface colors are inline (runtime-computed) so consumer `style` can override
// them; StyleX handles only the static layout above.
function surfaceStyle(color: ChipColor, outlined: boolean): CSSProperties {
  if (outlined) {
    const line = color === "default" ? "var(--hb-color-border)" : COLORS[color];
    return { backgroundColor: "transparent", borderColor: line, color: line };
  }
  return { backgroundColor: COLORS[color], color: ON_FILLED[color] };
}

export const Chip = ({
  label,
  variant = "filled",
  color = "default",
  size = "small",
  icon,
  avatar,
  onDelete,
  deleteIcon,
  onClick,
  tone,
  className,
  style,
  ...rest
}: ChipProps) => {
  const sx = stylex.props(
    styles.root,
    size === "medium" ? styles.medium : styles.small,
    variant === "soft" && styles.soft,
    onClick && styles.clickable,
  );

  // Tonal chips: text takes the tone, background is a light tint of it (via
  // currentColor), and hover deepens the tint (the `hb-chip-tonal` hover rule
  // in the global stylesheet). Colors are inline because they are dynamic per
  // instance — StyleX only handles the static layout above.
  const surface: CSSProperties = tone
    ? { color: tone, backgroundColor: "color-mix(in srgb, currentColor 12%, transparent)" }
    : surfaceStyle(color, variant === "outlined");

  return (
    <div
      {...rest}
      onClick={onClick}
      data-hb-chip-tonal={tone ? "" : undefined}
      className={[sx.className, className].filter(Boolean).join(" ")}
      style={{ ...sx.style, ...surface, ...style }}
    >
      {avatar}
      {icon && <span {...stylex.props(styles.icon)}>{icon}</span>}
      <span {...stylex.props(styles.label)}>{label}</span>
      {onDelete && (
        <button
          type="button"
          aria-label="삭제"
          {...stylex.props(styles.delete)}
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          {deleteIcon ?? "×"}
        </button>
      )}
    </div>
  );
};
