import {
  createContext,
  createElement,
  useContext,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import * as stylex from "@stylexjs/stylex";

type TableSize = "small" | "medium";

interface TableContextValue {
  size: TableSize;
  stickyHeader: boolean;
}

const TableContext = createContext<TableContextValue>({ size: "medium", stickyHeader: false });
const HeadContext = createContext(false);

const styles = stylex.create({
  container: { width: "100%", overflowX: "auto" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderSpacing: 0,
  },
  cell: {
    paddingBlock: 16,
    paddingInline: 16,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "var(--hb-color-border)",
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "0.875rem",
    lineHeight: 1.43,
    color: "var(--hb-color-text-primary)",
    textAlign: "left",
    verticalAlign: "inherit",
  },
  cellSmall: { paddingBlock: 6, paddingInline: 16 },
  headCell: {
    fontWeight: 600,
    color: "var(--hb-color-text-secondary)",
    whiteSpace: "nowrap",
  },
  headCellSticky: {
    position: "sticky",
    top: 0,
    zIndex: 2,
    backgroundColor: "var(--hb-color-surface)",
  },
  rowHover: {
    backgroundColor: { default: "transparent", ":hover": "rgba(0, 0, 0, 0.04)" },
  },
});

const cx = (a: string | undefined, b: string | undefined): string | undefined =>
  [a, b].filter(Boolean).join(" ") || undefined;

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  component?: ElementType;
  /** Forwarded to `component` (e.g. Paper's `variant`). */
  variant?: string;
  children?: ReactNode;
}

const Container = ({ component, className, style, children, ...rest }: ContainerProps) => {
  const sx = stylex.props(styles.container);
  const props = {
    ...rest,
    className: cx(sx.className, className),
    style: { ...sx.style, ...style },
  };

  return component ? createElement(component, props, children) : <div {...props}>{children}</div>;
};

interface RootProps extends HTMLAttributes<HTMLTableElement> {
  size?: TableSize;
  stickyHeader?: boolean;
}

const Root = ({
  size = "medium",
  stickyHeader = false,
  className,
  style,
  children,
  ...rest
}: RootProps) => {
  const sx = stylex.props(styles.table);

  return (
    <TableContext.Provider value={{ size, stickyHeader }}>
      <table {...rest} className={cx(sx.className, className)} style={{ ...sx.style, ...style }}>
        {children}
      </table>
    </TableContext.Provider>
  );
};

const Head = ({ children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) => (
  <HeadContext.Provider value={true}>
    <thead {...rest}>{children}</thead>
  </HeadContext.Provider>
);

const Body = ({ children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody {...rest}>{children}</tbody>
);

interface RowProps extends HTMLAttributes<HTMLTableRowElement> {
  hover?: boolean;
  selected?: boolean;
}

const Row = ({ hover = false, selected = false, className, style, children, ...rest }: RowProps) => {
  const sx = stylex.props(hover && styles.rowHover);

  return (
    <tr
      {...rest}
      aria-selected={selected || undefined}
      className={cx(sx.className, className)}
      style={style}
    >
      {children}
    </tr>
  );
};

interface CellProps extends Omit<TdHTMLAttributes<HTMLTableCellElement>, "align"> {
  align?: "left" | "center" | "right";
  /** `th` scope, forwarded when the cell renders inside a `Table.Head`. */
  scope?: ThHTMLAttributes<HTMLTableCellElement>["scope"];
  width?: number | string;
}

const Cell = ({ align, scope, width, className, style, children, ...rest }: CellProps) => {
  const { size, stickyHeader } = useContext(TableContext);
  const isHead = useContext(HeadContext);
  const sx = stylex.props(
    styles.cell,
    size === "small" && styles.cellSmall,
    isHead && styles.headCell,
    isHead && stickyHeader && styles.headCellSticky,
  );

  const dynamic: CSSProperties = { ...sx.style };

  if (align) dynamic.textAlign = align;
  if (width != null) dynamic.width = width;

  const props = {
    ...rest,
    className: cx(sx.className, className),
    style: { ...dynamic, ...style },
  };

  return isHead ? (
    <th scope={scope} {...props}>
      {children}
    </th>
  ) : (
    <td {...props}>{children}</td>
  );
};

export const Table = { Root, Container, Head, Body, Row, Cell };
