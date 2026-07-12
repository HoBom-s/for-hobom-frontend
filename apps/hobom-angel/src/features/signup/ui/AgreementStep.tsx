import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { styles } from "./SignupFunnel.styles";

interface AgreementStepProps {
  onNext: () => void;
}

type AgreementKey = "terms" | "privacy" | "age" | "marketing";

const ROWS: { key: AgreementKey; label: string; required: boolean; hasView: boolean }[] = [
  { key: "terms", label: "이용약관", required: true, hasView: true },
  { key: "privacy", label: "개인정보 수집·이용", required: true, hasView: true },
  { key: "age", label: "만 19세 이상", required: true, hasView: false },
  { key: "marketing", label: "마케팅·알림 수신", required: false, hasView: true },
];

const REQUIRED_KEYS: AgreementKey[] = ["terms", "privacy", "age"];

export const AgreementStep = ({ onNext }: AgreementStepProps) => {
  const [agreed, setAgreed] = useState<Record<AgreementKey, boolean>>({
    terms: false,
    privacy: false,
    age: false,
    marketing: false,
  });

  const allChecked = ROWS.every((row) => agreed[row.key]);
  const requiredMet = REQUIRED_KEYS.every((key) => agreed[key]);

  const toggle = (key: AgreementKey) => setAgreed((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleAll = () => {
    const next = !allChecked;

    setAgreed({ terms: next, privacy: next, age: next, marketing: next });
  };

  return (
    <div {...stylex.props(styles.step)}>
      <h2 {...stylex.props(styles.title)}>환영해요</h2>
      <p {...stylex.props(styles.subtitle)}>시작하기 전에 약관에 동의해주세요.</p>

      <label {...stylex.props(styles.agreeAll)}>
        <Hb.Checkbox checked={allChecked} onChange={toggleAll} />
        전체 동의
      </label>

      {ROWS.map((row) => (
        <label key={row.key} {...stylex.props(styles.agreeRow)}>
          <Hb.Checkbox checked={agreed[row.key]} onChange={() => toggle(row.key)} />
          <span {...stylex.props(styles.agreeLabel)}>
            <span {...stylex.props(row.required ? undefined : styles.optionalTag)}>
              [{row.required ? "필수" : "선택"}]
            </span>{" "}
            {row.label}
          </span>
          {row.hasView && <span {...stylex.props(styles.agreeView)}>보기</span>}
        </label>
      ))}

      <Hb.Button
        variant="primary"
        fullWidth
        disabled={!requiredMet}
        onClick={onNext}
        {...stylex.props(styles.submit)}
      >
        동의하고 계속
      </Hb.Button>
    </div>
  );
};
