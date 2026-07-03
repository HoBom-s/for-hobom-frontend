/**
 * Public styling & theming type surface.
 *
 * Re-exports the styling/theme types and helpers that consumers still need to
 * type against directly: the `sx` prop type, the theme object, a theme
 * factory, a color-scheme hook, and a couple of component type helpers.
 *
 * This is the ONLY file in the package that pulls these from the underlying
 * styling engine, so when the components move to headless primitives the
 * change stays contained here. Do not re-export the engine anywhere else on
 * the public surface.
 */
export type { SxProps, Theme, SelectChangeEvent, SvgIconProps } from "@mui/material";
export { createTheme } from "@mui/material";
export { useColorScheme } from "@mui/material/styles";
