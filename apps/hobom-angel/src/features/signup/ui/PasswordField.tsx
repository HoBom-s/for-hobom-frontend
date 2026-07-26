import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { isValidPassword } from "../lib/validate-signup.lib";
import { styles } from "./SignupFunnel.styles";
import type { SignupFormValues } from "../model/signup-form.model";

export const PasswordField = () => {
  const { control } = useFormContext<SignupFormValues>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      name="password"
      rules={{
        validate: (value) =>
          isValidPassword(value) || "비밀번호는 영문과 숫자를 포함해 8자 이상이어야 해요.",
      }}
      render={({ field, fieldState }) => (
        <Hb.TextField
          label="비밀번호"
          type={showPassword ? "text" : "password"}
          placeholder="영문·숫자 조합 8자 이상"
          value={field.value}
          onChange={field.onChange}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message}
          fullWidth
          InputProps={{
            endAdornment: (
              <button
                type="button"
                {...stylex.props(styles.toggle)}
                onClick={() => setShowPassword((value) => !value)}
              >
                {showPassword ? "숨기기" : "보기"}
              </button>
            ),
          }}
        />
      )}
    />
  );
};
