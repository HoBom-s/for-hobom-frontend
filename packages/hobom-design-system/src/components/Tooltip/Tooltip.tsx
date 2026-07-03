import { cloneElement, useId, type ReactElement, type ReactNode, type Ref } from "react";
import { createPortal } from "react-dom";
import * as stylex from "@stylexjs/stylex";
import { color, font, radius, shadow } from "../../foundations/tokens/tokens.stylex";
import { toSideAlign, type Placement } from "./tooltip-position";
import { useTooltip } from "./useTooltip";

interface TooltipProps {
  /** Tooltip content. When empty, the child renders with no tooltip. */
  title: ReactNode;
  /** Trigger element. Its ref is merged, so it must accept one. */
  children: ReactElement;
  /** Preferred side/alignment. Defaults to `"bottom"`. */
  placement?: Placement;
  /** Show a small arrow pointing at the trigger. */
  arrow?: boolean;
  /** Delay in ms before the tooltip opens. Defaults to `100`. */
  enterDelay?: number;
}

const ARROW = 8;

const styles = stylex.create({
  surface: {
    position: "fixed",
    backgroundColor: color.inverseSurface,
    color: color.onInverse,
    fontSize: font.xs,
    lineHeight: 1.4,
    paddingBlock: 4,
    paddingInline: 8,
    borderRadius: radius.sm,
    boxShadow: shadow.elevation2,
    maxWidth: 300,
    wordBreak: "break-word",
    userSelect: "none",
    pointerEvents: "none",
    zIndex: 1500,
  },
  arrow: {
    position: "absolute",
    width: 8,
    height: 8,
    backgroundColor: color.inverseSurface,
    transform: "rotate(45deg)",
  },
  arrowTop: { bottom: -4, left: "calc(50% - 4px)" },
  arrowBottom: { top: -4, left: "calc(50% - 4px)" },
  arrowLeft: { right: -4, top: "calc(50% - 4px)" },
  arrowRight: { left: -4, top: "calc(50% - 4px)" },
});

const arrowSideStyle = {
  top: styles.arrowTop,
  bottom: styles.arrowBottom,
  left: styles.arrowLeft,
  right: styles.arrowRight,
} as const;

type Handler = ((e: unknown) => void) | undefined;
const compose = (theirs: Handler, ours: () => void) => (e: unknown) => {
  theirs?.(e);
  ours();
};

function setRef(ref: Ref<HTMLElement> | undefined, node: HTMLElement | null) {
  if (typeof ref === "function") {
    ref(node);

    return;
  }
  const target = ref as { current: HTMLElement | null } | null | undefined;

  if (target) target.current = node;
}

export const Tooltip = ({
  title,
  children,
  placement = "bottom",
  arrow = false,
  enterDelay = 100,
}: TooltipProps) => {
  const id = useId();
  const { side, align } = toSideAlign(placement);
  const { open, coords, triggerRef, tooltipRef, show, hide } = useTooltip(
    side,
    align,
    arrow ? ARROW : 6,
    enterDelay,
  );

  if (title === "" || title == null) {
    return children;
  }

  const childProps = children.props as Record<string, unknown> & { ref?: Ref<HTMLElement> };

  const trigger = cloneElement(children as ReactElement<Record<string, unknown>>, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      setRef(childProps.ref, node);
    },
    onMouseEnter: compose(childProps.onMouseEnter as Handler, show),
    onMouseLeave: compose(childProps.onMouseLeave as Handler, hide),
    onFocus: compose(childProps.onFocus as Handler, show),
    onBlur: compose(childProps.onBlur as Handler, hide),
    "aria-describedby": open ? id : childProps["aria-describedby"],
  });

  const surface = stylex.props(styles.surface);

  return (
    <>
      {trigger}
      {open &&
        createPortal(
          <div
            ref={tooltipRef}
            id={id}
            role="tooltip"
            className={surface.className}
            style={{
              ...surface.style,
              top: coords?.top ?? 0,
              left: coords?.left ?? 0,
              visibility: coords ? "visible" : "hidden",
            }}
          >
            {title}
            {arrow && <span {...stylex.props(styles.arrow, arrowSideStyle[side])} />}
          </div>,
          document.body,
        )}
    </>
  );
};
