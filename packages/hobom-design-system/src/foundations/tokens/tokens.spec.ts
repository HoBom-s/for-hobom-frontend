import { describe, expect, it } from "vitest";
import { primitives } from "./primitives";
import { semantic } from "./semantic";

/**
 * Palette lock (Astryx "neutral" theme).
 *
 * Pins every semantic token to its exact hex so the rendered palette can't
 * drift unintentionally. To change a value, update this test deliberately
 * alongside the token.
 */
describe("semantic palette — Astryx neutral", () => {
  it("light", () => {
    const c = semantic.light.color;

    expect(c.brand.main).toBe("#262626");
    expect(c.brand.light).toBe("#525252");
    expect(c.brand.dark).toBe("#0a0a0a");
    expect(c.brand.contrast).toBe("#ffffff");
    expect(c.neutral.main).toBe("#737373");
    expect(c.neutral.contrast).toBe("#ffffff");
    expect(c.success.main).toBe("#007004");
    expect(c.success.subtle).toBe("#c5e5c0");
    expect(c.warning.main).toBe("#745b00");
    expect(c.warning.subtle).toBe("#f8da9d");
    expect(c.danger.main).toBe("#a50c25");
    expect(c.bg.canvas).toBe("#f1f1f1");
    expect(c.bg.surface).toBe("#ffffff");
    expect(c.text.primary).toBe("#171717");
    expect(c.text.secondary).toBe("#737373");
    expect(c.border.default).toBe("#ebebeb");
  });

  it("dark", () => {
    const c = semantic.dark.color;

    expect(c.brand.main).toBe("#ebebeb");
    expect(c.brand.light).toBe("#d4d4d4");
    expect(c.brand.dark).toBe("#fafafa");
    expect(c.brand.contrast).toBe("#171717");
    expect(c.neutral.main).toBe("#a3a3a3");
    expect(c.neutral.contrast).toBe("#171717");
    expect(c.success.main).toBe("#9fe59b");
    expect(c.success.subtle).toBe("#84c9803d");
    expect(c.warning.main).toBe("#fdcf4f");
    expect(c.warning.subtle).toBe("#deb4333d");
    expect(c.danger.main).toBe("#ffc6c1");
    expect(c.bg.canvas).toBe("#1b1b1b");
    expect(c.bg.surface).toBe("#262626");
    expect(c.text.primary).toBe("#fafafa");
    expect(c.text.secondary).toBe("#a3a3a3");
    expect(c.border.default).toBe("#ffffff1a");
  });

  it("sidebar is fixed across schemes", () => {
    expect(semantic.light.color.bg.sidebar).toBe("#1d2630");
    expect(semantic.dark.color.bg.sidebar).toBe("#1d2630");
  });
});

describe("primitives non-color zero-pixel", () => {
  it("radius / shape", () => {
    expect(primitives.radius.md).toBe(8); // theme.shape.borderRadius, buttons/inputs
    expect(primitives.radius.sm).toBe(6); // Chip
  });

  it("typography", () => {
    expect(primitives.fontFamily).toBe(
      "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    );
    expect(primitives.fontSize.md).toBe("1rem"); // h6
    expect(primitives.fontSize.base).toBe("0.875rem"); // body1/button
    expect(primitives.fontSize.sm).toBe("0.8125rem"); // body2
    expect(primitives.fontSize.xs).toBe("0.75rem"); // caption
    expect(primitives.fontWeight.semibold).toBe(600); // h6
    expect(primitives.fontWeight.medium).toBe(500); // button/tab/chip
  });

  it("layout", () => {
    expect(primitives.layout.drawerWidth).toBe(240);
    expect(primitives.layout.drawerWidthCollapsed).toBe(64);
    expect(primitives.layout.appbarHeight).toBe(56);
  });

  it("shadow strings preserved", () => {
    expect(primitives.shadow.brandGlow).toBe("0 4px 12px rgba(0, 0, 0, 0.18)");
    expect(primitives.shadow.elevation1).toBe(
      "0 1px 4px rgba(0,0,0,0.06), 0 2px 12px rgba(0,0,0,0.03)",
    );
  });
});
