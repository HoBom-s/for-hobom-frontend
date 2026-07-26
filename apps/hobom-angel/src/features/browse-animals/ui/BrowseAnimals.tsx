import { Suspense } from "react";
import * as stylex from "@stylexjs/stylex";
import { LoadingState } from "@/shared/ui";
import { useBrowseAnimals } from "../model/useBrowseAnimals";
import { AnimalFilters } from "./AnimalFilters";
import { AnimalGridSkeleton } from "./AnimalGridSkeleton";
import { AnimalMapView } from "./AnimalMapView";
import { AnimalResults } from "./AnimalResults";
import { styles } from "./BrowseAnimals.styles";

export const BrowseAnimals = () => {
  const { filters, view, setFilters, setView, resetFilters, activeChips } = useBrowseAnimals();

  return (
    <div {...stylex.props(styles.root)}>
      <AnimalFilters filters={filters} onChange={setFilters} view={view} onViewChange={setView} />

      {view === "grid" ? (
        <Suspense fallback={<AnimalGridSkeleton />}>
          <AnimalResults filters={filters} activeChips={activeChips} onReset={resetFilters} />
        </Suspense>
      ) : (
        <Suspense fallback={<LoadingState />}>
          <AnimalMapView filters={filters} />
        </Suspense>
      )}
    </div>
  );
};
