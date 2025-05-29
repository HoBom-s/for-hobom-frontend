import { type FieldValues, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Box, Button, Typography } from "@mui/material";
import { NicknameField, PasswordField } from "@/features/auth-login/ui";
import type { AuthLoginType } from "@/features/auth-login/model";
import { postAuthLogin } from "@/features/auth-login/api";
import { useToast } from "@/shared/toast/model";
import { RoutesConfig } from "@/apps/router/config/routes.config.ts";

export const AuthLoginForm = () => {
  const navigate = useNavigate();
  const formMethods = useForm<AuthLoginType>({
    mode: "onChange",
    defaultValues: {
      nickname: "",
      password: "",
    },
  });
  const { mutateAsync, isPending } = useMutation({ mutationFn: postAuthLogin });
  const { openSuccessToast, openWarnToast, openErrorToast } = useToast();

  const handleValidFormSubmit = async (formValue: FieldValues) => {
    const { nickname, password } = formValue;
    await mutateAsync(
      {
        nickname,
        password,
      },
      {
        onSuccess: () => {
          openSuccessToast({ message: "Login Success !" });
          navigate(RoutesConfig.MAIN.DAILY_TODO);
        },
        onError: () => {
          openErrorToast({ message: `Login failed.` });
        },
      },
    );
  };

  const handleInvalidFormSubmit = () => {
    openWarnToast({
      message: `User information is incorrect.`,
    });
  };

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
        onSubmit={formMethods.handleSubmit(
          handleValidFormSubmit,
          handleInvalidFormSubmit,
        )}
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
        <Button
          fullWidth
          variant="contained"
          type="submit"
          color="info"
          loading={isPending}
        >
          Sign in with nickname and password
        </Button>
      </Box>
    </FormProvider>
  );
};
