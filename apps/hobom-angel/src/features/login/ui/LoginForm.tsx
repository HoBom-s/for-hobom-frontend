import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { HttpError } from "@/shared/api";
import { useLogin } from "../model/useLogin";
import { styles } from "./LoginForm.styles";
import { LoginBrandPanel } from "./LoginBrandPanel";
import { EmailField } from "./EmailField";
import { PasswordField } from "./PasswordField";
import type { LoginFormValues } from "../model/login-form.model";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const methods = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });
  const { mutateAsync, isPending } = useLogin();

  const submit = methods.handleSubmit(async ({ email, password }) => {
    methods.clearErrors("root");

    try {
      await mutateAsync({ email: email.trim(), password });

      void navigate("/");
    } catch (error) {
      const message =
        error instanceof HttpError
          ? error.message
          : "로그인에 실패했어요. 잠시 후 다시 시도해주세요.";

      methods.setError("root", { message });
    }
  });

  const rootError = methods.formState.errors.root?.message;

  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.card)}>
        <LoginBrandPanel />

        <FormProvider {...methods}>
          <form {...stylex.props(styles.form)} onSubmit={submit} noValidate>
            <h2 {...stylex.props(styles.title)}>다시 오셨네요</h2>
            <p {...stylex.props(styles.subtitle)}>이메일로 로그인해주세요.</p>

            <div {...stylex.props(styles.fields)}>
              <EmailField />
              <PasswordField />
            </div>

            <label {...stylex.props(styles.remember)}>
              <Hb.Checkbox checked={rememberMe} onChange={() => setRememberMe((value) => !value)} />
              로그인 상태 유지
            </label>

            {rootError && <p {...stylex.props(styles.formError)}>{rootError}</p>}

            <Hb.Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isPending}
              {...stylex.props(styles.submit)}
            >
              로그인
            </Hb.Button>

            <div {...stylex.props(styles.divider)}>
              <span {...stylex.props(styles.dividerLine)} />
              또는
              <span {...stylex.props(styles.dividerLine)} />
            </div>

            <p {...stylex.props(styles.signup)}>
              아직 회원이 아니신가요?{" "}
              <Link to="/signup" {...stylex.props(styles.signupLink)}>
                이메일로 가입하기
              </Link>
            </p>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
