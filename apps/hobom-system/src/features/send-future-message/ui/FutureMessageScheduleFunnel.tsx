import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useMutation, useDataLot } from "hobom-data";
import { DatePicker } from "hobom-design-system/date-pickers";
import { Bom } from "hobom-utils";
import {
  type FutureMessageSendSchemaType,
  validateFutureMessageSendInput,
  postFutureMessage,
  futureMessageQueries,
} from "@/entities/future-message";
import { handleValidationResult } from "@/shared/lib";
import { useToast } from "@/shared/model";
import { RoutesConfig } from "@/shared/config";
import { Hb } from "@/shared/ui";

interface Props {
  onPrevStep: () => void;
}

export const FutureMessageScheduleFunnel = ({ onPrevStep }: Props) => {
  const { setValue, watch, getValues } = useFormContext<FutureMessageSendSchemaType>();
  const { openWarnToast, openSuccessToast, openErrorToast } = useToast();
  const dataLot = useDataLot();
  const sendFutureMessageMutationHandler = useMutation({
    mutationFn: postFutureMessage,
  });
  const navigate = useNavigate();

  return (
    <Hb.Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <Hb.Box>
        <Hb.Text
          fontWeight={700}
          style={{
            fontSize: 22,
            marginBottom: 4,
          }}
        >
          날짜를 선택해 주세요
        </Hb.Text>
        <Hb.Text variant="body2" color="text.secondary">
          언제 메시지를 보낼까요?
        </Hb.Text>
      </Hb.Box>
      <Hb.Form.Control fullWidth>
        <DatePicker
          label="보낼 날짜"
          style={{ width: "100%" }}
          onChange={(date) => {
            if (!date) return;
            setValue("scheduledAt", format(date, "yyyy-MM-dd"));
          }}
        />
        <Hb.Form.Helper>발송 예정일을 선택해 주세요.</Hb.Form.Helper>
      </Hb.Form.Control>
      <Hb.Box
        style={{
          display: "flex",
          gap: 12,
        }}
      >
        <Hb.Button fullWidth variant="secondary" onClick={onPrevStep}>
          이전
        </Hb.Button>
        <Hb.Button
          fullWidth
          variant="primary"
          disabled={watch("scheduledAt") === ""}
          loading={sendFutureMessageMutationHandler.isPending}
          onClick={() => {
            const futureMessageRequest = getValues();

            Bom.pipe(futureMessageRequest, validateFutureMessageSendInput, (validated) =>
              handleValidationResult(
                validated,
                (error) => {
                  openWarnToast({ message: error.message });
                },
                (payload) => {
                  sendFutureMessageMutationHandler.mutate(payload, {
                    onSuccess: async () => {
                      await dataLot.invalidateQueries({
                        queryKey: futureMessageQueries.futureMessages(),
                      });
                      openSuccessToast({
                        message: "미래 메시지를 잘 예약했어요.",
                      });
                      navigate(`${RoutesConfig.MESSAGE.RESERVATION}?status=PENDING`, {
                        replace: true,
                      });
                    },
                    onError: () => {
                      openErrorToast({
                        message: "미래 메시지를 예약하지 못했어요.",
                      });
                    },
                  });
                },
              ),
            );
          }}
        >
          예약 완료
        </Hb.Button>
      </Hb.Box>
    </Hb.Box>
  );
};
