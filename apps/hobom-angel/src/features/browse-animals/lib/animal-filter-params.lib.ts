import type { AnimalFilters, AnimalSpecies, PlacementType } from "@/entities/animal";
import type { SearchParamsCodec } from "@/shared/model";

const SPECIES = new Set<AnimalSpecies>(["DOG", "CAT", "OTHER"]);
const PLACEMENTS = new Set<PlacementType>(["ADOPTION", "FOSTER"]);
const PAGE_SIZE = 20;

export type AnimalView = "grid" | "map";

/** Browse filters plus the grid/map view — the full URL-backed browse state. */
export type AnimalBrowseState = AnimalFilters & { view: AnimalView };

/**
 * Decode the URL query into browse state. Keeping it in the query string makes
 * the list shareable, bookmarkable, and back-button friendly.
 *
 * An absent `status` defaults to the "입양가능만" view (AVAILABLE); `status=all`
 * is the explicit off state so the two are distinguishable in the URL. The view
 * defaults to the grid.
 */
export const filtersFromParams = (params: URLSearchParams): AnimalBrowseState => {
  const species = params.get("species");
  const placement = params.get("placement");
  const keyword = params.get("q")?.trim();

  return {
    species:
      species && SPECIES.has(species as AnimalSpecies) ? (species as AnimalSpecies) : undefined,
    placement:
      placement && PLACEMENTS.has(placement as PlacementType)
        ? (placement as PlacementType)
        : undefined,
    keyword: keyword || undefined,
    status: params.get("status") === "all" ? undefined : "AVAILABLE",
    sort: params.get("sort") === "OLDEST" ? "OLDEST" : "LATEST",
    limit: PAGE_SIZE,
    view: params.get("view") === "map" ? "map" : "grid",
  };
};

/** Encode state back into a minimal query — defaults (AVAILABLE, LATEST, grid) omitted. */
export const paramsFromFilters = (state: AnimalBrowseState): URLSearchParams => {
  const params = new URLSearchParams();

  if (state.species) params.set("species", state.species);
  if (state.placement) params.set("placement", state.placement);
  if (state.keyword) params.set("q", state.keyword);
  if (!state.status) params.set("status", "all");
  if (state.sort === "OLDEST") params.set("sort", "OLDEST");
  if (state.view === "map") params.set("view", "map");

  return params;
};

/** The nuqs-style codec that binds animal browse state to the URL query. */
export const animalFilterCodec: SearchParamsCodec<AnimalBrowseState> = {
  decode: filtersFromParams,
  encode: paramsFromFilters,
};
