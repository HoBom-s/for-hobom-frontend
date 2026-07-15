import * as stylex from "@stylexjs/stylex";
import { useShelterList } from "../model/useShelterList";
import { ShelterGrid } from "./ShelterGrid";
import { styles } from "./BrowseShelters.styles";

interface ShelterResultsProps {
  region: string | undefined;
}

/** Result count and the card grid — suspends while the first page loads
 *  (skeleton fallback lives in the parent). */
export const ShelterResults = ({ region }: ShelterResultsProps) => {
  const { shelters, fetchNextPage, hasNextPage, isFetchingNextPage } = useShelterList(region);

  return (
    <>
      <p {...stylex.props(styles.count)}>
        {shelters.length}곳{hasNextPage ? "+" : ""}
      </p>

      <ShelterGrid
        shelters={shelters}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
};
