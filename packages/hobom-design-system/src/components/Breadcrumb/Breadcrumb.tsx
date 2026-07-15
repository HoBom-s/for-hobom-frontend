import {
  Children,
  type HTMLAttributes,
  type LiHTMLAttributes,
  type ReactNode,
} from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  root: {
    fontSize: "0.8125rem",
    color: "var(--hb-color-text-secondary)",
  },
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  item: {
    display: "inline-flex",
    alignItems: "center",
    color: "var(--hb-color-text-secondary)",
  },
  current: {
    color: "var(--hb-color-text-primary)",
    fontWeight: 600,
  },
  separator: {
    display: "inline-flex",
    alignItems: "center",
    color: "var(--hb-color-text-disabled)",
    userSelect: "none",
  },
});

interface RootProps extends HTMLAttributes<HTMLElement> {
  /** Node rendered between items. Defaults to `"/"`. */
  separator?: ReactNode;
  children?: ReactNode;
}

const Root = ({
  separator = "/",
  "aria-label": ariaLabel = "위치",
  className,
  style,
  children,
  ...rest
}: RootProps) => {
  const sx = stylex.props(styles.root);
  const sepSx = stylex.props(styles.separator);

  const items = Children.toArray(children).flatMap((child, index) =>
    index === 0
      ? [child]
      : [
          <li key={`separator-${index}`} aria-hidden="true" {...sepSx}>
            {separator}
          </li>,
          child,
        ],
  );

  return (
    <nav
      aria-label={ariaLabel}
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      <ol {...stylex.props(styles.list)}>{items}</ol>
    </nav>
  );
};

interface ItemProps extends LiHTMLAttributes<HTMLLIElement> {
  /** Marks the current location — sets `aria-current="page"` and primary styling. */
  current?: boolean;
  children?: ReactNode;
}

const Item = ({ current = false, className, style, children, ...rest }: ItemProps) => {
  const sx = stylex.props(styles.item, current && styles.current);

  return (
    <li
      aria-current={current ? "page" : undefined}
      {...rest}
      className={[sx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...sx.style, ...style }}
    >
      {children}
    </li>
  );
};

export const Breadcrumb = { Root, Item };
