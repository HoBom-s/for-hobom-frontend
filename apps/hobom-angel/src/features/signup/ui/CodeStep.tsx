import { useState, type ChangeEvent, type FormEvent } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { isValidCode } from "../lib/validate-signup.lib";
import { styles } from "./SignupFunnel.styles";

interface CodeStepProps {
  onNext: () => void;
}

const BOXES = [0, 1, 2, 3, 4, 5];

export const CodeStep = ({ onNext }: CodeStepProps) => {
  const [code, setCode] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) =>
    setCode(event.target.value.replace(/\D/g, "").slice(0, 6));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValidCode(code)) onNext();
  };

  return (
    <form {...stylex.props(styles.step)} onSubmit={submit}>
      <h2 {...stylex.props(styles.title)}>코드를 입력해주세요</h2>
      <p {...stylex.props(styles.subtitle)}>메일로 받은 6자리를 입력하세요.</p>

      <div {...stylex.props(styles.codeWrap)}>
        <input
          {...stylex.props(styles.codeInput)}
          inputMode="numeric"
          autoComplete="one-time-code"
          aria-label="인증코드"
          maxLength={6}
          value={code}
          onChange={onChange}
          autoFocus
        />
        {BOXES.map((index) => (
          <div
            key={index}
            {...stylex.props(styles.codeBox, index === code.length && styles.codeBoxActive)}
          >
            {code[index] ?? ""}
          </div>
        ))}
      </div>

      <p {...stylex.props(styles.codeMeta)}>
        남은 시간 4:52 ·{" "}
        <button type="button" {...stylex.props(styles.resend)}>
          재전송
        </button>
      </p>

      <Hb.Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={!isValidCode(code)}
        {...stylex.props(styles.submit)}
      >
        확인
      </Hb.Button>
    </form>
  );
};
