import { Box } from "@mui/material";
import {
  PickMenuContent,
  PickMenuHeader,
  SelectedMenuContent,
} from "@/features/pick-menu";
import { useFunnel } from "@/shared/model";

const FUNNEL_STEPS = ["select-menu", "pick"] as const;

export const PickMenuFunnel = () => {
  const [Funnel, _state, setState] = useFunnel(FUNNEL_STEPS, {
    initialStep: "select-menu",
  }).withState({ step: "select-menu" });

  return (
    <Funnel>
      <Funnel.Step name="select-menu">
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <PickMenuHeader />
          <Box sx={{ flexGrow: 1, minHeight: 0 }}>
            <PickMenuContent
              onNextCallback={() => setState({ step: "pick" })}
            />
          </Box>
        </Box>
      </Funnel.Step>
      <Funnel.Step name="pick">
        <Box sx={{ height: "100%" }}>
          <SelectedMenuContent />
        </Box>
      </Funnel.Step>
    </Funnel>
  );
};
