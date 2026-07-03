import { describe, expect, it } from "vitest";
import { computeAnchorPosition, toSideAlign } from "./tooltip-position";

const trigger = { top: 100, left: 200, width: 40, height: 20 };
const floating = { width: 80, height: 30 };

describe("toSideAlign", () => {
  it("maps a bare side to center alignment", () => {
    expect(toSideAlign("top")).toEqual({ side: "top", align: "center" });
  });
  it("splits side-align placements", () => {
    expect(toSideAlign("bottom-start")).toEqual({ side: "bottom", align: "start" });
    expect(toSideAlign("right-end")).toEqual({ side: "right", align: "end" });
  });
});

describe("computeAnchorPosition", () => {
  it("places above and horizontally centered on side=top", () => {
    // top: 100 - 30 - 6 = 64 ; left: 200 + 40/2 - 80/2 = 180
    expect(computeAnchorPosition(trigger, floating, "top", "center", 6)).toEqual({
      top: 64,
      left: 180,
    });
  });

  it("places below on side=bottom", () => {
    // top: 100 + 20 + 6 = 126
    expect(computeAnchorPosition(trigger, floating, "bottom", "center", 6).top).toBe(126);
  });

  it("places to the right, vertically centered", () => {
    // left: 200 + 40 + 6 = 246 ; top: 100 + 20/2 - 30/2 = 95
    expect(computeAnchorPosition(trigger, floating, "right", "center", 6)).toEqual({
      top: 95,
      left: 246,
    });
  });

  it("aligns the near edge on align=start", () => {
    expect(computeAnchorPosition(trigger, floating, "bottom", "start", 6).left).toBe(200);
  });

  it("aligns the far edge on align=end", () => {
    // left: 200 + 40 - 80 = 160
    expect(computeAnchorPosition(trigger, floating, "bottom", "end", 6).left).toBe(160);
  });

  it("honors the offset on the main axis", () => {
    expect(computeAnchorPosition(trigger, floating, "top", "center", 12).top).toBe(58);
  });
});
