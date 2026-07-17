import { Bom } from "hobom-utils";
import { SPECIES_LABEL } from "@/entities/animal";
import { useSearchParamsState } from "@/shared/model";
import type { AnimalFilters } from "@/entities/animal";
import { animalFilterCodec } from "../lib/animal-filter-params.lib";
import type { AnimalView } from "../lib/animal-filter-params.lib";

/** A removable active-filter chip shown above the results. */
export interface ActiveFilterChip {
  label: string;
  onRemove: () => void;
}

/**
 * Browse controls: the URL-backed filters and grid/map view, plus the derived
 * active-filter chips. The view is stripped from the filters handed to the data
 * layer so it never leaks into the animals query. Data fetching lives in the
 * Suspense boundary below, so toggling a control never suspends the filter bar.
 */
export const useBrowseAnimals = () => {
  const [state, setState, resetFilters] = useSearchParamsState(animalFilterCodec);
  const { view, ...filters } = state;

  const setFilters = (next: AnimalFilters) => setState({ ...next, view });
  const setView = (nextView: AnimalView) => setState({ ...state, view: nextView });

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

  return { filters, view, setFilters, setView, resetFilters, activeChips };
};
