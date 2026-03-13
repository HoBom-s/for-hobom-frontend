import { Hb } from "@/shared/ui";

interface UserInfoSectionProps {
  initial: string;
  nickname: string;
  email: string;
}

export const UserInfoSection = ({
  initial,
  nickname,
  email,
}: UserInfoSectionProps) => (
  <Hb.Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      px: 2.5,
      py: 2,
    }}
  >
    <Hb.Avatar
      sx={{
        width: 44,
        height: 44,
        fontSize: "1.125rem",
        fontWeight: 700,
        bgcolor: "primary.main",
      }}
    >
      {initial}
    </Hb.Avatar>
    <Hb.Box sx={{ minWidth: 0 }}>
      <Hb.Text variant="body1" sx={{ fontWeight: 700, fontSize: "0.9375rem" }}>
        {nickname}
      </Hb.Text>
      <Hb.Text
        variant="body2"
        sx={{
          color: "text.secondary",
          fontSize: "0.75rem",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {email}
      </Hb.Text>
    </Hb.Box>
  </Hb.Box>
);
