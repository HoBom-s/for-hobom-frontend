import { Controller, useFormContext } from "react-hook-form";
import type { AuthLoginType } from "@/entities/auth";
import { Hb } from "@/shared/ui";

export const EmailField = () => {
  const { control } = useFormContext<AuthLoginType>();

  return (
    <Controller
      control={control}
      name="email"
      rules={{
        required: "이메일을 입력해주세요.",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "올바른 이메일 형식이 아니에요.",
        },
      }}
      render={({ field, fieldState }) => (
        <Hb.TextField
          sx={{
            fontSize: 14,
            "& input::placeholder": {
              fontSize: 14,
            },
          }}
          label="이메일"
          size="small"
          placeholder="이메일을 입력해주세요."
          type="email"
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
