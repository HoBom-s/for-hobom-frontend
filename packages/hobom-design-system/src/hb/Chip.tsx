import { Chip as MuiChip, type ChipProps as MuiChipProps } from "@mui/material";

type ChipVariant = "filled" | "outlined" | "soft";

interface ChipProps extends Omit<MuiChipProps, "variant"> {
  variant?: ChipVariant;
}

export const Chip = ({ variant = "filled", sx, ...props }: ChipProps) => {
  if (variant === "soft") {
    return (
      <MuiChip
        variant="filled"
        sx={{ opacity: 0.8, fontWeight: 500, ...sx }}
        {...props}
      />
    );
  }

  return <MuiChip variant={variant} sx={sx} {...props} />;
};
