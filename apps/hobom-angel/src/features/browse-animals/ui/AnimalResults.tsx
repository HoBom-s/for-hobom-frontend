import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import type { AnimalFilters } from "@/entities/animal";
import { useAnimalList } from "../model/useAnimalList";
import { AnimalGrid } from "./AnimalGrid";
import { styles } from "./BrowseAnimals.styles";
import type { ActiveFilterChip } from "../model/useBrowseAnimals";

interface AnimalResultsProps {
  filters: AnimalFilters;
  activeChips: ActiveFilterChip[];
  onReset: () => void;
}

/** Result count, active-filter chips, and the card grid — suspends while the
 *  first page loads (skeleton fallback lives in the parent). */
export const AnimalResults = ({ filters, activeChips, onReset }: AnimalResultsProps) => {
  const { animals, fetchNextPage, hasNextPage, isFetchingNextPage } = useAnimalList(filters);

  return (
    <>
      <div {...stylex.props(styles.resultRow)}>
        <span {...stylex.props(styles.count)}>
          {animals.length}마리{hasNextPage ? "+" : ""}
        </span>
        {activeChips.map((chip) => (
          <Hb.Chip
            key={chip.label}
            label={chip.label}
            size="small"
            variant="outlined"
            onDelete={chip.onRemove}
          />
        ))}
        {activeChips.length > 0 && (
          <Hb.Button variant="ghost" size="small" onClick={onReset}>
            초기화
          </Hb.Button>
        )}
      </div>

      <AnimalGrid
        animals={animals}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
};
