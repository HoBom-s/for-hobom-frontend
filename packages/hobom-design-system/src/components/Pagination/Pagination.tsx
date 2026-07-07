import type { CSSProperties, MouseEvent } from "react";
import * as stylex from "@stylexjs/stylex";
import { paginationRange } from "./pagination-range.lib";

type PaginationShape = "rounded" | "circular";

type PaginationSize = "small" | "medium";

interface PaginationProps {
  /** Total number of pages. */
  count: number;
  /** Current page, 1-based. */
  page: number;
  onChange: (event: MouseEvent<HTMLButtonElement>, page: number) => void;
  shape?: PaginationShape;
  size?: PaginationSize;
  className?: string;
  style?: CSSProperties;
}

const styles = stylex.create({
  nav: {
    display: "flex",
    alignItems: "center",
  },
  list: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    margin: 0,
    padding: 0,
    listStyle: "none",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    padding: 0,
    borderWidth: 0,
    borderStyle: "none",
    backgroundColor: { default: "transparent", ":hover": "rgba(0, 0, 0, 0.04)" },
    color: "var(--hb-color-text-primary)",
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 500,
    cursor: "pointer",
    appearance: "none",
    outline: "none",
  },
  sizeMedium: {
    minWidth: 32,
    height: 32,
    paddingInline: 6,
    fontSize: "0.875rem",
  },
  sizeSmall: {
    minWidth: 26,
    height: 26,
    paddingInline: 4,
    fontSize: "0.75rem",
  },
  roundedMedium: { borderRadius: 8 },
  roundedSmall: { borderRadius: 6 },
  circular: { borderRadius: "50%" },
  current: {
    backgroundColor: { default: "var(--hb-color-accent)", ":hover": "var(--hb-color-accent)" },
    color: "#fff",
  },
  disabled: {
    color: "var(--hb-color-text-disabled)",
    cursor: "default",
    pointerEvents: "none",
    backgroundColor: "transparent",
  },
  ellipsis: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--hb-color-text-secondary)",
    userSelect: "none",
  },
});

const ChevronIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {direction === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
  </svg>
);

export const Pagination = ({
  count,
  page,
  onChange,
  shape = "circular",
  size = "medium",
  className,
  style,
}: PaginationProps) => {
  const items = paginationRange({ count, page });

  const isSmall = size === "small";
  const sizeStyle = isSmall ? styles.sizeSmall : styles.sizeMedium;
  const roundedStyle = isSmall ? styles.roundedSmall : styles.roundedMedium;
  const shapeStyle = shape === "rounded" ? roundedStyle : styles.circular;
  const prevDisabled = page <= 1;
  const nextDisabled = page >= count;

  const navSx = stylex.props(styles.nav);

  return (
    <nav
      aria-label="pagination"
      className={[navSx.className, className].filter(Boolean).join(" ") || undefined}
      style={{ ...navSx.style, ...style }}
    >
      <ul {...stylex.props(styles.list)}>
        <li>
          <button
            type="button"
            aria-label="Go to previous page"
            disabled={prevDisabled}
            onClick={(event) => onChange(event, page - 1)}
            {...stylex.props(
              styles.button,
              sizeStyle,
              shapeStyle,
              prevDisabled && styles.disabled,
            )}
          >
            <ChevronIcon direction="left" />
          </button>
        </li>
        {items.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <li key={`ellipsis-${index}`}>
                <span {...stylex.props(styles.ellipsis, sizeStyle)}>…</span>
              </li>
            );
          }
          const isCurrent = item === page;

          return (
            <li key={item}>
              <button
                type="button"
                aria-current={isCurrent ? "page" : undefined}
                aria-label={`Go to page ${item}`}
                onClick={(event) => onChange(event, item)}
                {...stylex.props(
                  styles.button,
                  sizeStyle,
                  shapeStyle,
                  isCurrent && styles.current,
                )}
              >
                {item}
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            aria-label="Go to next page"
            disabled={nextDisabled}
            onClick={(event) => onChange(event, page + 1)}
            {...stylex.props(
              styles.button,
              sizeStyle,
              shapeStyle,
              nextDisabled && styles.disabled,
            )}
          >
            <ChevronIcon direction="right" />
          </button>
        </li>
      </ul>
    </nav>
  );
};
