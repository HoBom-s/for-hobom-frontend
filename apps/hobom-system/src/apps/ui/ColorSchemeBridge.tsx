import { useColorScheme, useColorSchemeStyles } from "@/shared/ui";

/**
 * Keeps the design system's StyleX dark theme in sync with MUI's color scheme,
 * so StyleX-styled components flip together with the MUI ones. Renders nothing.
 */
export const ColorSchemeBridge = () => {
  const { mode, systemMode } = useColorScheme();
  const resolved = mode === "system" ? systemMode : mode;

  useColorSchemeStyles(resolved === "dark");

  return null;
};
