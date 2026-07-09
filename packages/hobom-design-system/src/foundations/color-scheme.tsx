import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { SCHEME_ATTR, colorSchemeCss } from "./tokens/css-vars";

/**
 * Injects the design system's `--hb-*` color variables. Render once near the
 * app root (and inside Storybook) so components and consumer styles can read
 * `var(--hb-color-*)`.
 */
export const ColorSchemeVars = () => <style dangerouslySetInnerHTML={{ __html: colorSchemeCss }} />;

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

export type ColorSchemeMode = "light" | "dark" | "system";

type ResolvedScheme = "light" | "dark";

interface ColorSchemeContextValue {
  /** The user's selection: `"light"`, `"dark"`, or `"system"`. */
  mode: ColorSchemeMode;
  /** The OS preference, used when `mode` is `"system"`. */
  systemMode: ResolvedScheme;
  setMode: (mode: ColorSchemeMode) => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextValue | null>(null);

const STORAGE_KEY = "hb-color-scheme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const readStoredMode = (): ColorSchemeMode => {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(STORAGE_KEY);

  return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
};

const subscribeSystem = (onChange: () => void): (() => void) => {
  const media = window.matchMedia(DARK_QUERY);

  media.addEventListener("change", onChange);

  return () => media.removeEventListener("change", onChange);
};

const getSystemMode = (): ResolvedScheme =>
  typeof window !== "undefined" && window.matchMedia(DARK_QUERY).matches ? "dark" : "light";

interface ColorSchemeProviderProps {
  children: ReactNode;
  /** Initial mode when nothing is stored. Defaults to `"system"`. */
  defaultMode?: ColorSchemeMode;
}

export const ColorSchemeProvider = ({ children, defaultMode }: ColorSchemeProviderProps) => {
  const [mode, setModeState] = useState<ColorSchemeMode>(() => {
    const stored = readStoredMode();

    return stored === "system" && defaultMode ? defaultMode : stored;
  });

  const getServerSystemMode = (): ResolvedScheme => "light";
  const systemMode = useSyncExternalStore(subscribeSystem, getSystemMode, getServerSystemMode);

  const setMode = useCallback((next: ColorSchemeMode) => {
    setModeState(next);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo<ColorSchemeContextValue>(
    () => ({ mode, systemMode, setMode }),
    [mode, systemMode, setMode],
  );

  return <ColorSchemeContext.Provider value={value}>{children}</ColorSchemeContext.Provider>;
};

/** Read/set the app color scheme. Must be used under a `ColorSchemeProvider`. */
export function useColorScheme(): ColorSchemeContextValue {
  const ctx = useContext(ColorSchemeContext);

  if (!ctx) throw new Error("useColorScheme must be used within a ColorSchemeProvider");

  return ctx;
}
