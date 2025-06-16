import {
  PickMenuContent,
  PickMenuHeader,
  SelectedMenuContent,
} from "@/features/pick-menu";
import { useFunnel } from "@/shared/funnel";

const FUNNEL_STEPS = ["select-menu", "pick"] as const;

export const PickMenuFunnel = () => {
  const [Funnel, _state, setState] = useFunnel(FUNNEL_STEPS, {
    initialStep: "select-menu",
  }).withState({ step: "select-menu" });

  return (
    <Funnel>
      <Funnel.Step name="select-menu">
        <PickMenuHeader />
        <PickMenuContent onNextCallback={() => setState({ step: "pick" })} />
      </Funnel.Step>
      <Funnel.Step name="pick">
        <SelectedMenuContent />
      </Funnel.Step>
    </Funnel>
  );
};
