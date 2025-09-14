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
import { fetchUserQueryOptions } from "@/entities/auth/api/auth.queries";
import type { FutureMessageSendSchemaType } from "@/entities/future-message/model/future-message-send.model";
import { RoutesConfig } from "@/shared/router/config/routes.config";

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
  const { data: users } = useSuspenseQuery(fetchUserQueryOptions());

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
            받는 사람을 선택해 주세요
          </Typography>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel>받는 사람</InputLabel>
            <Select
              label="받는 사람"
              fullWidth
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
            <FormHelperText>누구에게 보낼까요?</FormHelperText>
          </FormControl>
        </div>
      </Box>
      <div>
        <Box display="flex" gap={1} width="100%" height="100%">
          <Button
            fullWidth
            color="warning"
            variant="contained"
            onClick={() => {
              reset();
              navigate(RoutesConfig.MESSAGE.RESERVATION);
            }}
          >
            나가기
          </Button>
          <Button
            fullWidth
            color="info"
            variant="contained"
            disabled={watch("recipientId") === ""}
            onClick={onNextStep}
          >
            제목 입력하기
          </Button>
        </Box>
      </div>
    </div>
  );
};
