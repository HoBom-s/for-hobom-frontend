// @vitest-environment happy-dom
import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import * as stylex from "@stylexjs/stylex";
import { darkTheme } from "./tokens/theme.stylex";
import { useColorSchemeStyles } from "./color-scheme";

const darkClasses = (stylex.props(darkTheme).className ?? "").split(" ").filter(Boolean);

describe("useColorSchemeStyles", () => {
  it("applies a non-empty dark theme class", () => {
    expect(darkClasses.length).toBeGreaterThan(0);
  });

  it("adds the dark theme class to <html> when dark", () => {
    renderHook(() => useColorSchemeStyles(true));
    for (const c of darkClasses) {
      expect(document.documentElement.classList.contains(c)).toBe(true);
    }
  });

  it("removes it when switched to light", () => {
    const { rerender } = renderHook(({ dark }) => useColorSchemeStyles(dark), {
      initialProps: { dark: true },
    });

    rerender({ dark: false });
    for (const c of darkClasses) {
      expect(document.documentElement.classList.contains(c)).toBe(false);
    }
  });
});
