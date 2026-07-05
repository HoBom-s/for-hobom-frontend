import { useEffect } from "react";
import { SCHEME_ATTR, colorSchemeCss } from "./tokens/css-vars";

/**
 * Injects the design system's `--hb-*` color variables. Render once near the
 * app root (and inside Storybook) so components and consumer styles can read
 * `var(--hb-color-*)`.
 */
export const ColorSchemeVars = () => (
  <style dangerouslySetInnerHTML={{ __html: colorSchemeCss }} />
);

/**
 * Sets the scheme attribute on `<html>` so the `--hb-*` vars flip to dark.
 * Drive it from the app's color-scheme state.
 */
export function useColorSchemeStyles(isDark: boolean): void {
  useEffect(() => {
    const root = document.documentElement;

    if (isDark) root.setAttribute(SCHEME_ATTR, "dark");
    else root.removeAttribute(SCHEME_ATTR);

    return () => root.removeAttribute(SCHEME_ATTR);
  }, [isDark]);
}
