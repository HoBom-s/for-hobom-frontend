import { FormProvider, Controller } from "react-hook-form";
import { Hb } from "@/shared/ui";
import { useLegalDocumentForm } from "../model/useLegalDocumentForm";

interface LegalDocumentFormDialogProps {
  open: boolean;
  onClose: () => void;
}

const DOCUMENT_TYPE_OPTIONS = [
  { value: 1, label: "이용약관 (Terms of Service)" },
  { value: 2, label: "개인정보처리방침 (Privacy Policy)" },
] as const;

export const LegalDocumentFormDialog = ({ open, onClose }: LegalDocumentFormDialogProps) => {
  const { formMethods, handleSubmit, isPending } = useLegalDocumentForm({
    onSuccess: onClose,
  });

  return (
    <Hb.Dialog.Root open={open} onClose={onClose} size="md">
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit}>
          <Hb.Dialog.Title>새 문서 버전 등록</Hb.Dialog.Title>
          <Hb.Dialog.Content>
            <Hb.Stack spacing={2.5} sx={{ mt: 1 }}>
              <Controller
                name="type"
                render={({ field }) => (
                  <Hb.TextField
                    {...field}
                    select
                    label="문서 유형"
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                  >
                    {DOCUMENT_TYPE_OPTIONS.map((opt) => (
                      <Hb.Menu.Item key={opt.value} value={opt.value}>
                        {opt.label}
                      </Hb.Menu.Item>
                    ))}
                  </Hb.TextField>
                )}
              />
              <Controller
                name="version"
                rules={{ required: "버전을 입력해주세요." }}
                render={({ field, fieldState }) => (
                  <Hb.TextField
                    {...field}
                    label="버전"
                    placeholder="1.0"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                )}
              />
              <Controller
                name="effectiveDate"
                rules={{ required: "시행일을 입력해주세요." }}
                render={({ field, fieldState }) => (
                  <Hb.TextField
                    {...field}
                    type="date"
                    label="시행일"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    slotProps={{ inputLabel: { shrink: true } }}
                  />
                )}
              />
              <Controller
                name="content"
                rules={{ required: "내용을 입력해주세요." }}
                render={({ field, fieldState }) => (
                  <Hb.TextField
                    {...field}
                    label="내용 (Markdown)"
                    placeholder="# 이용약관..."
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    multiline
                    minRows={8}
                    slotProps={{
                      inputLabel: { shrink: true },
                      input: { sx: { fontFamily: "monospace", fontSize: 13 } },
                    }}
                  />
                )}
              />
            </Hb.Stack>
          </Hb.Dialog.Content>
          <Hb.Dialog.Actions>
            <Hb.Button variant="ghost" onClick={onClose} disabled={isPending}>
              취소
            </Hb.Button>
            <Hb.Button type="submit" variant="primary" disabled={isPending}>
              {isPending ? <Hb.Progress.Circular size={20} /> : "등록"}
            </Hb.Button>
          </Hb.Dialog.Actions>
        </form>
      </FormProvider>
    </Hb.Dialog.Root>
  );
};
