import * as stylex from "@stylexjs/stylex";
import {
  AnimalCard,
  STATUS_LABEL,
  animalBadges,
  animalMeta,
  careDaysLabel,
} from "@/entities/animal";
import { FavoriteButton, useFavoriteToggle } from "@/entities/favorite";
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
  const favorites = useFavoriteToggle("ANIMAL");

  if (animals.length === 0) {
    return (
      <div {...stylex.props(styles.empty)} role="status">
        <span {...stylex.props(styles.emptyGlyph)} aria-hidden="true">
          🐾
        </span>
        <p {...stylex.props(styles.emptyTitle)}>조건에 맞는 친구가 아직 없어요.</p>
        <p {...stylex.props(styles.emptyText)}>필터를 조금 바꿔서 다시 찾아보세요.</p>
      </div>
    );
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
            sex={animal.sex}
            personality={animal.personality}
            badges={animalBadges(animal)}
            footnote={careDaysLabel(animal.intake?.intakeDate)}
            imageUrl={animal.photoUrl}
            to={animalDetailPath(animal.id)}
            action={
              <FavoriteButton
                favorited={favorites.isFavorited(animal.id)}
                onToggle={() => favorites.toggle(animal.id)}
                label={animal.name}
                overlay
              />
            }
          />
        ))}
      </div>
      <div ref={sentinelRef} />
      {isFetchingNextPage && <p {...stylex.props(styles.more)}>더 불러오는 중…</p>}
    </>
  );
};
