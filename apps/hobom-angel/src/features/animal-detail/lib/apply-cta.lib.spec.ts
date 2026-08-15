import { describe, expect, it } from "vitest";
import { applyCta } from "./apply-cta.lib";

const BOTH = ["ADOPTION", "FOSTER"] as const;

describe("applyCta", () => {
  it("offers 입양(primary) + 임보(secondary) when an available animal takes both", () => {
    expect(applyCta("AVAILABLE", [...BOTH])).toEqual({
      primaryLabel: "입양 신청하기",
      primaryEnabled: true,
      primaryKind: "ADOPTION",
      showFoster: true,
    });
  });

  it("hides the foster option for an adoption-only animal", () => {
    expect(applyCta("AVAILABLE", ["ADOPTION"])).toEqual({
      primaryLabel: "입양 신청하기",
      primaryEnabled: true,
      primaryKind: "ADOPTION",
      showFoster: false,
    });
  });

  it("makes 임보 the primary action for a foster-only animal", () => {
    expect(applyCta("AVAILABLE", ["FOSTER"])).toEqual({
      primaryLabel: "임시보호 신청하기",
      primaryEnabled: true,
      primaryKind: "FOSTER",
      showFoster: false,
    });
  });

  it("disables the CTA for every non-available status", () => {
    for (const status of ["RESERVED", "FOSTERED", "ADOPTED", "RETURNED"] as const) {
      const cta = applyCta(status, [...BOTH]);

      expect(cta.primaryEnabled).toBe(false);
      expect(cta.showFoster).toBe(false);
    }
  });

  it("labels the branch per the design", () => {
    expect(applyCta("FOSTERED", [...BOTH]).primaryLabel).toBe("임시보호 중");
    expect(applyCta("ADOPTED", [...BOTH]).primaryLabel).toBe("입양 완료");
    expect(applyCta("RESERVED", [...BOTH]).primaryLabel).toBe("신청 마감");
  });
});
