import * as stylex from "@stylexjs/stylex";
import { useFunnel } from "@/shared/model";
import { styles } from "./SignupFunnel.styles";
import { AgreementStep } from "./AgreementStep";
import { EmailStep } from "./EmailStep";
import { CodeStep } from "./CodeStep";
import { ProfileStep } from "./ProfileStep";
import { DoneStep } from "./DoneStep";

const STEPS = ["agreement", "email", "code", "profile", "done"] as const;

interface SignupState extends Record<string, unknown> {
  email: string;
  nickname: string;
  password: string;
}

/** Email-verification signup funnel (§0.7): agreement → email → code → profile → done. */
export const SignupFunnel = () => {
  const [Funnel, , setState] = useFunnel(STEPS, { initialStep: "agreement" }).withState<SignupState>(
    { email: "", nickname: "", password: "" },
  );

  return (
    <div {...stylex.props(styles.page)}>
      <div {...stylex.props(styles.card)}>
        <div {...stylex.props(styles.body)}>
          <Funnel>
            <Funnel.Step name="agreement">
              <AgreementStep onNext={() => setState({ step: "email" })} />
            </Funnel.Step>
            <Funnel.Step name="email">
              <EmailStep onNext={(email) => setState({ step: "code", email })} />
            </Funnel.Step>
            <Funnel.Step name="code">
              <CodeStep onNext={() => setState({ step: "profile" })} />
            </Funnel.Step>
            <Funnel.Step name="profile">
              <ProfileStep
                onNext={(nickname, password) => setState({ step: "done", nickname, password })}
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
