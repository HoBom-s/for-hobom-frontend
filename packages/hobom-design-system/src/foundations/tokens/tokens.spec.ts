import { describe, expect, it } from "vitest";
import { primitives } from "./primitives";
import { semantic } from "./semantic";

/**
 * Zero-pixel lock.
 *
 * Pins every semantic token to the exact hex currently used in theme.ts, 1:1.
 * When the next PR refactors theme.ts to consume these tokens, this test
 * guarantees the rendered output does not change. To change a value in
 * theme.ts, this test must be updated deliberately first.
 */
describe("semantic ↔ theme.ts palette zero-pixel", () => {
  it("light", () => {
    const c = semantic.light.color;

    expect(c.brand.main).toBe("#4680ff");
    expect(c.brand.light).toBe("#94baff");
    expect(c.brand.dark).toBe("#2a5bd7");
    expect(c.brand.contrast).toBe("#ffffff");
    expect(c.neutral.main).toBe("#5b6a98");
    expect(c.neutral.contrast).toBe("#ffffff");
    expect(c.success.main).toBe("#2ca87f");
    expect(c.success.subtle).toBe("#e8f5e9");
    expect(c.warning.main).toBe("#e58a00");
    expect(c.warning.subtle).toBe("#fff3e0");
    expect(c.danger.main).toBe("#dc2626");
    expect(c.bg.canvas).toBe("#f0f2f5");
    expect(c.bg.surface).toBe("#ffffff");
    expect(c.text.primary).toBe("#2d3748");
    expect(c.text.secondary).toBe("#4a5568");
    expect(c.border.default).toBe("#d0d5dd");
  });

  it("dark", () => {
    const c = semantic.dark.color;

    expect(c.brand.main).toBe("#5b93ff");
    expect(c.brand.light).toBe("#94baff");
    expect(c.brand.dark).toBe("#3a6de0");
    expect(c.brand.contrast).toBe("#ffffff");
    expect(c.neutral.main).toBe("#8a9bc8");
    expect(c.neutral.contrast).toBe("#ffffff");
    expect(c.success.main).toBe("#34c793");
    expect(c.success.subtle).toBe("#1a3a2a");
    expect(c.warning.main).toBe("#f5a623");
    expect(c.warning.subtle).toBe("#3a2d1a");
    expect(c.danger.main).toBe("#ef4444");
    expect(c.bg.canvas).toBe("#111827");
    expect(c.bg.surface).toBe("#1e293b");
    expect(c.text.primary).toBe("#e2e8f0");
    expect(c.text.secondary).toBe("#94a3b8");
    expect(c.border.default).toBe("#334155");
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
    expect(primitives.shadow.brandGlow).toBe(
      "0 4px 12px rgba(70, 128, 255, 0.35)",
    );
    expect(primitives.shadow.elevation1).toBe(
      "0 1px 4px rgba(0,0,0,0.06), 0 2px 12px rgba(0,0,0,0.03)",
    );
  });
});
