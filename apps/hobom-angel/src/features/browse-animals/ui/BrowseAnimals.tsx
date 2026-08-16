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
      <header {...stylex.props(styles.header)}>
        <span {...stylex.props(styles.kicker)}>MEET YOUR MATCH</span>
        <h1 {...stylex.props(styles.title)}>
          <span {...stylex.props(styles.rule)} aria-hidden="true" />
          가족을 기다리는 친구들
        </h1>
        <p {...stylex.props(styles.lead)}>
          지금 새로운 가족을 기다리고 있어요. 조건을 골라 마음이 맞는 친구를 만나보세요.
        </p>
      </header>

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
