import type { SearchParamsCodec } from "@/shared/model";

/** The regions the directory can filter by (§3.5). */
export const SHELTER_REGIONS: string[] = ["서울", "경기", "인천", "부산", "대구"];

const REGIONS = new Set(SHELTER_REGIONS);

export type ShelterView = "grid" | "map";

interface ShelterFilters {
  region?: string;
  view: ShelterView;
}

/**
 * Decode the URL query into the shelter filter. Keeping the region and view in
 * the query string makes the directory shareable, bookmarkable, and back-button
 * friendly. Only a known region survives decoding; anything else falls back to
 * "all", and the view defaults to the grid.
 */
const filterFromParams = (params: URLSearchParams): ShelterFilters => {
  const region = params.get("region");

  return {
    region: region && REGIONS.has(region) ? region : undefined,
    view: params.get("view") === "map" ? "map" : "grid",
  };
};

/** Encode the filter back into a minimal query — the default state omits both. */
const paramsFromFilter = (filter: ShelterFilters): URLSearchParams => {
  const params = new URLSearchParams();

  if (filter.region && REGIONS.has(filter.region)) params.set("region", filter.region);
  if (filter.view === "map") params.set("view", "map");

  return params;
};

/** The nuqs-style codec that binds the shelter region filter to the URL query. */
export const shelterFilterCodec: SearchParamsCodec<ShelterFilters> = {
  decode: filterFromParams,
  encode: paramsFromFilter,
};
