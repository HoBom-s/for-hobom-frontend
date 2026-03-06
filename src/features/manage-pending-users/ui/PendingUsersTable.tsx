import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
} from "@mui/material";
import {
  CheckCircleOutline,
  DoNotDisturbOutlined,
  HourglassEmptyOutlined,
  PersonOutline,
} from "@mui/icons-material";
import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast, useOverlay } from "@/shared/model";
import { ConfirmDialog } from "@/shared/ui";
import {
  adminUserQueries,
  adminUserMutations,
  type PendingUserType,
} from "@/entities/admin-user";

export const PendingUsersTable = () => {
  const { data } = useSuspenseQuery(adminUserQueries.pending());
  const users = data.items ?? [];
  const queryClient = useQueryClient();
  const { openSuccessToast, openErrorToast } = useToast();
  const { onOpen } = useOverlay();

  const approveMutation = useMutation({
    ...adminUserMutations.approve(),
    onSuccess: async () => {
      await queryClient.invalidateQueries(adminUserQueries.pending());
      openSuccessToast({ message: "사용자를 승인했어요." });
    },
    onError: () => openErrorToast({ message: "승인에 실패했어요." }),
  });

  const rejectMutation = useMutation({
    ...adminUserMutations.reject(),
    onSuccess: async () => {
      await queryClient.invalidateQueries(adminUserQueries.pending());
      openSuccessToast({ message: "사용자를 거절했어요." });
    },
    onError: () => openErrorToast({ message: "거절에 실패했어요." }),
  });

  const openConfirmDialog = (
    type: "approve" | "reject",
    user: PendingUserType,
  ) => {
    const isApprove = type === "approve";
    onOpen(({ isOpen, onClose }) => (
      <ConfirmDialog
        open={isOpen}
        onClose={onClose}
        title={isApprove ? "사용자 승인" : "사용자 거절"}
        description={
          <>
            <strong>{user.nickname}</strong> ({user.username})님을{" "}
            {isApprove ? "승인" : "거절"}하시겠어요?
          </>
        }
        confirmLabel={isApprove ? "승인" : "거절"}
        confirmColor={isApprove ? "success" : "error"}
        onConfirm={() => {
          const mutation = isApprove ? approveMutation : rejectMutation;
          mutation.mutate({ id: user.id }, { onSettled: onClose });
        }}
      />
    ));
  };

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography variant="h6" fontWeight={700}>
            승인 대기 사용자
          </Typography>
          <Chip
            label={users.length}
            size="small"
            color={users.length > 0 ? "warning" : "default"}
            sx={{ fontWeight: 600, minWidth: 28 }}
          />
        </Stack>
      </Stack>

      {users.length === 0 ? (
        <Paper
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
          <Typography variant="body1" color="text.secondary">
            승인 대기 중인 사용자가 없어요.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell scope="col">사용자</TableCell>
                <TableCell scope="col">닉네임</TableCell>
                <TableCell scope="col">이메일</TableCell>
                <TableCell scope="col" align="right" sx={{ width: 200 }}>
                  액션
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td": { borderBottom: 0 } }}
                >
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Avatar
                        sx={{ width: 32, height: 32, bgcolor: "primary.main" }}
                      >
                        <PersonOutline sx={{ fontSize: 18 }} />
                      </Avatar>
                      <Typography variant="body2" fontWeight={500}>
                        {user.username}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{user.nickname}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        color="success"
                        startIcon={<CheckCircleOutline />}
                        onClick={() => openConfirmDialog("approve", user)}
                      >
                        승인
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<DoNotDisturbOutlined />}
                        onClick={() => openConfirmDialog("reject", user)}
                      >
                        거절
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
