import type { HTMLAttributes, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { Text } from "../Text/Text";

type SectionCardVariant = "outlined" | "plain";

interface SectionCardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Heading rendered at the top of the section. */
  title?: ReactNode;
  /** Supporting line under the title. */
  description?: ReactNode;
  /** Right-aligned slot in the header row (e.g. a link or button). */
  action?: ReactNode;
  /** `"outlined"` (bordered surface) or `"plain"` (no border/background).
   *  Defaults to `"outlined"`. */
  variant?: SectionCardVariant;
  children?: ReactNode;
}

const styles = stylex.create({
  root: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  outlined: {
    padding: 20,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: 12,
    backgroundColor: "var(--hb-color-surface)",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  heading: { display: "flex", flexDirection: "column", gap: 4, minWidth: 0 },
  action: { flexShrink: 0 },
});

/**
 * A titled content block — the recurring "bordered section with a heading and
 * body" that screens otherwise hand-roll. Compose freely inside; the card only
 * owns the frame, the header row, and the vertical rhythm.
 */
export const SectionCard = ({
  title,
  description,
  action,
  variant = "outlined",
  className,
  style,
  children,
  ...rest
}: SectionCardProps) => {
  const sx = stylex.props(styles.root, variant === "outlined" && styles.outlined);
  const hasHeader = title != null || description != null || action != null;

  return (
    <section
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      {hasHeader && (
        <div {...stylex.props(styles.header)}>
          <div {...stylex.props(styles.heading)}>
            {title != null && <Text variant="h6">{title}</Text>}
            {description != null && (
              <Text variant="body2" color="text.secondary">
                {description}
              </Text>
            )}
          </div>
          {action != null && <div {...stylex.props(styles.action)}>{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
};
