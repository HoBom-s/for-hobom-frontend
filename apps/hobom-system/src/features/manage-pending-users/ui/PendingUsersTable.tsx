import {
  CheckCircleOutline,
  DoNotDisturbOutlined,
  HourglassEmptyOutlined,
  PersonOutline,
} from "hobom-design-system/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { adminUserQueries, type PendingUserType } from "@/entities/admin-user";
import { useOverlay } from "@/shared/model";
import { Hb, ConfirmDialog } from "@/shared/ui";
import { usePendingUserActions } from "../model/usePendingUserActions";

export const PendingUsersTable = () => {
  const { data } = useSuspenseQuery(adminUserQueries.pending());
  const users = data.items ?? [];
  const { approve, reject, isApproving, isRejecting } = usePendingUserActions();
  const { onOpen } = useOverlay();

  const openConfirmDialog = (
    type: "approve" | "reject",
    user: PendingUserType,
  ) => {
    const isApproveAction = type === "approve";

    onOpen(({ isOpen, onClose }) => (
      <ConfirmDialog
        open={isOpen}
        onClose={onClose}
        title={isApproveAction ? "사용자 승인" : "사용자 거절"}
        description={
          <>
            <strong>{user.nickname}</strong> ({user.username})님을{" "}
            {isApproveAction ? "승인" : "거절"}하시겠어요?
          </>
        }
        confirmLabel={isApproveAction ? "승인" : "거절"}
        confirmColor={isApproveAction ? "success" : "error"}
        onConfirm={() => {
          const mutate = isApproveAction ? approve : reject;

          mutate({ id: user.id }, { onSettled: onClose });
        }}
      />
    ));
  };

  return (
    <Hb.Box>
      <Hb.Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Hb.Stack direction="row" alignItems="center" spacing={1.5}>
          <Hb.Text variant="h6" fontWeight={700}>
            승인 대기 사용자
          </Hb.Text>
          <Hb.Chip
            label={users.length}
            size="small"
            color={users.length > 0 ? "warning" : "default"}
            sx={{ fontWeight: 600, minWidth: 28 }}
          />
        </Hb.Stack>
      </Hb.Stack>

      {users.length === 0 ? (
        <Hb.Paper
          variant="outlined"
          sx={{
            py: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1.5,
            borderStyle: "dashed",
          }}
        >
          <HourglassEmptyOutlined
            sx={{ fontSize: 48, color: "text.disabled" }}
          />
          <Hb.Text variant="body1" color="text.secondary">
            승인 대기 중인 사용자가 없어요.
          </Hb.Text>
        </Hb.Paper>
      ) : (
        <Hb.Table.Container component={Hb.Paper} variant="outlined">
          <Hb.Table.Root>
            <Hb.Table.Head>
              <Hb.Table.Row>
                <Hb.Table.Cell scope="col">사용자</Hb.Table.Cell>
                <Hb.Table.Cell scope="col">닉네임</Hb.Table.Cell>
                <Hb.Table.Cell scope="col">이메일</Hb.Table.Cell>
                <Hb.Table.Cell scope="col" align="right" sx={{ width: 200 }}>
                  액션
                </Hb.Table.Cell>
              </Hb.Table.Row>
            </Hb.Table.Head>
            <Hb.Table.Body>
              {users.map((user) => (
                <Hb.Table.Row
                  key={user.id}
                  sx={{ "&:last-child td": { borderBottom: 0 } }}
                >
                  <Hb.Table.Cell>
                    <Hb.Stack direction="row" alignItems="center" spacing={1.5}>
                      <Hb.Avatar
                        sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
                      >
                        <PersonOutline sx={{ fontSize: 18 }} />
                      </Hb.Avatar>
                      <Hb.Text variant="body2" fontWeight={500}>
                        {user.username}
                      </Hb.Text>
                    </Hb.Stack>
                  </Hb.Table.Cell>
                  <Hb.Table.Cell>
                    <Hb.Text variant="body2">{user.nickname}</Hb.Text>
                  </Hb.Table.Cell>
                  <Hb.Table.Cell>
                    <Hb.Text variant="body2" color="text.secondary">
                      {user.email}
                    </Hb.Text>
                  </Hb.Table.Cell>
                  <Hb.Table.Cell align="right">
                    <Hb.Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <Hb.Button
                        size="small"
                        variant="secondary"
                        startIcon={<CheckCircleOutline />}
                        onClick={() => openConfirmDialog("approve", user)}
                        disabled={isApproving || isRejecting}
                      >
                        승인
                      </Hb.Button>
                      <Hb.Button
                        size="small"
                        variant="danger"
                        startIcon={<DoNotDisturbOutlined />}
                        onClick={() => openConfirmDialog("reject", user)}
                        disabled={isApproving || isRejecting}
                      >
                        거절
                      </Hb.Button>
                    </Hb.Stack>
                  </Hb.Table.Cell>
                </Hb.Table.Row>
              ))}
            </Hb.Table.Body>
          </Hb.Table.Root>
        </Hb.Table.Container>
      )}
    </Hb.Box>
  );
};
