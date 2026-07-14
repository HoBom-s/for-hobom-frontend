import type { AnimalFilters, AnimalSpecies } from "@/entities/animal";
import type { SearchParamsCodec } from "@/shared/model";

const SPECIES = new Set<AnimalSpecies>(["DOG", "CAT", "OTHER"]);
const PAGE_SIZE = 20;

/**
 * Decode the URL query into browse filters. Keeping filters in the query string
 * makes the list shareable, bookmarkable, and back-button friendly.
 *
 * An absent `status` defaults to the "입양가능만" view (AVAILABLE); `status=all`
 * is the explicit off state so the two are distinguishable in the URL.
 */
export const filtersFromParams = (params: URLSearchParams): AnimalFilters => {
  const species = params.get("species");
  const keyword = params.get("q")?.trim();

  return {
    species: species && SPECIES.has(species as AnimalSpecies) ? (species as AnimalSpecies) : undefined,
    keyword: keyword || undefined,
    status: params.get("status") === "all" ? undefined : "AVAILABLE",
    sort: params.get("sort") === "OLDEST" ? "OLDEST" : "LATEST",
    limit: PAGE_SIZE,
  };
};

/** Encode filters back into a minimal query — defaults (AVAILABLE, LATEST) are omitted. */
export const paramsFromFilters = (filters: AnimalFilters): URLSearchParams => {
  const params = new URLSearchParams();

  if (filters.species) params.set("species", filters.species);
  if (filters.keyword) params.set("q", filters.keyword);
  if (!filters.status) params.set("status", "all");
  if (filters.sort === "OLDEST") params.set("sort", "OLDEST");

  return params;
};

/** The nuqs-style codec that binds animal filters to the URL query. */
export const animalFilterCodec: SearchParamsCodec<AnimalFilters> = {
  decode: filtersFromParams,
  encode: paramsFromFilters,
};
