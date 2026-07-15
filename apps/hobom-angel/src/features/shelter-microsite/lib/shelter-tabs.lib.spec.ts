import { describe, expect, it } from "vitest";
import { isShelterTab } from "./shelter-tabs.lib";

describe("isShelterTab", () => {
  it("accepts the known tab values", () => {
    expect(isShelterTab("about")).toBe(true);
    expect(isShelterTab("animals")).toBe(true);
    expect(isShelterTab("notices")).toBe(true);
    expect(isShelterTab("volunteer")).toBe(true);
    expect(isShelterTab("faq")).toBe(true);
  });

  it("rejects unknown values and null", () => {
    expect(isShelterTab("stats")).toBe(false);
    expect(isShelterTab(null)).toBe(false);
  });
});
