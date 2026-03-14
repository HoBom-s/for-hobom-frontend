import { useFormContext } from "react-hook-form";
import type { FutureMessageSendSchemaType } from "@/entities/future-message";
import { Hb } from "@/shared/ui";

interface Props {
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const FutureMessageContentFunnel = ({ onPrevStep, onNextStep }: Props) => {
  const { setValue, watch } = useFormContext<FutureMessageSendSchemaType>();

  return (
    <Hb.Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Hb.Box>
        <Hb.Text fontWeight={700} sx={{ fontSize: 22, mb: 0.5 }}>
          내용을 입력해 주세요
        </Hb.Text>
        <Hb.Text variant="body2" color="text.secondary">
          어떤 내용으로 보낼까요?
        </Hb.Text>
      </Hb.Box>

      <Hb.Form.Control fullWidth>
        <Hb.TextField
          fullWidth
          multiline
          minRows={4}
          label="내용"
          value={watch("content")}
          onChange={(evt) => setValue("content", evt.target.value)}
        />
        <Hb.Form.Helper>전하고 싶은 말을 자유롭게 작성해 주세요.</Hb.Form.Helper>
      </Hb.Form.Control>

      <Hb.Box display="flex" gap={1.5}>
        <Hb.Button fullWidth variant="secondary" onClick={onPrevStep}>
          이전
        </Hb.Button>
        <Hb.Button
          fullWidth
          variant="primary"
          disabled={watch("content") === ""}
          onClick={onNextStep}
        >
          다음
        </Hb.Button>
      </Hb.Box>
    </Hb.Box>
  );
};
