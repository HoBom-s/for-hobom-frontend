import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { useSuspenseQuery, useDataLot } from "hobom-data";
import { KeyboardArrowDownOutlined, Logout } from "hobom-design-system/icons";
import { RoutesConfig } from "@/shared/config";
import { useToast } from "@/shared/model";
import { postAuthLogout } from "@/entities/auth";
import { userQueries } from "@/entities/user";
import { Hb } from "@/shared/ui";
import { UserInfoSection } from "./UserInfoSection";
import { UserDetailSection } from "./UserDetailSection";

const styles = stylex.create({
  profileTrigger: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginLeft: 8,
    paddingInline: 8,
    paddingBlock: 4,
    borderRadius: 8,
    backgroundColor: {
      default: "transparent",
      ":hover": "rgba(0,0,0,0.04)",
    },
  },
});

export const UserProfileMenu = () => {
  const navigate = useNavigate();
  const dataLot = useDataLot();
  const { data: user } = useSuspenseQuery(userQueries.me());
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { openErrorToast } = useToast();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await postAuthLogout();
    } catch {
      openErrorToast({ message: "로그아웃 요청에 실패했어요." });
    } finally {
      setIsLoggingOut(false);
      setAnchorEl(null);
      dataLot.clear();
      navigate(RoutesConfig.AUTH.LOGIN, { replace: true });
    }
  };

  const initial = user.nickname.charAt(0).toUpperCase();

  return (
    <>
      <ProfileTrigger
        nickname={user.nickname}
        initial={initial}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />

      <Hb.Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        style={{
          width: 300,
          marginTop: 8,
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <UserInfoSection initial={initial} nickname={user.nickname} email={user.email} />
        <Hb.Divider />
        <UserDetailSection user={user} />
        <Hb.Divider />
        <LogoutSection isLoggingOut={isLoggingOut} onLogout={handleLogout} />
      </Hb.Popover>
    </>
  );
};

const ProfileTrigger = ({
  nickname,
  initial,
  onClick,
}: {
  nickname: string;
  initial: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}) => (
  <Hb.ButtonBase onClick={onClick} aria-label="사용자 메뉴" {...stylex.props(styles.profileTrigger)}>
    <Hb.Avatar
      style={{
        width: 28,
        height: 28,
        fontSize: "0.75rem",
        fontWeight: 600,
        backgroundColor: "var(--hb-color-accent)",
      }}
    >
      {initial}
    </Hb.Avatar>
    <Hb.Text
      variant="body2"
      style={{
        fontWeight: 500,
        fontSize: "0.8125rem",
        color: "var(--hb-color-text-primary)",
      }}
    >
      {nickname}
    </Hb.Text>
    <KeyboardArrowDownOutlined sx={{ fontSize: 18, color: "text.secondary" }} />
  </Hb.ButtonBase>
);

const LogoutSection = ({
  isLoggingOut,
  onLogout,
}: {
  isLoggingOut: boolean;
  onLogout: () => void;
}) => (
  <Hb.Box
    style={{
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 12,
      paddingBottom: 12,
    }}
  >
    <Hb.Button
      fullWidth
      variant="secondary"
      size="small"
      startIcon={<Logout fontSize="small" />}
      loading={isLoggingOut}
      onClick={onLogout}
      style={{
        fontSize: "0.8125rem",
      }}
    >
      로그아웃
    </Hb.Button>
  </Hb.Box>
);
