import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import {
  type FutureMessageSendSchemaType,
  validateFutureMessageSendInput,
  postFutureMessage,
  futureMessageQueries,
} from "@/entities/future-message";
import { handleValidationResult } from "@/shared/lib";
import { useToast } from "@/shared/model";
import { Bom } from "@/packages/bom";
import { RoutesConfig } from "@/shared/config";

interface Props {
  onPrevStep: () => void;
}

export const FutureMessageScheduleFunnel = ({ onPrevStep }: Props) => {
  const { setValue, watch, getValues } =
    useFormContext<FutureMessageSendSchemaType>();
  const { openWarnToast, openSuccessToast, openErrorToast } = useToast();
  const queryClient = useQueryClient();
  const sendFutureMessageMutationHandler = useMutation({
    mutationFn: postFutureMessage,
  });
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography fontWeight={700} sx={{ fontSize: 22, mb: 0.5 }}>
          날짜를 선택해 주세요
        </Typography>
        <Typography variant="body2" color="text.secondary">
          언제 메시지를 보낼까요?
        </Typography>
      </Box>

      <FormControl fullWidth>
        <DatePicker
          label="보낼 날짜"
          sx={{ width: "100%" }}
          onChange={(evt) => {
            if (!evt) return;
            setValue("scheduledAt", format(evt as Date, "yyyy-MM-dd"));
          }}
        />
        <FormHelperText>발송 예정일을 선택해 주세요.</FormHelperText>
      </FormControl>

      <Box display="flex" gap={1.5}>
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          onClick={onPrevStep}
        >
          이전
        </Button>
        <Button
          fullWidth
          variant="contained"
          disabled={watch("scheduledAt") === ""}
          loading={sendFutureMessageMutationHandler.isPending}
          onClick={() => {
            const futureMessageRequest = getValues();
            Bom.pipe(
              futureMessageRequest,
              validateFutureMessageSendInput,
              (validated) =>
                handleValidationResult(
                  validated,
                  (error) => {
                    openWarnToast({ message: error.message });
                  },
                  (payload) => {
                    sendFutureMessageMutationHandler.mutate(payload, {
                      onSuccess: async () => {
                        await queryClient.invalidateQueries({
                          queryKey: futureMessageQueries.futureMessages(),
                        });
                        openSuccessToast({
                          message: "미래 메시지를 잘 예약했어요.",
                        });
                        navigate(
                          `${RoutesConfig.MESSAGE.RESERVATION}?status=PENDING`,
                          { replace: true },
                        );
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
        </Button>
      </Box>
    </Box>
  );
};
