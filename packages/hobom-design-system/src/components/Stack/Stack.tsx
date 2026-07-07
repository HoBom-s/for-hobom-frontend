import {
  Children,
  cloneElement,
  createElement,
  isValidElement,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactElement,
} from "react";
import * as stylex from "@stylexjs/stylex";

type StackDirection = "row" | "column" | "row-reverse" | "column-reverse";

interface StackProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to `"div"`. */
  component?: ElementType;
  /** Flex direction. Defaults to `"column"` (matching MUI). */
  direction?: StackDirection;
  /** Gap between children, in 8px units (`spacing={2}` → 16px). */
  spacing?: number;
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  flexWrap?: CSSProperties["flexWrap"];
  /** Element rendered between each child. */
  divider?: ReactElement;
}

const styles = stylex.create({
  root: { display: "flex", boxSizing: "border-box" },
});

const SPACING_UNIT = 8;

// Interleave `divider` between children, matching MUI's Stack behavior.
const withDividers = (children: StackProps["children"], divider: ReactElement) =>
  Children.toArray(children)
    .filter((child) => child !== null && child !== undefined)
    .flatMap((child, index) =>
      index === 0 ? [child] : [cloneElement(divider, { key: `divider-${index}` }), child],
    );

export const Stack = ({
  component = "div",
  direction = "column",
  spacing,
  alignItems,
  justifyContent,
  flexWrap,
  divider,
  className,
  style,
  children,
  ...rest
}: StackProps) => {
  const sx = stylex.props(styles.root);

  const dynamic: CSSProperties = {
    flexDirection: direction,
    gap: spacing != null ? spacing * SPACING_UNIT : undefined,
    alignItems,
    justifyContent,
    flexWrap,
  };

  return createElement(
    component,
    {
      ...rest,
      className: [sx.className, className].filter(Boolean).join(" ") || undefined,
      style: { ...sx.style, ...dynamic, ...style },
    },
    divider && isValidElement(divider) ? withDividers(children, divider) : children,
  );
};
