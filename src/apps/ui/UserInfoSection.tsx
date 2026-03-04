import { Avatar, Box, Typography } from "@mui/material";

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
      {initial}
    </Avatar>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant="body1"
        sx={{ fontWeight: 700, fontSize: "0.9375rem" }}
      >
        {nickname}
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
        {email}
      </Typography>
    </Box>
  </Box>
);
