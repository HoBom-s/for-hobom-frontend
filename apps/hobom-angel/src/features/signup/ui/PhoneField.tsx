import { Controller, useFormContext } from "react-hook-form";
import { Hb } from "hobom-design-system";
import { isValidPhone } from "../lib/validate-signup.lib";
import type { SignupFormValues } from "../model/signup-form.model";

export const PhoneField = () => {
  const { control } = useFormContext<SignupFormValues>();

  return (
    <Controller
      control={control}
      name="phone"
      rules={{
        validate: (value) =>
          isValidPhone(value) || "휴대폰 번호는 010으로 시작하는 11자리 숫자예요.",
      }}
      render={({ field, fieldState }) => (
        <Hb.TextField
          label="휴대폰"
          type="tel"
          inputMode="numeric"
          placeholder="01012345678"
          value={field.value}
          // The server wants digits only (010XXXXXXXX); strip separators as typed.
          onChange={(event) => field.onChange(event.target.value.replace(/\D/g, ""))}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message}
          fullWidth
        />
      )}
    />
  );
};
