// @vitest-environment happy-dom
import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SCHEME_ATTR } from "./tokens/css-vars";
import { useColorSchemeStyles } from "./color-scheme";

describe("useColorSchemeStyles", () => {
  it("sets the scheme attribute on <html> when dark", () => {
    renderHook(() => useColorSchemeStyles(true));
    expect(document.documentElement.getAttribute(SCHEME_ATTR)).toBe("dark");
  });

  it("removes it when switched to light", () => {
    const { rerender } = renderHook(({ dark }) => useColorSchemeStyles(dark), {
      initialProps: { dark: true },
    });

    rerender({ dark: false });
    expect(document.documentElement.hasAttribute(SCHEME_ATTR)).toBe(false);
  });
});
