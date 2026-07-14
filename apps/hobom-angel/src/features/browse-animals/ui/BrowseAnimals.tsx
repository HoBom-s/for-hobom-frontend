import { Suspense } from "react";
import * as stylex from "@stylexjs/stylex";
import { useBrowseAnimals } from "../model/useBrowseAnimals";
import { AnimalFilters } from "./AnimalFilters";
import { AnimalGridSkeleton } from "./AnimalGridSkeleton";
import { AnimalResults } from "./AnimalResults";
import { styles } from "./BrowseAnimals.styles";

export const BrowseAnimals = () => {
  const { filters, setFilters, resetFilters, activeChips } = useBrowseAnimals();

  return (
    <div {...stylex.props(styles.root)}>
      <AnimalFilters filters={filters} onChange={setFilters} />

      <Suspense fallback={<AnimalGridSkeleton />}>
        <AnimalResults filters={filters} activeChips={activeChips} onReset={resetFilters} />
      </Suspense>
    </div>
  );
};
