import { createContext, useContext, type HTMLAttributes, type ReactNode } from "react";
import * as stylex from "@stylexjs/stylex";
import { Text } from "../Text/Text";

type DescriptionListLayout = "grid" | "stacked";

const DescriptionListContext = createContext<DescriptionListLayout>("grid");

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "minmax(96px, max-content) 1fr",
    columnGap: 20,
    rowGap: 12,
    alignItems: "baseline",
  },
  stacked: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  stackedItem: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  dd: {
    minWidth: 0,
    overflowWrap: "break-word",
  },
});

interface RootProps extends HTMLAttributes<HTMLDListElement> {
  /** `"grid"` (aligned term/description columns) or `"stacked"` (each pair
   *  stacked vertically). Defaults to `"grid"`. */
  layout?: DescriptionListLayout;
  children?: ReactNode;
}

const Root = ({ layout = "grid", className, style, children, ...rest }: RootProps) => {
  const sx = stylex.props(layout === "grid" ? styles.grid : styles.stacked);

  return (
    <DescriptionListContext.Provider value={layout}>
      <dl
        {...rest}
        className={[sx.className, className].filter(Boolean).join(" ") || undefined}
        style={{ ...sx.style, ...style }}
      >
        {children}
      </dl>
    </DescriptionListContext.Provider>
  );
};

interface ItemProps {
  /** The term (label) — rendered as the `<dt>`. */
  term: ReactNode;
  /** The description — rendered as the `<dd>`. */
  children?: ReactNode;
}

const Item = ({ term, children }: ItemProps) => {
  const layout = useContext(DescriptionListContext);
  const dt = (
    <Text variant="body2" color="text.secondary" component="dt">
      {term}
    </Text>
  );
  const dd = (
    <Text variant="body1" component="dd" {...stylex.props(styles.dd)}>
      {children}
    </Text>
  );

  if (layout === "stacked") {
    return (
      <div {...stylex.props(styles.stackedItem)}>
        {dt}
        {dd}
      </div>
    );
  }

  return (
    <>
      {dt}
      {dd}
    </>
  );
};

export const DescriptionList = { Root, Item };
