import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { requestIdentityVerification } from "../lib/request-identity-verification.lib";
import { styles } from "./SignupFunnel.styles";

interface VerifyIdentityStepProps {
  onNext: (verificationToken: string) => void;
}

export const VerifyIdentityStep = ({ onNext }: VerifyIdentityStepProps) => {
  const [pending, setPending] = useState(false);

  const verify = async () => {
    setPending(true);

    const token = await requestIdentityVerification();

    onNext(token);
  };

  return (
    <div {...stylex.props(styles.step)}>
      <h2 {...stylex.props(styles.title)}>본인확인이 필요해요</h2>
      <p {...stylex.props(styles.subtitle)}>
        안전한 입양·임보를 위해 휴대폰 본인확인을 진행해요. 실명과 연락처는 공개되지 않아요.
      </p>

      <Hb.Button
        variant="primary"
        fullWidth
        loading={pending}
        onClick={() => void verify()}
        {...stylex.props(styles.submit)}
      >
        본인확인하고 계속
      </Hb.Button>

      <p {...stylex.props(styles.hint)}>본인확인 정보는 저장되지 않고 인증에만 사용돼요.</p>
    </div>
  );
};
