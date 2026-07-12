import { Controller, useForm } from "react-hook-form";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { HttpError } from "@/shared/api";
import { isValidEmail, isValidNickname } from "../lib/validate-signup.lib";
import { useSignup } from "../model/useSignup";
import { styles } from "./SignupFunnel.styles";

interface ProfileStepProps {
  verificationToken: string;
  onDone: () => void;
}

interface ProfileForm {
  nickname: string;
  email: string;
}

export const ProfileStep = ({ verificationToken, onDone }: ProfileStepProps) => {
  const { control, handleSubmit, setError } = useForm<ProfileForm>({
    mode: "onChange",
    defaultValues: { nickname: "", email: "" },
  });
  const { mutateAsync, isPending } = useSignup();

  const submit = handleSubmit(async ({ nickname, email }) => {
    try {
      await mutateAsync({ verificationToken, nickname: nickname.trim(), email: email.trim() });

      onDone();
    } catch (error) {
      const message =
        error instanceof HttpError
          ? error.message
          : "가입에 실패했어요. 잠시 후 다시 시도해주세요.";

      setError("nickname", { message });
    }
  });

  return (
    <form {...stylex.props(styles.step)} onSubmit={submit} noValidate>
      <h2 {...stylex.props(styles.title)}>정보를 입력해주세요</h2>
      <p {...stylex.props(styles.subtitle)}>공개되는 닉네임과 연락받을 이메일이에요.</p>

      <div {...stylex.props(styles.fields)}>
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
      </div>

      <Hb.Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isPending}
        {...stylex.props(styles.submit)}
      >
        가입 완료
      </Hb.Button>
    </form>
  );
};
