export type OriginVertical = "top" | "center" | "bottom";
export type OriginHorizontal = "left" | "center" | "right";

export interface PopoverOrigin {
  vertical: OriginVertical;
  horizontal: OriginHorizontal;
}

export interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Coords {
  top: number;
  left: number;
}

export interface Viewport {
  width: number;
  height: number;
}

const VERTICAL_FACTOR: Record<OriginVertical, number> = { top: 0, center: 0.5, bottom: 1 };
const HORIZONTAL_FACTOR: Record<OriginHorizontal, number> = { left: 0, center: 0.5, right: 1 };

const verticalOffset = (v: OriginVertical, size: number): number => VERTICAL_FACTOR[v] * size;

const horizontalOffset = (h: OriginHorizontal, size: number): number => HORIZONTAL_FACTOR[h] * size;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), Math.max(min, max));

/**
 * Viewport-space top-left (for `position: fixed`) of a popover whose
 * `transformOrigin` point is aligned to the `anchorOrigin` point of the anchor,
 * then clamped to stay within `margin` of the viewport edges.
 *
 * Pure: given the anchor box, the popover size, the two origins and the
 * viewport, it returns where the popover's top-left corner goes.
 */
export function computePopoverPosition(
  anchor: Rect,
  popover: Size,
  anchorOrigin: PopoverOrigin,
  transformOrigin: PopoverOrigin,
  viewport: Viewport,
  margin = 16,
): Coords {
  const anchorX = anchor.left + horizontalOffset(anchorOrigin.horizontal, anchor.width);
  const anchorY = anchor.top + verticalOffset(anchorOrigin.vertical, anchor.height);

  const left = anchorX - horizontalOffset(transformOrigin.horizontal, popover.width);
  const top = anchorY - verticalOffset(transformOrigin.vertical, popover.height);

  return {
    left: clamp(left, margin, viewport.width - popover.width - margin),
    top: clamp(top, margin, viewport.height - popover.height - margin),
  };
}
