import * as stylex from "@stylexjs/stylex";
import { ShelterCard } from "@/entities/shelter";
import { useInfiniteScroll } from "@/shared/model";
import type { ShelterListItem } from "@/entities/shelter";
import { styles } from "./ShelterGrid.styles";

interface ShelterGridProps {
  shelters: ShelterListItem[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

/** The shelter card grid with an infinite-scroll sentinel. Loading and error
 *  states are owned by the surrounding Suspense / ErrorBoundary. */
export const ShelterGrid = ({
  shelters,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: ShelterGridProps) => {
  const sentinelRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

  if (shelters.length === 0) {
    return (
      <div {...stylex.props(styles.empty)}>
        <span {...stylex.props(styles.emptyIcon)} aria-hidden="true">
          🐾
        </span>
        <p {...stylex.props(styles.emptyText)}>조건에 맞는 보호소가 없어요.</p>
      </div>
    );
  }

  return (
    <>
      <div {...stylex.props(styles.grid)}>
        {shelters.map((shelter) => (
          <ShelterCard key={shelter.id} shelter={shelter} />
        ))}
      </div>
      <div ref={sentinelRef} />
      {isFetchingNextPage && <p {...stylex.props(styles.more)}>더 불러오는 중…</p>}
    </>
  );
};
