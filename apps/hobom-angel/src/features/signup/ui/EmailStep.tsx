import { useState, type FormEvent } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { isValidEmail } from "../lib/validate-signup.lib";
import { styles } from "./SignupFunnel.styles";

interface EmailStepProps {
  onNext: (email: string) => void;
}

export const EmailStep = ({ onNext }: EmailStepProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError("올바른 이메일 형식이 아니에요.");

      return;
    }

    onNext(email.trim());
  };

  return (
    <form {...stylex.props(styles.step)} onSubmit={submit} noValidate>
      <h2 {...stylex.props(styles.title)}>이메일로 시작하기</h2>
      <p {...stylex.props(styles.subtitle)}>인증 코드를 보내드릴 이메일을 입력해주세요.</p>

      <Hb.TextField
        label="이메일"
        type="email"
        placeholder="hobom@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={Boolean(error)}
        helperText={error}
        fullWidth
      />

      <Hb.Button type="submit" variant="primary" fullWidth {...stylex.props(styles.submit)}>
        인증 메일 보내기
      </Hb.Button>

      <p {...stylex.props(styles.hint)}>비용이 들지 않아요. 스팸함도 확인해주세요.</p>
    </form>
  );
};
