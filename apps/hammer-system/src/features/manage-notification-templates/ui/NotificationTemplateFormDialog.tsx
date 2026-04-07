import { FormProvider, Controller } from "react-hook-form";
import { Hb } from "@/shared/ui";
import type { NotificationTemplateType } from "@/entities/notification-template";
import { useNotificationTemplateForm } from "../model/useNotificationTemplateForm";

interface NotificationTemplateFormDialogProps {
  open: boolean;
  editingTemplate: NotificationTemplateType | null;
  onClose: () => void;
}

const CHANNEL_OPTIONS = [
  { value: "Both", label: "Push + In-App" },
  { value: "Push", label: "Push" },
  { value: "InApp", label: "In-App" },
] as const;

export const NotificationTemplateFormDialog = ({
  open,
  editingTemplate,
  onClose,
}: NotificationTemplateFormDialogProps) => {
  const { formMethods, handleSubmit, isEditing, isPending } = useNotificationTemplateForm({
    editingTemplate,
    onSuccess: onClose,
  });

  return (
    <Hb.Dialog.Root open={open} onClose={onClose} size="sm">
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit}>
          <Hb.Dialog.Title>{isEditing ? "템플릿 수정" : "템플릿 생성"}</Hb.Dialog.Title>
          <Hb.Dialog.Content>
            <Hb.Stack spacing={2.5} sx={{ mt: 1 }}>
              <Controller
                name="templateKey"
                rules={{ required: "Template Key를 입력해주세요." }}
                render={({ field, fieldState }) => (
                  <Hb.TextField
                    {...field}
                    label="Template Key"
                    placeholder="auction_new_item"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                )}
              />
              <Controller
                name="titleTemplate"
                rules={{ required: "Title Template을 입력해주세요." }}
                render={({ field, fieldState }) => (
                  <Hb.TextField
                    {...field}
                    label="Title Template"
                    placeholder="새로운 경매 상품: {itemName}"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? "플레이스홀더: {변수명}"}
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                )}
              />
              <Controller
                name="bodyTemplate"
                rules={{ required: "Body Template을 입력해주세요." }}
                render={({ field, fieldState }) => (
                  <Hb.TextField
                    {...field}
                    label="Body Template"
                    placeholder="{itemName}에 대한 새로운 경매가 시작되었습니다."
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    multiline
                    minRows={3}
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                )}
              />
              <Controller
                name="channel"
                render={({ field }) => (
                  <Hb.TextField
                    {...field}
                    select
                    label="Channel"
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                  >
                    {CHANNEL_OPTIONS.map((opt) => (
                      <Hb.Menu.Item key={opt.value} value={opt.value}>
                        {opt.label}
                      </Hb.Menu.Item>
                    ))}
                  </Hb.TextField>
                )}
              />
            </Hb.Stack>
          </Hb.Dialog.Content>
          <Hb.Dialog.Actions>
            <Hb.Button variant="ghost" onClick={onClose} disabled={isPending}>
              취소
            </Hb.Button>
            <Hb.Button type="submit" variant="primary" disabled={isPending}>
              {isPending && <Hb.Progress.Circular size={20} />}
              {!isPending && (isEditing ? "수정" : "생성")}
            </Hb.Button>
          </Hb.Dialog.Actions>
        </form>
      </FormProvider>
    </Hb.Dialog.Root>
  );
};
