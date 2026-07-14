import { Bom } from "hobom-utils";
import { SPECIES_LABEL } from "@/entities/animal";
import { useSearchParamsState } from "@/shared/model";
import { animalFilterCodec } from "../lib/animal-filter-params.lib";

/** A removable active-filter chip shown above the results. */
export interface ActiveFilterChip {
  label: string;
  onRemove: () => void;
}

/**
 * Browse filter controls: the URL-backed filter state plus the derived
 * active-filter chips. Data fetching lives in the Suspense boundary below
 * (see `useAnimalList`), so toggling a filter never suspends the filter bar.
 */
export const useBrowseAnimals = () => {
  const [filters, setFilters, resetFilters] = useSearchParamsState(animalFilterCodec);

  const activeChips: ActiveFilterChip[] = [
    filters.species
      ? {
          label: SPECIES_LABEL[filters.species],
          onRemove: () => setFilters({ ...filters, species: undefined }),
        }
      : undefined,
    filters.status === "AVAILABLE"
      ? { label: "입양가능", onRemove: () => setFilters({ ...filters, status: undefined }) }
      : undefined,
    filters.keyword
      ? {
          label: `"${filters.keyword}"`,
          onRemove: () => setFilters({ ...filters, keyword: undefined }),
        }
      : undefined,
  ].filter(Bom.isDefined);

  return { filters, setFilters, resetFilters, activeChips };
};
