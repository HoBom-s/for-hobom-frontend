import { useState } from "react";
import { type FieldValues, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useDataLot } from "hobom-data";
import { EmailField, PasswordField } from "@/features/submit-auth-login";
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
      email: "",
      password: "",
    },
  });
  const dataLot = useDataLot();
  const { mutateAsync, isPending } = useMutation({ mutationFn: postAuthLogin });
  const { openWarnToast, openErrorToast } = useToast();

  const handleValidFormSubmit = async (formValue: FieldValues) => {
    const { email, password } = formValue;

    await mutateAsync(
      {
        email,
        password,
      },
      {
        onSuccess: async () => {
          resetUnauthorizedState();
          dataLot.clear();
          setIsTransitioning(true);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          navigate(RoutesConfig.DASHBOARD.OVERVIEW, { replace: true });
        },
        onError: () => {
          openErrorToast({
            message: "이메일과 비밀번호를 다시 확인해 주세요.",
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
            Hammer 시스템에 오신 것을 환영해요.
            <br />
            로그인을 진행해 주세요.
          </Hb.Text>
          <EmailField />
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
        </Hb.Box>
      </FormProvider>
    </>
  );
};
