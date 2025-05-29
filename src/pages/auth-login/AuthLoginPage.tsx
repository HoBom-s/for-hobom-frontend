import { Box } from "@mui/material";
import { AuthLoginForm } from "@/features/auth-login/ui";

export default function AuthLoginPage() {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <AuthLoginForm />
    </Box>
  );
}
