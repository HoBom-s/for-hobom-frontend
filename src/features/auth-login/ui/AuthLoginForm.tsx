import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import { NicknameField, PasswordField } from "@/features/auth-login/ui";
import type { AuthLoginType } from "@/features/auth-login/model";

export const AuthLoginForm = () => {
  const formMethods = useForm<AuthLoginType>({
    mode: "onChange",
    defaultValues: {
      nickname: "",
      password: "",
    },
  });

  return (
    <FormProvider {...formMethods}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        width="90%"
        px={4}
        py={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
        boxShadow={2}
        borderRadius={2}
      >
        <Typography typography="h5" fontWeight="bold">
          Sign in
        </Typography>
        <Typography
          typography="caption"
          textAlign="center"
          color="text.secondary"
          mb={1}
        >
          Welcome to HoBom.
          <br />
          Please sign in to continue.
        </Typography>
        <NicknameField />
        <PasswordField />
        <Button fullWidth variant="contained" type="submit" color="info">
          Sign in with nickname and password
        </Button>
      </Box>
    </FormProvider>
  );
};
