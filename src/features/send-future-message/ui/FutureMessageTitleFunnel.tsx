import { useFormContext } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import type { FutureMessageSendSchemaType } from "@/entities/future-message";

interface Props {
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const FutureMessageTitleFunnel = ({ onPrevStep, onNextStep }: Props) => {
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
            제목을 입력해 주세요
          </Typography>
          <FormControl sx={{ width: "100%" }}>
            <TextField
              fullWidth
              label="제목"
              value={watch("title")}
              onChange={(evt) => {
                setValue("title", evt.target.value);
              }}
            />
            <FormHelperText>어떤 제목으로 보낼까요?</FormHelperText>
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
            받는 사람 선택하기
          </Button>
          <Button
            fullWidth
            color="info"
            variant="contained"
            disabled={watch("title") === ""}
            onClick={onNextStep}
          >
            내용 입력하기
          </Button>
        </Box>
      </div>
    </div>
  );
};
