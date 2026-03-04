import { Box, Chip, Typography } from "@mui/material";
import {
  AlternateEmailOutlined,
  BadgeOutlined,
  PeopleOutline,
  PersonOutline,
} from "@mui/icons-material";

interface UserDetailSectionProps {
  user: {
    username: string;
    nickname: string;
    email: string;
    friends: string[];
  };
}

export const UserDetailSection = ({ user }: UserDetailSectionProps) => (
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
    <FriendsRow friends={user.friends} />
  </Box>
);

const FriendsRow = ({ friends }: { friends: string[] }) => (
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
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.25 }}>
        {friends.length > 0 ? (
          friends.map((friend) => (
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
);

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
