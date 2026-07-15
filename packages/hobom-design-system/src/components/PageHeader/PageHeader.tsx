import type { HTMLAttributes, ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { Text } from "../Text/Text";

interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Page/screen title. */
  title: ReactNode;
  /** Supporting line under the title. */
  description?: ReactNode;
  /** Right-aligned slot in the title row (e.g. buttons). */
  actions?: ReactNode;
  /** Rendered above the title row (e.g. an Hb.Breadcrumb). */
  breadcrumb?: ReactNode;
  /** Extra content below the title row (e.g. filter chips or tabs). */
  children?: ReactNode;
}

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  row: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },
  heading: { display: "flex", flexDirection: "column", gap: 4, minWidth: 0 },
  actions: { flexShrink: 0 },
});

/**
 * The standard page/screen title block — an optional breadcrumb on top, then a
 * row with the title and supporting description on the left and actions on the
 * right. Extra content (filter chips, tabs) can be composed below.
 */
export const PageHeader = ({
  title,
  description,
  actions,
  breadcrumb,
  className,
  style,
  children,
  ...rest
}: PageHeaderProps) => {
  const sx = stylex.props(styles.root);

  return (
    <header
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      {breadcrumb}
      <div {...stylex.props(styles.row)}>
        <div {...stylex.props(styles.heading)}>
          <Text variant="h5">{title}</Text>
          {description != null && (
            <Text variant="body2" color="text.secondary">
              {description}
            </Text>
          )}
        </div>
        {actions != null && <div {...stylex.props(styles.actions)}>{actions}</div>}
      </div>
      {children}
    </header>
  );
};
