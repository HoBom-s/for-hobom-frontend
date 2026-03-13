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
        required: "닉네임을 입력해주세요.",
        min: {
          value: 2,
          message: "닉네임은 최소 두글자 이상이에요.",
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
          label="닉네임"
          size="small"
          placeholder="닉네임을 입력해주세요."
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
