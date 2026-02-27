import { describe, it, expect } from "vitest";
import { NOTE_COLORS } from "./note-colors.lib.ts";

describe("NOTE_COLORS", () => {
  it("has 12 color entries", () => {
    expect(Object.keys(NOTE_COLORS)).toHaveLength(12);
  });

  it("has a DEFAULT color of white", () => {
    expect(NOTE_COLORS.DEFAULT).toBe("#ffffff");
  });

  it("all values are valid hex color strings", () => {
    Object.values(NOTE_COLORS).forEach((color) => {
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
});
