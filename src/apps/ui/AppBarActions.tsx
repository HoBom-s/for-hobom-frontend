import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Chip,
  CircularProgress,
  Divider,
  Popover,
  Typography,
} from "@mui/material";
import {
  AlternateEmailOutlined,
  BadgeOutlined,
  KeyboardArrowDownOutlined,
  Logout,
  PeopleOutline,
  PersonOutline,
} from "@mui/icons-material";
import { RoutesConfig } from "@/shared/config";
import { postAuthLogout } from "@/entities/auth";
import { userQueries } from "@/entities/user";
import { NotificationBell } from "@/features/notification";

export const AppBarActions = () => (
  <>
    <NotificationBell />
    <Suspense fallback={<CircularProgress size={20} />}>
      <UserProfileMenu />
    </Suspense>
  </>
);

const UserProfileMenu = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user } = useSuspenseQuery(userQueries.me());
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await postAuthLogout();
    } finally {
      setIsLoggingOut(false);
      setAnchorEl(null);
      queryClient.clear();
      navigate(RoutesConfig.AUTH.LOGIN, { replace: true });
    }
  };

  return (
    <>
      <ButtonBase
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          ml: 1,
          px: 1,
          py: 0.5,
          borderRadius: 1,
          "&:hover": { bgcolor: "action.hover" },
        }}
      >
        <Avatar
          sx={{
            width: 28,
            height: 28,
            fontSize: "0.75rem",
            fontWeight: 600,
            bgcolor: "primary.main",
          }}
        >
          {user.nickname.charAt(0).toUpperCase()}
        </Avatar>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 500,
            fontSize: "0.8125rem",
            color: "text.primary",
          }}
        >
          {user.nickname}
        </Typography>
        <KeyboardArrowDownOutlined
          sx={{ fontSize: 18, color: "text.secondary" }}
        />
      </ButtonBase>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              width: 300,
              mt: 1,
              borderRadius: 2,
              boxShadow:
                "0 4px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 2.5,
            py: 2,
          }}
        >
          <Avatar
            sx={{
              width: 44,
              height: 44,
              fontSize: "1.125rem",
              fontWeight: 700,
              bgcolor: "primary.main",
            }}
          >
            {user.nickname.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 700, fontSize: "0.9375rem" }}
            >
              {user.nickname}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "0.75rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user.email}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box
          sx={{
            px: 2.5,
            py: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <InfoRow
            icon={<PersonOutline sx={{ fontSize: 18 }} />}
            label="사용자명"
            value={user.username}
          />
          <InfoRow
            icon={<BadgeOutlined sx={{ fontSize: 18 }} />}
            label="닉네임"
            value={user.nickname}
          />
          <InfoRow
            icon={<AlternateEmailOutlined sx={{ fontSize: 18 }} />}
            label="이메일"
            value={user.email}
          />
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
            <Box sx={{ color: "text.secondary", pt: 0.25 }}>
              <PeopleOutline sx={{ fontSize: 18 }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                }}
              >
                친구
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                  mt: 0.25,
                }}
              >
                {user.friends.length > 0 ? (
                  user.friends.map((friend) => (
                    <Chip
                      key={friend}
                      label={friend}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: "0.75rem", height: 24 }}
                    />
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ color: "text.disabled", fontSize: "0.8125rem" }}
                  >
                    없음
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ px: 2.5, py: 1.5 }}>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            size="small"
            startIcon={<Logout fontSize="small" />}
            loading={isLoggingOut}
            onClick={handleLogout}
            sx={{ fontSize: "0.8125rem" }}
          >
            로그아웃
          </Button>
        </Box>
      </Popover>
    </>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
    <Box sx={{ color: "text.secondary" }}>{icon}</Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", fontSize: "0.6875rem", fontWeight: 500 }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          fontSize: "0.8125rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </Typography>
    </Box>
  </Box>
);
