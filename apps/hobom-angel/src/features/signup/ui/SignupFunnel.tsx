import * as stylex from "@stylexjs/stylex";
import { useFunnel } from "@/shared/model";
import { styles } from "./SignupFunnel.styles";
import { AgreementStep } from "./AgreementStep";
import { VerifyIdentityStep } from "./VerifyIdentityStep";
import { ProfileStep } from "./ProfileStep";
import { DoneStep } from "./DoneStep";

const STEPS = ["agreement", "verify", "profile", "done"] as const;

interface SignupState extends Record<string, unknown> {
  verificationToken: string;
}

/** Signup funnel: agreement → 본인확인 → profile (nickname + email) → done. */
export const SignupFunnel = () => {
  const [Funnel, state, setState] = useFunnel(STEPS, {
    initialStep: "agreement",
  }).withState<SignupState>({ verificationToken: "" });

  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.card)}>
        <div {...stylex.props(styles.body)}>
          <Funnel>
            <Funnel.Step name="agreement">
              <AgreementStep onNext={() => setState({ step: "verify" })} />
            </Funnel.Step>
            <Funnel.Step name="verify">
              <VerifyIdentityStep
                onNext={(verificationToken) => setState({ step: "profile", verificationToken })}
              />
            </Funnel.Step>
            <Funnel.Step name="profile">
              <ProfileStep
                verificationToken={state.verificationToken}
                onDone={() => setState({ step: "done" })}
              />
            </Funnel.Step>
            <Funnel.Step name="done">
              <DoneStep />
            </Funnel.Step>
          </Funnel>
        </div>
      </div>
    </div>
  );
};
