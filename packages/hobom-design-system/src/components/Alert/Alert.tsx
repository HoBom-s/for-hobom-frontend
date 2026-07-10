import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import {
  CheckCircleOutline,
  ErrorOutline,
  InfoOutlined,
  ReportProblemOutlined,
} from "../../icons";

type Severity = "error" | "warning" | "info" | "success";

type AlertVariant = "standard" | "outlined";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Status color and default icon. Defaults to `"info"`. */
  severity?: Severity;
  /** `"standard"` (tinted fill) or `"outlined"` (border). Defaults to `"standard"`. */
  variant?: AlertVariant;
  /** Overrides the default severity icon. */
  icon?: ReactNode;
  children: ReactNode;
}

const styles = stylex.create({
  root: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    paddingBlock: 6,
    paddingInline: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    fontSize: "0.875rem",
    lineHeight: 1.43,
    boxSizing: "border-box",
  },
  icon: { display: "inline-flex", fontSize: "1.375rem", flexShrink: 0 },
  message: { minWidth: 0 },
});

const SEVERITY_COLOR: Record<Severity, string> = {
  error: "var(--hb-color-danger)",
  warning: "var(--hb-color-warning)",
  info: "var(--hb-color-accent)",
  success: "var(--hb-color-success)",
};

const DEFAULT_ICON: Record<Severity, ReactNode> = {
  error: <ErrorOutline fontSize="inherit" />,
  warning: <ReportProblemOutlined fontSize="inherit" />,
  info: <InfoOutlined fontSize="inherit" />,
  success: <CheckCircleOutline fontSize="inherit" />,
};

export const Alert = ({
  severity = "info",
  variant = "standard",
  icon,
  className,
  style,
  children,
  ...rest
}: AlertProps) => {
  const color = SEVERITY_COLOR[severity];
  // A darkened shade of the severity color stays readable on the light tint.
  const text = `color-mix(in srgb, ${color} 62%, black)`;
  const sx = stylex.props(styles.root);
  const surface: CSSProperties =
    variant === "outlined"
      ? { color: text, borderColor: color }
      : { color: text, backgroundColor: `color-mix(in srgb, ${color} 12%, var(--hb-color-surface))` };

  return (
    <div
      role="alert"
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...surface, ...style }}
    >
      <span {...stylex.props(styles.icon)} style={{ color }}>
        {icon ?? DEFAULT_ICON[severity]}
      </span>
      <span {...stylex.props(styles.message)}>{children}</span>
    </div>
  );
};
