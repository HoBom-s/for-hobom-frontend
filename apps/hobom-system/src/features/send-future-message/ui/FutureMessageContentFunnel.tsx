import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography fontWeight={700} sx={{ fontSize: 22, mb: 0.5 }}>
          내용을 입력해 주세요
        </Typography>
        <Typography variant="body2" color="text.secondary">
          어떤 내용으로 보낼까요?
        </Typography>
      </Box>

      <FormControl fullWidth>
        <TextField
          fullWidth
          multiline
          minRows={4}
          label="내용"
          value={watch("content")}
          onChange={(evt) => setValue("content", evt.target.value)}
        />
        <FormHelperText>
          전하고 싶은 말을 자유롭게 작성해 주세요.
        </FormHelperText>
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
          disabled={watch("content") === ""}
          onClick={onNextStep}
        >
          다음
        </Button>
      </Box>
    </Box>
  );
};
