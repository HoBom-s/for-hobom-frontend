import { Controller, useFormContext } from "react-hook-form";
import type { AuthLoginType } from "@/entities/auth";
import { Hb } from "@/shared/ui";

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
        <Hb.TextField
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요."
          size="small"
          type="password"
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
