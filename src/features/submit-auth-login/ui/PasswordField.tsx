import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";
import type { AuthLoginType } from "@/entities/auth";

export const PasswordField = () => {
  const { control } = useFormContext<AuthLoginType>();

  return (
    <Controller
      control={control}
      name="password"
      rules={{
        required: "비밀번호를 입력해 주세요.",
      }}
      render={({ field, fieldState }) => (
        <TextField
          sx={{
            fontSize: 14,
            "& input::placeholder": {
              fontSize: 14,
            },
          }}
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요."
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
