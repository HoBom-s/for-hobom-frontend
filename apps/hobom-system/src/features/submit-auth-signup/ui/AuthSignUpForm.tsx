import { type FieldValues, FormProvider, useForm } from "react-hook-form";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useMutation } from "hobom-data";
import { Controller } from "react-hook-form";
import { useToast } from "@/shared/model";
import { RoutesConfig } from "@/shared/config";
import { postAuthSignUp, type AuthSignUpType } from "@/entities/auth";
import { Hb } from "@/shared/ui";

export const AuthSignUpForm = () => {
  const navigate = useNavigate();
  const formMethods = useForm<AuthSignUpType>({
    mode: "onChange",
    defaultValues: {
      username: "",
      nickname: "",
      email: "",
      password: "",
    },
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postAuthSignUp,
  });
  const { openSuccessToast, openWarnToast, openErrorToast } = useToast();

  const handleValidFormSubmit = async (formValue: FieldValues) => {
    await mutateAsync(formValue as AuthSignUpType, {
      onSuccess: () => {
        openSuccessToast({
          message: "가입이 완료되었어요. 관리자 승인 후 로그인할 수 있어요.",
        });
        navigate(RoutesConfig.AUTH.LOGIN);
      },
      onError: () => {
        openErrorToast({
          message: "가입에 실패했어요. 입력 정보를 확인해 주세요.",
        });
      },
    });
  };

  const handleInvalidFormSubmit = () => {
    openWarnToast({ message: "입력 정보를 확인해 주세요." });
  };

  return (
    <FormProvider {...formMethods}>
      <Hb.Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={formMethods.handleSubmit(handleValidFormSubmit, handleInvalidFormSubmit)}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <Hb.Text variant="h6" fontWeight={700} style={{ marginBottom: 4 }}>
          회원가입
        </Hb.Text>
        <Hb.Text variant="body2" color="text.secondary" style={{ marginBottom: 8 }}>
          HoBom 시스템에 가입해요.
          <br />
          관리자 승인 후 서비스를 이용할 수 있어요.
        </Hb.Text>

        <Controller
          control={formMethods.control}
          name="username"
          rules={{
            required: "이름을 입력해 주세요.",
            minLength: { value: 2, message: "이름은 최소 2자 이상이에요." },
          }}
          render={({ field, fieldState }) => (
            <Hb.TextField
              label="이름"
              size="small"
              placeholder="이름을 입력해 주세요."
              fullWidth
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          control={formMethods.control}
          name="nickname"
          rules={{
            required: "닉네임을 입력해 주세요.",
            minLength: { value: 2, message: "닉네임은 최소 2자 이상이에요." },
          }}
          render={({ field, fieldState }) => (
            <Hb.TextField
              label="닉네임"
              size="small"
              placeholder="로그인 시 사용할 닉네임이에요."
              fullWidth
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          control={formMethods.control}
          name="email"
          rules={{
            required: "이메일을 입력해 주세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "올바른 이메일 형식이 아니에요.",
            },
          }}
          render={({ field, fieldState }) => (
            <Hb.TextField
              label="이메일"
              size="small"
              placeholder="이메일을 입력해 주세요."
              fullWidth
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          control={formMethods.control}
          name="password"
          rules={{
            required: "비밀번호를 입력해 주세요.",
            minLength: { value: 4, message: "비밀번호는 최소 4자 이상이에요." },
          }}
          render={({ field, fieldState }) => (
            <Hb.TextField
              label="비밀번호"
              size="small"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              fullWidth
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Hb.Button
          fullWidth
          variant="primary"
          type="submit"
          loading={isPending}
          style={{
            marginTop: 8,
            paddingTop: 9.6,
            paddingBottom: 9.6,
          }}
        >
          가입하기
        </Hb.Button>

        <Hb.Text variant="body2" color="text.secondary" style={{ textAlign: "center" }}>
          이미 계정이 있으신가요?{" "}
          <Hb.Link component={RouterLink} to={RoutesConfig.AUTH.LOGIN} underline="hover">
            로그인
          </Hb.Link>
        </Hb.Text>
      </Hb.Box>
    </FormProvider>
  );
};
