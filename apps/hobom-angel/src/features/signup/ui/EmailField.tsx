import { Controller, useFormContext } from "react-hook-form";
import { Hb } from "hobom-design-system";
import { isValidEmail } from "../lib/validate-signup.lib";
import type { SignupFormValues } from "../model/signup-form.model";

export const EmailField = () => {
  const { control } = useFormContext<SignupFormValues>();

  return (
    <Controller
      control={control}
      name="email"
      rules={{ validate: (value) => isValidEmail(value) || "올바른 이메일 형식이 아니에요." }}
      render={({ field, fieldState }) => (
        <Hb.TextField
          label="이메일"
          type="email"
          placeholder="hobom@example.com"
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
