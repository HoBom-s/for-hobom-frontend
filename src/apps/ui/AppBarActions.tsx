import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useOverlay } from "@/shared/model";
import { RoutesConfig } from "@/shared/config";
import { postAuthLogout } from "@/entities/auth";
import { NotificationBell } from "@/features/notification";

export const AppBarActions = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { onOpen } = useOverlay();

  const openLogoutDialog = () => {
    onOpen(({ isOpen, onClose }) => (
      <LogoutDialog
        isOpen={isOpen}
        onClose={onClose}
        onLogout={async () => {
          try {
            await postAuthLogout();
          } finally {
            onClose();
            queryClient.clear();
            navigate(RoutesConfig.AUTH.LOGIN, { replace: true });
          }
        }}
      />
    ));
  };

  return (
    <>
      <NotificationBell />
      <Tooltip title="로그아웃">
        <IconButton size="small" onClick={openLogoutDialog} sx={{ ml: 0.5 }}>
          <Logout fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );
};

const LogoutDialog = ({
  isOpen,
  onClose,
  onLogout,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="xs">
      <DialogTitle>로그아웃</DialogTitle>
      <DialogContent>
        <DialogContentText>정말 로그아웃 하시겠어요?</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          취소
        </Button>
        <Button
          variant="contained"
          color="error"
          loading={isLoggingOut}
          onClick={() => {
            setIsLoggingOut(true);
            onLogout();
          }}
        >
          로그아웃
        </Button>
      </DialogActions>
    </Dialog>
  );
};
