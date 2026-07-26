import * as stylex from "@stylexjs/stylex";
import { Favorite, FavoriteBorder } from "hobom-design-system/icons";
import { styles } from "./FavoriteButton.styles";

interface FavoriteButtonProps {
  favorited: boolean;
  onToggle: () => void;
  /** Names the target for assistive tech, e.g. the animal or shelter name. */
  label: string;
  /** Float over card media (translucent backdrop) instead of sitting inline. */
  overlay?: boolean;
}

/** A heart toggle. Presentational — its state and handler come from a
 *  useFavoriteToggle owner. Swallows the click so it works inside a card link
 *  without triggering navigation. */
export const FavoriteButton = ({
  favorited,
  onToggle,
  label,
  overlay = false,
}: FavoriteButtonProps) => (
  <button
    type="button"
    aria-label={`${label} 찜하기`}
    aria-pressed={favorited}
    {...stylex.props(styles.button, overlay && styles.overlay, favorited && styles.on)}
    onClick={(event) => {
      event.preventDefault();
      event.stopPropagation();
      onToggle();
    }}
  >
    {favorited ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
  </button>
);
