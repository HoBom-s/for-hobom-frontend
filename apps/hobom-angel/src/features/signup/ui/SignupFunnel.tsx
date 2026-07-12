import { FormProvider, useForm } from "react-hook-form";
import * as stylex from "@stylexjs/stylex";
import { useFunnel } from "@/shared/model";
import { useSignup } from "../model/useSignup";
import { styles } from "./SignupFunnel.styles";
import { AgreementStep } from "./AgreementStep";
import { FieldStep } from "./FieldStep";
import { EmailField } from "./EmailField";
import { PasswordField } from "./PasswordField";
import { NicknameField } from "./NicknameField";
import { RealNameField } from "./RealNameField";
import { PhoneField } from "./PhoneField";
import type { SignupFormValues } from "../model/signup-form.model";

const STEPS = ["agreement", "email", "password", "nickname", "realName", "phone"] as const;

/**
 * Signup funnel — one field per step for a natural flow:
 * agreement → email → password → nickname → realName → phone.
 * Submitting hands off to useSignup (toast + redirect home).
 */
export const SignupFunnel = () => {
  const methods = useForm<SignupFormValues>({
    mode: "onChange",
    defaultValues: { email: "", password: "", nickname: "", realName: "", phone: "" },
  });
  const { mutate, isPending } = useSignup();
  const [Funnel, setStep] = useFunnel(STEPS, { initialStep: "agreement" });

  const submit = methods.handleSubmit((values) => {
    mutate({
      email: values.email.trim(),
      password: values.password,
      nickname: values.nickname.trim(),
      realName: values.realName.trim(),
      phone: values.phone.trim(),
    });
  });

  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.card)}>
        <div {...stylex.props(styles.body)}>
          <FormProvider {...methods}>
            <Funnel>
              <Funnel.Step name="agreement">
                <AgreementStep onNext={() => setStep("email")} />
              </Funnel.Step>
              <Funnel.Step name="email">
                <FieldStep
                  name="email"
                  title="이메일을 알려주세요"
                  subtitle="로그인과 알림에 사용돼요."
                  cta="다음"
                  onNext={() => setStep("password")}
                >
                  <EmailField />
                </FieldStep>
              </Funnel.Step>
              <Funnel.Step name="password">
                <FieldStep
                  name="password"
                  title="비밀번호를 만들어주세요"
                  subtitle="영문과 숫자를 섞어 8자 이상으로."
                  cta="다음"
                  onNext={() => setStep("nickname")}
                >
                  <PasswordField />
                </FieldStep>
              </Funnel.Step>
              <Funnel.Step name="nickname">
                <FieldStep
                  name="nickname"
                  title="닉네임을 정해주세요"
                  subtitle="다른 회원에게 보여지는 이름이에요."
                  cta="다음"
                  onNext={() => setStep("realName")}
                >
                  <NicknameField />
                </FieldStep>
              </Funnel.Step>
              <Funnel.Step name="realName">
                <FieldStep
                  name="realName"
                  title="이름을 알려주세요"
                  subtitle="본인 확인을 위해 필요해요."
                  cta="다음"
                  onNext={() => setStep("phone")}
                >
                  <RealNameField />
                </FieldStep>
              </Funnel.Step>
              <Funnel.Step name="phone">
                <FieldStep
                  name="phone"
                  title="연락처를 알려주세요"
                  subtitle="가입의 마지막 단계예요."
                  cta="가입 완료"
                  onNext={submit}
                  loading={isPending}
                >
                  <PhoneField />
                </FieldStep>
              </Funnel.Step>
            </Funnel>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
