import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { VisibilityOffOutlined, VisibilityOutlined } from "hobom-design-system/icons";
import { styles } from "./LoginForm.styles";
import type { LoginFormValues } from "../model/login-form.model";

export const PasswordField = () => {
  const { control } = useFormContext<LoginFormValues>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div {...stylex.props(styles.pwLabelRow)}>
        <span {...stylex.props(styles.labelText)}>비밀번호</span>
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
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <VisibilityOffOutlined style={{ fontSize: 20 }} />
                  ) : (
                    <VisibilityOutlined style={{ fontSize: 20 }} />
                  )}
                </button>
              ),
            }}
          />
        )}
      />
    </div>
  );
};
