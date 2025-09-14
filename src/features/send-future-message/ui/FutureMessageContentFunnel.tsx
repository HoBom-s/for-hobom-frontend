import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { FutureMessageSendSchemaType } from "@/entities/future-message";

interface Props {
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const FutureMessageContentFunnel = ({
  onPrevStep,
  onNextStep,
}: Props) => {
  const { setValue, watch } = useFormContext<FutureMessageSendSchemaType>();

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
            내용을 입력해 주세요
          </Typography>
          <FormControl sx={{ width: "100%" }}>
            <TextareaAutosize
              minRows={3}
              placeholder="내용을 입력해 주세요."
              style={{ width: "100%" }}
              value={watch("content")}
              onChange={(evt) => {
                setValue("content", evt.target.value);
              }}
            />
            <FormHelperText>어떤 내용으로 보낼까요?</FormHelperText>
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
            제목 입력하기
          </Button>
          <Button
            fullWidth
            color="info"
            variant="contained"
            disabled={watch("title") === ""}
            onClick={onNextStep}
          >
            날짜 선택하기
          </Button>
        </Box>
      </div>
    </div>
  );
};
