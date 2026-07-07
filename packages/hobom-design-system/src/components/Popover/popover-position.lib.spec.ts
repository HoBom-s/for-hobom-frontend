import { describe, expect, it } from "vitest";
import { computePopoverPosition, type PopoverOrigin } from "./popover-position.lib";

const anchor = { top: 100, left: 200, width: 80, height: 40 };
const popover = { width: 120, height: 100 };
const viewport = { width: 1000, height: 800 };
const BOTTOM_LEFT: PopoverOrigin = { vertical: "bottom", horizontal: "left" };
const TOP_LEFT: PopoverOrigin = { vertical: "top", horizontal: "left" };

describe("computePopoverPosition", () => {
  it("drops below the anchor's bottom-left by default", () => {
    expect(computePopoverPosition(anchor, popover, BOTTOM_LEFT, TOP_LEFT, viewport)).toEqual({
      top: 140, // anchor.top + height
      left: 200, // anchor.left
    });
  });

  it("aligns the popover's right edge when horizontal origins are right", () => {
    const right: PopoverOrigin = { vertical: "bottom", horizontal: "right" };

    expect(computePopoverPosition(anchor, popover, right, right, viewport)).toEqual({
      // anchorY = 140; transformOrigin bottom subtracts popover.height: 140 - 100
      top: 40,
      left: 160, // anchor.left + width - popover.width = 200 + 80 - 120
    });
  });

  it("centers horizontally when both origins are center", () => {
    const center: PopoverOrigin = { vertical: "bottom", horizontal: "center" };

    expect(computePopoverPosition(anchor, popover, center, center, viewport)).toEqual({
      // anchorY = 140; transformOrigin bottom subtracts popover.height: 140 - 100
      top: 40,
      // anchorX = 200 + 40 = 240; left = 240 - 60 = 180
      left: 180,
    });
  });

  it("stacks above the anchor when transformOrigin is bottom", () => {
    const bottom: PopoverOrigin = { vertical: "bottom", horizontal: "left" };

    // anchorY = 140, top = 140 - popover.height(100) = 40
    expect(computePopoverPosition(anchor, popover, bottom, bottom, viewport).top).toBe(40);
  });

  it("clamps to the viewport margin when it would overflow the right edge", () => {
    const nearEdge = { top: 100, left: 950, width: 40, height: 20 };

    expect(computePopoverPosition(nearEdge, popover, BOTTOM_LEFT, TOP_LEFT, viewport).left).toBe(
      864, // viewport.width - popover.width - margin = 1000 - 120 - 16
    );
  });

  it("clamps to the top/left margin when it would overflow negatively", () => {
    const nearOrigin = { top: 4, left: 4, width: 20, height: 10 };
    const bottomRight: PopoverOrigin = { vertical: "bottom", horizontal: "right" };
    const result = computePopoverPosition(nearOrigin, popover, bottomRight, bottomRight, viewport);

    expect(result.left).toBe(16);
    expect(result.top).toBe(16);
  });
});
