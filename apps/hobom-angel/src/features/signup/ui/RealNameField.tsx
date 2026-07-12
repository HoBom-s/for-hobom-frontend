import { Controller, useFormContext } from "react-hook-form";
import { Hb } from "hobom-design-system";
import { isValidRealName } from "../lib/validate-signup.lib";
import type { SignupFormValues } from "../model/signup-form.model";

export const RealNameField = () => {
  const { control } = useFormContext<SignupFormValues>();

  return (
    <Controller
      control={control}
      name="realName"
      rules={{ validate: (value) => isValidRealName(value) || "실명을 입력해주세요." }}
      render={({ field, fieldState }) => (
        <Hb.TextField
          label="실명"
          placeholder="김민수"
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
