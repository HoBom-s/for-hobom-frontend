import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import type { AuthLoginType } from "@/entities/auth";

export const NicknameField = () => {
  const { control } = useFormContext<AuthLoginType>();

  return (
    <Controller
      control={control}
      name="nickname"
      rules={{
        required: "Please enter your nickname.",
        min: {
          value: 2,
          message: "Nickname must be at least 2 character long.",
        },
      }}
      render={({ field, fieldState }) => (
        <TextField
          sx={{
            fontSize: 14,
            "& input::placeholder": {
              fontSize: 14,
            },
          }}
          label="Nickname"
          size="small"
          placeholder="Please enter your nickname."
          fullWidth
          slotProps={{
            inputLabel: {
              size: "small",
              shrink: true,
            },
          }}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
};
