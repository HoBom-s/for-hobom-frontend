import { PickMenuFunnel } from "@/features/pick-menu";
import { TodayMenuIdContextProvider } from "@/entities/menu-recommendation";
import { Hb } from "@/shared/ui";

export const PickMenuWorkspace = () => {
  return (
    <Hb.Box
      style={{
        width: "100%",
        height: "100%",
        overflowY: "hidden",
      }}
    >
      <TodayMenuIdContextProvider>
        <PickMenuFunnel />
      </TodayMenuIdContextProvider>
    </Hb.Box>
  );
};
