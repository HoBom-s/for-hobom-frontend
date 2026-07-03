export type Side = "top" | "right" | "bottom" | "left";
export type Align = "start" | "center" | "end";
export type Placement =
  | Side
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";

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

function alignOf(part: string | undefined): Align {
  if (part === "start") return "start";
  if (part === "end") return "end";

  return "center";
}

/** Split a `side` or `side-align` placement into its side and alignment. */
export function toSideAlign(placement: Placement): { side: Side; align: Align } {
  const [side, part] = placement.split("-") as [Side, string | undefined];

  return { side, align: alignOf(part) };
}

function crossAxis(start: number, triggerSize: number, floatingSize: number, align: Align): number {
  if (align === "start") return start;
  if (align === "end") return start + triggerSize - floatingSize;

  return start + triggerSize / 2 - floatingSize / 2;
}

/**
 * Viewport-space coordinates for a floating element anchored to a trigger.
 * Pure: given the two boxes, a side, an alignment and a gap, it returns where
 * the floating element's top-left corner goes (for `position: fixed`).
 */
export function computeAnchorPosition(
  trigger: Rect,
  floating: Size,
  side: Side,
  align: Align,
  offset: number,
): Coords {
  let top = 0;
  let left = 0;

  switch (side) {
    case "top":
      top = trigger.top - floating.height - offset;
      left = crossAxis(trigger.left, trigger.width, floating.width, align);
      break;
    case "bottom":
      top = trigger.top + trigger.height + offset;
      left = crossAxis(trigger.left, trigger.width, floating.width, align);
      break;
    case "left":
      left = trigger.left - floating.width - offset;
      top = crossAxis(trigger.top, trigger.height, floating.height, align);
      break;
    case "right":
      left = trigger.left + trigger.width + offset;
      top = crossAxis(trigger.top, trigger.height, floating.height, align);
      break;
  }

  return { top, left };
}
