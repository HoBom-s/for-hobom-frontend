import { Controller, useFormContext } from "react-hook-form";
import { Hb } from "hobom-design-system";
import { isValidNickname } from "../lib/validate-signup.lib";
import type { SignupFormValues } from "../model/signup-form.model";

export const NicknameField = () => {
  const { control } = useFormContext<SignupFormValues>();

  return (
    <Controller
      control={control}
      name="nickname"
      rules={{
        validate: (value) =>
          isValidNickname(value) || "닉네임은 2~20자의 한글/영문/숫자/_/- 만 쓸 수 있어요.",
      }}
      render={({ field, fieldState }) => (
        <Hb.TextField
          label="닉네임 (공개)"
          placeholder="봄이네"
          value={field.value}
          onChange={field.onChange}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message}
          fullWidth
        />
      )}
    />
  );
};
