import { useFunnel } from "@/shared/model";
import { Hb } from "@/shared/ui";
import { PickMenuContent } from "./PickMenuContent";
import { PickMenuHeader } from "./PickMenuHeader";
import { SelectedMenuContent } from "./SelectedMenuContent";

const FUNNEL_STEPS = ["select-menu", "pick"] as const;

export const PickMenuFunnel = () => {
  const [Funnel, _state, setState] = useFunnel(FUNNEL_STEPS, {
    initialStep: "select-menu",
  }).withState({ step: "select-menu" });

  return (
    <Funnel>
      <Funnel.Step name="select-menu">
        <Hb.Box
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <PickMenuHeader />
          <Hb.Box
            style={{
              flexGrow: 1,
              minHeight: 0,
            }}
          >
            <PickMenuContent onNextCallback={() => setState({ step: "pick" })} />
          </Hb.Box>
        </Hb.Box>
      </Funnel.Step>
      <Funnel.Step name="pick">
        <Hb.Box
          style={{
            height: "100%",
          }}
        >
          <SelectedMenuContent />
        </Hb.Box>
      </Funnel.Step>
    </Funnel>
  );
};
