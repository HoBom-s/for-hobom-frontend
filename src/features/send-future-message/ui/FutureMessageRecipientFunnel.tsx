import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Typography,
} from "@mui/material";
import { authQueries } from "@/entities/auth";
import type { FutureMessageSendSchemaType } from "@/entities/future-message";
import { RoutesConfig } from "@/shared/config";

interface Props {
  onNextStep: () => void;
}

export const FutureMessageRecipientFunnel = ({ onNextStep }: Props) => {
  return (
    <Suspense fallback={null}>
      <Inner onNextStep={onNextStep} />
    </Suspense>
  );
};

const Inner = ({ onNextStep }: Props) => {
  const navigate = useNavigate();
  const { reset, setValue, watch } =
    useFormContext<FutureMessageSendSchemaType>();
  const { data: users } = useSuspenseQuery(authQueries.users());

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography fontWeight={700} sx={{ fontSize: 22, mb: 0.5 }}>
          받는 사람을 선택해 주세요
        </Typography>
        <Typography variant="body2" color="text.secondary">
          누구에게 메시지를 보낼까요?
        </Typography>
      </Box>

      <FormControl fullWidth>
        <InputLabel>받는 사람</InputLabel>
        <Select
          label="받는 사람"
          value={watch("recipientId")}
          onChange={(evt: SelectChangeEvent) => {
            setValue("recipientId", evt.target.value);
          }}
        >
          {users.items.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.nickname}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>목록에서 선택해 주세요.</FormHelperText>
      </FormControl>

      <Box display="flex" gap={1.5}>
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          onClick={() => {
            reset();
            navigate(RoutesConfig.MESSAGE.RESERVATION);
          }}
        >
          취소
        </Button>
        <Button
          fullWidth
          variant="contained"
          disabled={watch("recipientId") === ""}
          onClick={onNextStep}
        >
          다음
        </Button>
      </Box>
    </Box>
  );
};
