import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useSuspenseQuery } from "hobom-data";
import { authQueries } from "@/entities/auth";
import type { FutureMessageSendSchemaType } from "@/entities/future-message";
import { RoutesConfig } from "@/shared/config";
import { Hb } from "@/shared/ui";
import type { SelectChangeEvent } from "@/shared/ui";

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
  const { reset, setValue, watch } = useFormContext<FutureMessageSendSchemaType>();
  const { data: users } = useSuspenseQuery(authQueries.users());

  return (
    <Hb.Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Hb.Box>
        <Hb.Text
          fontWeight={700}
          style={{
            fontSize: 22,
            marginBottom: 4,
          }}
        >
          받는 사람을 선택해 주세요
        </Hb.Text>
        <Hb.Text variant="body2" color="text.secondary">
          누구에게 메시지를 보낼까요?
        </Hb.Text>
      </Hb.Box>
      <Hb.Form.Control fullWidth>
        <Hb.Form.Label>받는 사람</Hb.Form.Label>
        <Hb.Form.Select
          label="받는 사람"
          value={watch("recipientId")}
          onChange={(evt: SelectChangeEvent) => {
            setValue("recipientId", evt.target.value);
          }}
        >
          {users.items.map((user) => (
            <Hb.Menu.Item key={user.id} value={user.id}>
              {user.nickname}
            </Hb.Menu.Item>
          ))}
        </Hb.Form.Select>
        <Hb.Form.Helper>목록에서 선택해 주세요.</Hb.Form.Helper>
      </Hb.Form.Control>
      <Hb.Box display="flex" gap={1.5}>
        <Hb.Button
          fullWidth
          variant="secondary"
          onClick={() => {
            reset();
            navigate(RoutesConfig.MESSAGE.RESERVATION);
          }}
        >
          취소
        </Hb.Button>
        <Hb.Button
          fullWidth
          variant="primary"
          disabled={watch("recipientId") === ""}
          onClick={onNextStep}
        >
          다음
        </Hb.Button>
      </Hb.Box>
    </Hb.Box>
  );
};
