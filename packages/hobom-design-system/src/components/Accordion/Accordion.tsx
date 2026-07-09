import {
  createContext,
  useContext,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import * as stylex from "@stylexjs/stylex";

interface AccordionContextValue {
  expanded: boolean;
  toggle: (event: MouseEvent<HTMLButtonElement>) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const styles = stylex.create({
  root: {
    overflow: "hidden",
    backgroundColor: "var(--hb-color-surface)",
    color: "var(--hb-color-text-primary)",
  },
  outlined: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--hb-color-border)",
    borderRadius: 8,
  },
  elevation: {
    borderRadius: 8,
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.06), 0 2px 12px rgba(0, 0, 0, 0.03)",
  },
  summary: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    boxSizing: "border-box",
    paddingBlock: 12,
    paddingInline: 16,
    borderWidth: 0,
    borderStyle: "none",
    backgroundColor: { default: "transparent", ":hover": "rgba(0, 0, 0, 0.02)" },
    color: "inherit",
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "0.875rem",
    textAlign: "left",
    cursor: "pointer",
    appearance: "none",
    outline: "none",
  },
  summaryContent: { flex: 1, minWidth: 0 },
  icon: {
    display: "inline-flex",
    alignItems: "center",
    color: "var(--hb-color-text-secondary)",
    transition: "transform 0.2s ease",
  },
  iconExpanded: { transform: "rotate(180deg)" },
  detailsOuter: {
    display: "grid",
    transition: "grid-template-rows 0.25s ease",
  },
  detailsOpen: { gridTemplateRows: "1fr" },
  detailsClosed: { gridTemplateRows: "0fr" },
  detailsInner: { overflow: "hidden", minHeight: 0 },
  detailsContent: { padding: "8px 16px 16px" },
});

const cx = (a: string | undefined, b: string | undefined): string | undefined =>
  [a, b].filter(Boolean).join(" ") || undefined;

type Variant = "outlined" | "elevation";

interface RootProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (event: MouseEvent<HTMLButtonElement>, expanded: boolean) => void;
  variant?: Variant;
  /** No-op kept for API compatibility (gutters are not added). */
  disableGutters?: boolean;
}

const Root = ({
  expanded: expandedProp,
  defaultExpanded = false,
  onChange,
  variant = "outlined",
  disableGutters: _disableGutters,
  className,
  style,
  children,
  ...rest
}: RootProps) => {
  const [internal, setInternal] = useState(defaultExpanded);
  const isControlled = expandedProp !== undefined;
  const expanded = isControlled ? expandedProp : internal;

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    if (!isControlled) setInternal((prev) => !prev);
    onChange?.(event, !expanded);
  };

  const sx = stylex.props(styles.root, variant === "outlined" ? styles.outlined : styles.elevation);

  return (
    <AccordionContext.Provider value={{ expanded, toggle }}>
      <div {...rest} className={cx(sx.className, className)} style={{ ...sx.style, ...style }}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

interface SummaryProps extends HTMLAttributes<HTMLButtonElement> {
  expandIcon?: ReactNode;
}

const Summary = ({ expandIcon, className, style, children, ...rest }: SummaryProps) => {
  const ctx = useContext(AccordionContext);
  const expanded = ctx?.expanded ?? false;
  const sx = stylex.props(styles.summary);

  return (
    <button
      type="button"
      aria-expanded={expanded}
      {...rest}
      className={cx(sx.className, className)}
      style={{ ...sx.style, ...style }}
      onClick={ctx?.toggle}
    >
      <span {...stylex.props(styles.summaryContent)}>{children}</span>
      {expandIcon != null && (
        <span {...stylex.props(styles.icon, expanded && styles.iconExpanded)}>{expandIcon}</span>
      )}
    </button>
  );
};

const Details = ({ className, style, children, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  const ctx = useContext(AccordionContext);
  const expanded = ctx?.expanded ?? false;
  const outerSx = stylex.props(
    styles.detailsOuter,
    expanded ? styles.detailsOpen : styles.detailsClosed,
  );
  const contentSx = stylex.props(styles.detailsContent);

  return (
    <div className={outerSx.className} style={outerSx.style}>
      <div {...stylex.props(styles.detailsInner)}>
        <div
          {...rest}
          className={cx(contentSx.className, className)}
          style={{ ...contentSx.style, ...style }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const Accordion = { Root, Summary, Details };
