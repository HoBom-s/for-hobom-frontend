import { describe, expect, it } from "vitest";
import { applyCta } from "./apply-cta.lib";

describe("applyCta", () => {
  it("lets an available animal be applied for, with a foster option", () => {
    expect(applyCta("AVAILABLE")).toEqual({
      primaryLabel: "입양 신청하기",
      primaryEnabled: true,
      showFoster: true,
    });
  });

  it("disables the CTA for every non-available status", () => {
    for (const status of ["RESERVED", "FOSTERED", "ADOPTED", "RETURNED"] as const) {
      const cta = applyCta(status);

      expect(cta.primaryEnabled).toBe(false);
      expect(cta.showFoster).toBe(false);
    }
  });

  it("labels the branch per the design", () => {
    expect(applyCta("FOSTERED").primaryLabel).toBe("임시보호 중");
    expect(applyCta("ADOPTED").primaryLabel).toBe("입양 완료");
    expect(applyCta("RESERVED").primaryLabel).toBe("신청 마감");
  });
});
