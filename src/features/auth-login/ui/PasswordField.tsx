import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import type { AuthLoginType } from "@/features/auth-login/model";

export const PasswordField = () => {
  const { control } = useFormContext<AuthLoginType>();

  return (
    <Controller
      control={control}
      name="password"
      rules={{
        required: "Please enter your password.",
      }}
      render={({ field, fieldState }) => (
        <TextField
          sx={{
            fontSize: 14,
            "& input::placeholder": {
              fontSize: 14,
            },
          }}
          label="Password"
          placeholder="Please enter your password."
          size="small"
          type="password"
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
