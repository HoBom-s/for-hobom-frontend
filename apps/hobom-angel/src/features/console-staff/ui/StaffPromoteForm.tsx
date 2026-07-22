import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { styles } from "./ConsoleStaff.styles";

interface StaffPromoteFormProps {
  onPromote: (candidateUserId: string) => void;
  pending: boolean;
}

/** Open a promotion request for a member by their id (대표 approves it). */
export const StaffPromoteForm = ({ onPromote, pending }: StaffPromoteFormProps) => {
  const [userId, setUserId] = useState("");
  const canSubmit = userId.trim().length > 0 && !pending;

  const submit = () => {
    if (!canSubmit) return;

    onPromote(userId.trim());
    setUserId("");
  };

  return (
    <section {...stylex.props(styles.card)}>
      <h3 {...stylex.props(styles.cardTitle)}>승격 요청</h3>
      <p {...stylex.props(styles.cardSubtitle)}>일반회원 → 스태프 · 승인 주체: 보호소 대표</p>

      <Hb.TextField
        value={userId}
        placeholder="승격할 회원 ID"
        onChange={(event) => setUserId(event.target.value)}
      />
      <div {...stylex.props(styles.actions)}>
        <Hb.Button variant="primary" onClick={submit} disabled={!canSubmit} loading={pending}>
          승격 요청
        </Hb.Button>
      </div>

      <p {...stylex.props(styles.note)}>
        신뢰 위임: 플랫폼이 대표를 문서 심사로 검증하고, 대표가 스태프를 승인해요. 별도 KYC 없이 권한이
        부여됩니다.
      </p>
    </section>
  );
};
