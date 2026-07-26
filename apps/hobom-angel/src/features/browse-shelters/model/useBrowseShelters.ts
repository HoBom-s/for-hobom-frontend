import { useSearchParamsState } from "@/shared/model";
import { shelterFilterCodec } from "../lib/shelter-region.lib";
import type { ShelterView } from "../lib/shelter-region.lib";

/**
 * Directory controls: the URL-backed region filter and grid/map view. Data
 * fetching lives in the Suspense boundary below (see `useShelterList` /
 * `useShelterMarkers`), so changing either never suspends the filter row.
 */
export const useBrowseShelters = () => {
  const [filters, setFilters] = useSearchParamsState(shelterFilterCodec);

  return {
    region: filters.region,
    view: filters.view,
    setRegion: (region: string | undefined) => setFilters({ ...filters, region }),
    setView: (view: ShelterView) => setFilters({ ...filters, view }),
  };
};
