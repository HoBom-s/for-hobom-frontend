import { useEffect } from "react";
import * as stylex from "@stylexjs/stylex";
import { darkTheme } from "./tokens/theme.stylex";

const darkClassName = stylex.props(darkTheme).className ?? "";

/**
 * Applies the design system's dark theme to `<html>` when `isDark` is true, so
 * StyleX-styled components flip alongside the rest of the app. Drive it from
 * the app's color-scheme state.
 */
export function useColorSchemeStyles(isDark: boolean): void {
  useEffect(() => {
    const classes = darkClassName.split(" ").filter(Boolean);

    if (classes.length === 0) return;

    const root = document.documentElement;

    if (isDark) root.classList.add(...classes);
    else root.classList.remove(...classes);

    return () => root.classList.remove(...classes);
  }, [isDark]);
}
