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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography fontWeight={700} sx={{ fontSize: 22, mb: 0.5 }}>
          제목을 입력해 주세요
        </Typography>
        <Typography variant="body2" color="text.secondary">
          어떤 제목으로 보낼까요?
        </Typography>
      </Box>

      <FormControl fullWidth>
        <TextField
          fullWidth
          label="제목"
          value={watch("title")}
          onChange={(evt) => setValue("title", evt.target.value)}
        />
        <FormHelperText>메시지 제목을 입력해 주세요.</FormHelperText>
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
          disabled={watch("title") === ""}
          onClick={onNextStep}
        >
          다음
        </Button>
      </Box>
    </Box>
  );
};
