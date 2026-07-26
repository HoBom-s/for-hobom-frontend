import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { ROUTES } from "@/shared/config";
import { styles } from "./LoginForm.styles";
import type { LoginFormValues } from "../model/login-form.model";

export const PasswordField = () => {
  const { control } = useFormContext<LoginFormValues>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div {...stylex.props(styles.pwLabelRow)}>
        <span {...stylex.props(styles.labelText)}>비밀번호</span>
        <Link to={ROUTES.PASSWORD_RESET} {...stylex.props(styles.link)}>
          비밀번호 찾기
        </Link>
      </div>
      <Controller
        control={control}
        name="password"
        rules={{ required: "비밀번호를 입력해주세요." }}
        render={({ field, fieldState }) => (
          <Hb.TextField
            aria-label="비밀번호"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
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
    </div>
  );
};
