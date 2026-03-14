import {
  AlternateEmailOutlined,
  BadgeOutlined,
  PeopleOutline,
  PersonOutline,
} from "hobom-design-system/icons";
import { useQueries } from "@tanstack/react-query";
import { userQueries } from "@/entities/user";
import { Hb } from "@/shared/ui";

interface UserDetailSectionProps {
  user: {
    username: string;
    nickname: string;
    email: string;
    friends: string[];
  };
}

export const UserDetailSection = ({ user }: UserDetailSectionProps) => (
  <Hb.Box
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
    <InfoRow icon={<BadgeOutlined sx={{ fontSize: 18 }} />} label="닉네임" value={user.nickname} />
    <InfoRow
      icon={<AlternateEmailOutlined sx={{ fontSize: 18 }} />}
      label="이메일"
      value={user.email}
    />
    <FriendsRow friends={user.friends} />
  </Hb.Box>
);

const FriendsRow = ({ friends }: { friends: string[] }) => {
  const friendQueries = useQueries({
    queries: friends.map((id) => userQueries.detail(id)),
  });

  const isLoading = friendQueries.some((q) => q.isLoading);

  return (
    <Hb.Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
      <Hb.Box sx={{ color: "text.secondary", pt: 0.25 }}>
        <PeopleOutline sx={{ fontSize: 18 }} />
      </Hb.Box>
      <Hb.Box sx={{ minWidth: 0 }}>
        <Hb.Text
          variant="caption"
          sx={{
            color: "text.secondary",
            fontSize: "0.6875rem",
            fontWeight: 500,
          }}
        >
          친구
        </Hb.Text>
        <Hb.Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.25 }}>
          {friends.length > 0 ? (
            isLoading ? (
              <Hb.Progress.Circular size={16} />
            ) : (
              friendQueries.map((q, i) => (
                <Hb.Chip
                  key={friends[i]}
                  label={q.data?.items.nickname ?? friends[i]}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "0.75rem", height: 24 }}
                />
              ))
            )
          ) : (
            <Hb.Text variant="body2" sx={{ color: "text.disabled", fontSize: "0.8125rem" }}>
              없음
            </Hb.Text>
          )}
        </Hb.Box>
      </Hb.Box>
    </Hb.Box>
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
  <Hb.Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
    <Hb.Box sx={{ color: "text.secondary" }}>{icon}</Hb.Box>
    <Hb.Box sx={{ minWidth: 0 }}>
      <Hb.Text
        variant="caption"
        sx={{ color: "text.secondary", fontSize: "0.6875rem", fontWeight: 500 }}
      >
        {label}
      </Hb.Text>
      <Hb.Text
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
      </Hb.Text>
    </Hb.Box>
  </Hb.Box>
);
