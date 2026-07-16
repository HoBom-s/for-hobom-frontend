import { useState } from "react";
import { Hb } from "hobom-design-system";
import { validateNickname } from "@/entities/user";
import { useChangeNickname } from "../model/useChangeNickname";

interface NicknameDialogProps {
  current: string;
  onClose: () => void;
}

/** Edit the nickname with instant client-side validation, then PATCH it. */
export const NicknameDialog = ({ current, onClose }: NicknameDialogProps) => {
  const [value, setValue] = useState(current);
  const mutation = useChangeNickname(onClose);

  const error = validateNickname(value);
  const unchanged = value.trim() === current;
  const touched = value.length > 0;

  const submit = () => {
    if (error || unchanged) return;
    mutation.mutate(value.trim());
  };

  return (
    <Hb.Dialog.Root open onClose={onClose} size="xs">
      <Hb.Dialog.Title>닉네임 변경</Hb.Dialog.Title>
      <Hb.Dialog.Content dividers>
        <Hb.TextField
          label="닉네임"
          placeholder="봄이네"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          error={touched && Boolean(error)}
          helperText={touched && error ? error : "2~20자의 한글/영문/숫자/_/-"}
          fullWidth
          autoFocus
        />
      </Hb.Dialog.Content>
      <Hb.Dialog.Actions>
        <Hb.Button variant="ghost" onClick={onClose}>
          취소
        </Hb.Button>
        <Hb.Button
          variant="primary"
          onClick={submit}
          disabled={Boolean(error) || unchanged}
          loading={mutation.isPending}
        >
          저장
        </Hb.Button>
      </Hb.Dialog.Actions>
    </Hb.Dialog.Root>
  );
};
