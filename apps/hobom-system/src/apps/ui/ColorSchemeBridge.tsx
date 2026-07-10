import { useColorScheme, useColorSchemeStyles } from "@/shared/ui";

/**
 * Keeps the design system's StyleX dark theme in sync with the resolved
 * color-scheme mode, so StyleX-styled components flip together. Renders nothing.
 */
export const ColorSchemeBridge = () => {
  const { mode, systemMode } = useColorScheme();
  const resolved = mode === "system" ? systemMode : mode;

  useColorSchemeStyles(resolved === "dark");

  return null;
};
