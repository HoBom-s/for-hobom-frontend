import { Box } from "@mui/material";
import { PickMenuContent, PickMenuHeader } from "@/features/pick-menu";
import { useFunnel } from "@/shared/funnel";

const FUNNEL_STEPS = ["select-menu", "pick"] as const;

export default function MenuPickPage() {
  const [Funnel, _state, setState] = useFunnel(FUNNEL_STEPS, {
    initialStep: "select-menu",
  }).withState({ step: "select-menu" });

  return (
    <Box sx={{ width: "100%", height: "100dvh", overflowY: "hidden" }}>
      <Funnel>
        <Funnel.Step name="select-menu">
          <PickMenuHeader />
          <PickMenuContent onNextCallback={() => setState({ step: "pick" })} />
        </Funnel.Step>
        <Funnel.Step name="pick">
          <div>pp</div>
        </Funnel.Step>
      </Funnel>
    </Box>
  );
}
