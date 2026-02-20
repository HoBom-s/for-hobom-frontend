import { useFunnel } from "@/shared/model";
import {
  FutureMessageContentFunnel,
  FutureMessageRecipientFunnel,
  FutureMessageScheduleFunnel,
  FutureMessageTitleFunnel,
} from "@/features/send-future-message";

const FUNNEL_STEPS = [
  "select-recipient",
  "fill-title",
  "fill-content",
  "select-scheduledAt",
] as const;

export const FutureMessageFunnel = () => {
  const [Funnel, _state, setState] = useFunnel(FUNNEL_STEPS, {
    initialStep: "select-recipient",
  }).withState({ step: "select-recipient" });

  return (
    <Funnel>
      <Funnel.Step name="select-recipient">
        <FutureMessageRecipientFunnel
          onNextStep={() => setState({ step: "fill-title" })}
        />
      </Funnel.Step>
      <Funnel.Step name="fill-title">
        <FutureMessageTitleFunnel
          onPrevStep={() => setState({ step: "select-recipient" })}
          onNextStep={() => setState({ step: "fill-content" })}
        />
      </Funnel.Step>
      <Funnel.Step name="fill-content">
        <FutureMessageContentFunnel
          onPrevStep={() => setState({ step: "fill-title" })}
          onNextStep={() => setState({ step: "select-scheduledAt" })}
        />
      </Funnel.Step>
      <Funnel.Step name="select-scheduledAt">
        <FutureMessageScheduleFunnel
          onPrevStep={() => setState({ step: "fill-content" })}
        />
      </Funnel.Step>
    </Funnel>
  );
};
