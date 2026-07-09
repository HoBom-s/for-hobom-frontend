import { Controller, useFormContext } from "react-hook-form";
import type { AuthLoginType } from "@/entities/auth";
import { Hb } from "@/shared/ui";

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
        <Hb.TextField
          label="닉네임"
          size="small"
          placeholder="닉네임을 입력해주세요."
          fullWidth
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    />
  );
};
