import { Typography, type TypographyProps } from "@mui/material";

type TextPreset =
  | "h1"
  | "h2"
  | "h3"
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "overline";

const PRESET_MAP: Record<TextPreset, Partial<TypographyProps>> = {
  h1: { variant: "h4", fontWeight: 700 },
  h2: { variant: "h5", fontWeight: 600 },
  h3: { variant: "h6", fontWeight: 600 },
  title: { variant: "subtitle1", fontWeight: 600 },
  subtitle: { variant: "subtitle2" },
  body: { variant: "body1" },
  caption: { variant: "caption", color: "text.secondary" },
  overline: { variant: "overline" },
};

export interface TextProps extends Omit<TypographyProps, "variant"> {
  preset?: TextPreset;
  variant?: TypographyProps["variant"];
}

export const Text = ({ preset, ...props }: TextProps) => {
  const presetProps = preset ? PRESET_MAP[preset] : {};

  return <Typography {...presetProps} {...props} />;
};
