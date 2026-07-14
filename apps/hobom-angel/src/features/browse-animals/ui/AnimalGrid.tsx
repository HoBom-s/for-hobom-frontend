import * as stylex from "@stylexjs/stylex";
import { AnimalCard, STATUS_LABEL, animalMeta } from "@/entities/animal";
import { animalDetailPath } from "@/shared/config";
import { useInfiniteScroll } from "@/shared/model";
import type { Animal } from "@/entities/animal";
import { styles } from "./AnimalGrid.styles";

interface AnimalGridProps {
  animals: Animal[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

/** The animal card grid with an infinite-scroll sentinel. Loading and error
 *  states are owned by the surrounding Suspense / ErrorBoundary. */
export const AnimalGrid = ({
  animals,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: AnimalGridProps) => {
  const sentinelRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  if (animals.length === 0) {
    return <p {...stylex.props(styles.empty)}>조건에 맞는 친구가 아직 없어요.</p>;
  }

  return (
    <>
      <div {...stylex.props(styles.grid)}>
        {animals.map((animal) => (
          <AnimalCard
            key={animal.id}
            name={animal.name}
            status={STATUS_LABEL[animal.status]}
            meta={animalMeta(animal)}
            imageUrl={animal.photoUrl}
            to={animalDetailPath(animal.id)}
          />
        ))}
      </div>
      <div ref={sentinelRef} />
      {isFetchingNextPage && <p {...stylex.props(styles.more)}>더 불러오는 중…</p>}
    </>
  );
};
