import { useState } from "react";
import { type FieldValues, FormProvider, useForm } from "react-hook-form";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NicknameField, PasswordField } from "@/features/submit-auth-login";
import { useToast } from "@/shared/model";
import { RoutesConfig } from "@/shared/config";
import { resetUnauthorizedState } from "@/shared/api";
import { postAuthLogin, type AuthLoginType } from "@/entities/auth";
import { Hb } from "@/shared/ui";
import { LoginTransitionOverlay } from "./LoginTransitionOverlay";

export const AuthLoginForm = () => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const formMethods = useForm<AuthLoginType>({
    mode: "onChange",
    defaultValues: {
      nickname: "",
      password: "",
    },
  });
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({ mutationFn: postAuthLogin });
  const { openWarnToast, openErrorToast } = useToast();

  const handleValidFormSubmit = async (formValue: FieldValues) => {
    const { nickname, password } = formValue;

    await mutateAsync(
      {
        nickname,
        password,
      },
      {
        onSuccess: async () => {
          resetUnauthorizedState();
          queryClient.clear();
          setIsTransitioning(true);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          navigate(RoutesConfig.DASHBOARD.HOME);
        },
        onError: () => {
          openErrorToast({
            message: "닉네임과 비밀번호를 다시 확인해 주세요.",
          });
        },
      },
    );
  };

  const handleInvalidFormSubmit = () => {
    openWarnToast({
      message: "입력 정보가 올바르지 않아요.",
    });
  };

  return (
    <>
      {isTransitioning && <LoginTransitionOverlay />}
      <FormProvider {...formMethods}>
        <Hb.Box
          component="form"
          noValidate
          autoComplete="off"
          width="100%"
          display="flex"
          flexDirection="column"
          gap={2}
          onSubmit={formMethods.handleSubmit(handleValidFormSubmit, handleInvalidFormSubmit)}
        >
          <Hb.Text variant="h6" fontWeight={700} mb={0.5}>
            로그인
          </Hb.Text>
          <Hb.Text variant="body2" color="text.secondary" mb={1}>
            HoBom 시스템에 오신 것을 환영해요.
            <br />
            로그인을 진행해 주세요.
          </Hb.Text>
          <NicknameField />
          <PasswordField />
          <Hb.Button
            fullWidth
            variant="primary"
            type="submit"
            loading={isPending}
            sx={{ mt: 1, py: 1.2 }}
          >
            로그인
          </Hb.Button>
          <Hb.Text variant="body2" color="text.secondary" textAlign="center">
            계정이 없으신가요?{" "}
            <Hb.Link component={RouterLink} to={RoutesConfig.AUTH.SIGN_UP} underline="hover">
              회원가입
            </Hb.Link>
          </Hb.Text>
        </Hb.Box>
      </FormProvider>
    </>
  );
};
