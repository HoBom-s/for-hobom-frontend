import { Hb } from "@/shared/ui";

interface RemoveMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  onConfirm: () => void;
  isPending: boolean;
}

export const RemoveMemberDialog = ({
  isOpen,
  onClose,
  memberName,
  onConfirm,
  isPending,
}: RemoveMemberDialogProps) => (
  <Hb.Dialog.Root open={isOpen} onClose={onClose} size="xs">
    <Hb.Dialog.Title>멤버 제거</Hb.Dialog.Title>
    <Hb.Dialog.Content>
      <Hb.Text variant="body2" color="text.secondary">
        <strong>"{memberName}"</strong> 님을 프로젝트에서 제거하시겠어요?
      </Hb.Text>
    </Hb.Dialog.Content>
    <Hb.Dialog.Actions style={{
      paddingLeft: 24,
      paddingRight: 24,
      paddingBottom: 16
    }}>
      <Hb.Button variant="secondary" onClick={onClose}>
        취소
      </Hb.Button>
      <Hb.Button variant="danger" onClick={onConfirm} loading={isPending}>
        제거
      </Hb.Button>
    </Hb.Dialog.Actions>
  </Hb.Dialog.Root>
);
