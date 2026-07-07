import { Hb } from "@/shared/ui";

interface UserInfoSectionProps {
  initial: string;
  nickname: string;
  email: string;
}

export const UserInfoSection = ({ initial, nickname, email }: UserInfoSectionProps) => (
  <Hb.Box
    style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 16,
      paddingBottom: 16,
    }}
  >
    <Hb.Avatar
      style={{
        width: 44,
        height: 44,
        fontSize: "1.125rem",
        fontWeight: 700,
        backgroundColor: "var(--hb-color-accent)",
      }}
    >
      {initial}
    </Hb.Avatar>
    <Hb.Box
      style={{
        minWidth: 0,
      }}
    >
      <Hb.Text
        variant="body1"
        style={{
          fontWeight: 700,
          fontSize: "0.9375rem",
        }}
      >
        {nickname}
      </Hb.Text>
      <Hb.Text
        variant="body2"
        style={{
          color: "var(--hb-color-text-secondary)",
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
