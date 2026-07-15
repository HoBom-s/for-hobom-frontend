import { useSearchParamsState } from "@/shared/model";
import { shelterFilterCodec } from "../lib/shelter-region.lib";

/**
 * Directory filter controls: the URL-backed region state. Data fetching lives in
 * the Suspense boundary below (see `useShelterList`), so changing the region
 * never suspends the filter row.
 */
export const useBrowseShelters = () => {
  const [filters, setFilters] = useSearchParamsState(shelterFilterCodec);

  return {
    region: filters.region,
    setRegion: (region: string | undefined) => setFilters({ region }),
  };
};
