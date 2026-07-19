import { useSuspenseQuery } from "hobom-data";
import { shelterQueries } from "@/entities/shelter";
import { adoptionDelta, toAdoptionBars } from "../lib/dashboard.lib";

/** The §07 통계 dashboard for a shelter: KPIs plus the adoption-trend bars. */
export const useConsoleStats = (shelterId: string) => {
  const { data: dashboard } = useSuspenseQuery(shelterQueries.dashboard(shelterId));

  return {
    dashboard,
    delta: adoptionDelta(dashboard.thisMonthAdoptions, dashboard.lastMonthAdoptions),
    bars: toAdoptionBars(dashboard.monthlyAdoptions),
  };
};
