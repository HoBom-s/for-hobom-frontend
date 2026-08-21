import { useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { useStartInquiry } from "../model/useStartInquiry";
import { styles } from "./InquiryDialog.styles";

interface InquiryDialogProps {
  animalId: string;
  animalName: string;
  onClose: () => void;
}

/** Compose the first message of a shelter inquiry about an animal. Sending opens
 *  the thread and navigates there. */
export const InquiryDialog = ({ animalId, animalName, onClose }: InquiryDialogProps) => {
  const [message, setMessage] = useState("");
  const { start, starting } = useStartInquiry(animalId, onClose);

  const canSubmit = message.trim().length > 0 && !starting;

  const onSubmit = () => {
    if (!canSubmit) return;

    start(message.trim());
  };

  return (
    <Hb.Dialog.Root open onClose={onClose} size="sm">
      <Hb.Dialog.Title>보호소에 문의하기</Hb.Dialog.Title>
      <Hb.Dialog.Content dividers>
        <p {...stylex.props(styles.intro)}>
          {animalName}에 대해 궁금한 점을 남겨주세요. 보호소가 확인 후 답변해요.
        </p>
        <Hb.TextField
          placeholder="예: 이 아이는 아이들과 잘 지내나요? 방문 상담도 가능할까요?"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          multiline
          minRows={4}
          fullWidth
          autoFocus
        />
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions>
        <Hb.Button variant="ghost" onClick={onClose}>
          취소
        </Hb.Button>
        <Hb.Button variant="primary" onClick={onSubmit} disabled={!canSubmit} loading={starting}>
          문의 보내기
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
