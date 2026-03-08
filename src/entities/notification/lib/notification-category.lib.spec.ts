import { describe, it, expect } from "vitest";
import { NOTIFICATION_CATEGORY } from "./notification-category.lib";

describe("NOTIFICATION_CATEGORY", () => {
  it("SYSTEM 카테고리가 존재한다", () => {
    expect(NOTIFICATION_CATEGORY.SYSTEM).toBeDefined();
  });

  it("label, color, bgColor 필드를 가진다", () => {
    const { label, color, bgColor } = NOTIFICATION_CATEGORY.SYSTEM;
    expect(label).toBe("시스템");
    expect(color).toBeDefined();
    expect(bgColor).toBeDefined();
  });

  it("color와 bgColor가 유효한 hex 형식이다", () => {
    const hexPattern = /^#[0-9a-f]{6}$/;
    expect(NOTIFICATION_CATEGORY.SYSTEM.color).toMatch(hexPattern);
    expect(NOTIFICATION_CATEGORY.SYSTEM.bgColor).toMatch(hexPattern);
  });
});
