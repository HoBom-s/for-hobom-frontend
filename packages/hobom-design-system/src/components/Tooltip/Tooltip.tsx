import {
  cloneElement,
  useId,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { createPortal } from "react-dom";
import { primitives } from "../../foundations/tokens";
import { toSideAlign, type Placement, type Side } from "./tooltip-position";
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

// The tooltip is an inverse surface — intentionally dark in both color schemes,
// so it reads a fixed primitive rather than a scheme-dependent semantic token.
const SURFACE = primitives.color.slate[800];
const ARROW = 8;

const contentBaseStyle: CSSProperties = {
  position: "fixed",
  backgroundColor: SURFACE,
  color: primitives.color.white,
  fontSize: primitives.fontSize.xs,
  lineHeight: 1.4,
  padding: `${primitives.space[1]}px ${primitives.space[2]}px`,
  borderRadius: primitives.radius.sm,
  boxShadow: primitives.shadow.elevation2,
  maxWidth: 300,
  wordBreak: "break-word",
  userSelect: "none",
  pointerEvents: "none",
  zIndex: 1500,
};

// An 8px square rotated 45°, tucked half-out of the edge opposite the side.
function arrowStyle(side: Side): CSSProperties {
  const base: CSSProperties = {
    position: "absolute",
    width: ARROW,
    height: ARROW,
    backgroundColor: SURFACE,
    transform: "rotate(45deg)",
  };
  const inset = -ARROW / 2;
  const centered = `calc(50% - ${ARROW / 2}px)`;

  switch (side) {
    case "top":
      return { ...base, bottom: inset, left: centered };
    case "bottom":
      return { ...base, top: inset, left: centered };
    case "left":
      return { ...base, right: inset, top: centered };
    case "right":
      return { ...base, left: inset, top: centered };
  }
}

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

  return (
    <>
      {trigger}
      {open &&
        createPortal(
          <div
            ref={tooltipRef}
            id={id}
            role="tooltip"
            style={{
              ...contentBaseStyle,
              top: coords?.top ?? 0,
              left: coords?.left ?? 0,
              visibility: coords ? "visible" : "hidden",
            }}
          >
            {title}
            {arrow && <span style={arrowStyle(side)} />}
          </div>,
          document.body,
        )}
    </>
  );
};
