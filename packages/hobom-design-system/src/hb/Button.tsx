import {
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
  IconButton as MuiIconButton,
  type IconButtonProps as MuiIconButtonProps,
} from "@mui/material";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

const VARIANT_MAP: Record<
  ButtonVariant,
  { variant: MuiButtonProps["variant"]; color: MuiButtonProps["color"] }
> = {
  primary: { variant: "contained", color: "primary" },
  secondary: { variant: "outlined", color: "primary" },
  danger: { variant: "contained", color: "error" },
  ghost: { variant: "text", color: "inherit" },
};

interface ButtonProps extends Omit<MuiButtonProps, "variant" | "color"> {
  variant?: ButtonVariant;
}

const ButtonBase = ({ variant = "primary", ...props }: ButtonProps) => {
  const mapped = VARIANT_MAP[variant];

  return <MuiButton variant={mapped.variant} color={mapped.color} {...props} />;
};

interface IconButtonProps extends Omit<MuiIconButtonProps, "color"> {
  variant?: "default" | "danger";
}

const Icon = ({ variant = "default", ...props }: IconButtonProps) => (
  <MuiIconButton
    color={variant === "danger" ? "error" : "default"}
    {...props}
  />
);

export const Button = Object.assign(ButtonBase, { Icon });
