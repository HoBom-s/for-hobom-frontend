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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers";
import {
  type FutureMessageSendSchemaType,
  validateFutureMessageSendInput,
} from "@/entities/future-message";
import { postFutureMessage } from "@/entities/future-message";
import { handleValidationResult } from "@/shared/assert";
import { useToast } from "@/shared/toast";
import { Bom } from "@/packages/bom";
import { RoutesConfig } from "@/shared/router/config/routes.config.ts";

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
    <div style={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          maxHeight: "calc(100vh - 80px)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%" }}>
          <Typography fontWeight="bold" sx={{ mb: 3, fontSize: 24 }}>
            날짜를 선택해주세요
          </Typography>
          <FormControl sx={{ width: "100%" }}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="보낼 날짜"
                onChange={(evt: any) => {
                  const formattedDate = format(evt.$d, "yyyy-MM-dd");
                  setValue("scheduledAt", formattedDate);
                }}
              />
            </DemoContainer>
            <FormHelperText>언제 메시지를 보낼까요??</FormHelperText>
          </FormControl>
        </div>
      </Box>
      <div>
        <Box display="flex" gap={1} width="100%" height="100%">
          <Button
            fullWidth
            color="warning"
            variant="contained"
            onClick={onPrevStep}
          >
            내용 입력하기
          </Button>
          <Button
            fullWidth
            color="info"
            variant="contained"
            disabled={watch("title") === ""}
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
                        onSuccess: () => {
                          queryClient.invalidateQueries({
                            queryKey: ["future-message", "status"],
                          });
                          openSuccessToast({
                            message: "미래 메시지를 잘 예약했어요.",
                          });
                          navigate(RoutesConfig.MESSAGE.RESERVATION, {
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
            보내기
          </Button>
        </Box>
      </div>
    </div>
  );
};
