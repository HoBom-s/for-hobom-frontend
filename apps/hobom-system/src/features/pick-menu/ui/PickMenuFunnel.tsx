import { PickMenuContent, PickMenuHeader, SelectedMenuContent } from "@/features/pick-menu";
import { useFunnel } from "@/shared/model";
import { Hb } from "@/shared/ui";

const FUNNEL_STEPS = ["select-menu", "pick"] as const;

export const PickMenuFunnel = () => {
  const [Funnel, _state, setState] = useFunnel(FUNNEL_STEPS, {
    initialStep: "select-menu",
  }).withState({ step: "select-menu" });

  return (
    <Funnel>
      <Funnel.Step name="select-menu">
        <Hb.Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <PickMenuHeader />
          <Hb.Box sx={{ flexGrow: 1, minHeight: 0 }}>
            <PickMenuContent onNextCallback={() => setState({ step: "pick" })} />
          </Hb.Box>
        </Hb.Box>
      </Funnel.Step>
      <Funnel.Step name="pick">
        <Hb.Box sx={{ height: "100%" }}>
          <SelectedMenuContent />
        </Hb.Box>
      </Funnel.Step>
    </Funnel>
  );
};
