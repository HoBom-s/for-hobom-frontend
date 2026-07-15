import { createContext, useContext, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { Text } from "../Text/Text";

type StatGroupVariant = "plain" | "card";

const StatGroupContext = createContext<StatGroupVariant>("plain");

interface StatGroupRootProps extends HTMLAttributes<HTMLDListElement> {
  /** When set, lay out as a grid of this many equal columns; otherwise wrap in a flex row. */
  columns?: number;
  /** `"plain"` (bare value/label column) or `"card"` (each stat in a bordered surface). Defaults to `"plain"`. */
  variant?: StatGroupVariant;
  children?: ReactNode;
}

interface StatGroupItemProps {
  /** The prominent figure (e.g. `"240+"`). */
  value: ReactNode;
  /** The line describing the figure (e.g. `"누적 입양"`). */
  label: ReactNode;
}

const styles = stylex.create({
  root: {
    margin: 0,
    display: "flex",
    flexWrap: "wrap",
    gap: 24,
  },
  grid: {
    display: "grid",
    gap: 24,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  card: {
    backgroundColor: "var(--hb-color-surface)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: 14,
    padding: 16,
  },
});

const Root = ({ columns, variant = "plain", className, style, children, ...rest }: StatGroupRootProps) => {
  const sx = stylex.props(columns != null ? styles.grid : styles.root);

  const dynamic: CSSProperties = {
    gridTemplateColumns: columns != null ? `repeat(${columns}, 1fr)` : undefined,
  };

  return (
    <StatGroupContext.Provider value={variant}>
      <dl
        {...rest}
        className={[sx.className, className].filter(Boolean).join(" ") || undefined}
        style={{ ...sx.style, ...dynamic, ...style }}
      >
        {children}
      </dl>
    </StatGroupContext.Provider>
  );
};

const Item = ({ value, label }: StatGroupItemProps) => {
  const variant = useContext(StatGroupContext);
  const sx = stylex.props(styles.item, variant === "card" && styles.card);

  return (
    <div {...sx}>
      <Text variant="h5" fontWeight={700} component="dd" color="primary" style={{ margin: 0 }}>
        {value}
      </Text>
      <Text variant="caption" color="text.secondary" component="dt">
        {label}
      </Text>
    </div>
  );
};

export const StatGroup = { Root, Item };
