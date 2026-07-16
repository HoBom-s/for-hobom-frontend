import { Hb } from "hobom-design-system";
import { Favorite, FavoriteBorder } from "hobom-design-system/icons";
import { useFavoriteToggle } from "@/entities/favorite";

interface FollowButtonProps {
  shelterId: string;
  shelterName: string;
}

/** Follow / unfollow a shelter (팔로우), toggled optimistically. Populates the
 *  팔로우 보호소 tab on /favorites. */
export const FollowButton = ({ shelterId, shelterName }: FollowButtonProps) => {
  const favorites = useFavoriteToggle("SHELTER");
  const following = favorites.isFavorited(shelterId);

  return (
    <Hb.Button
      variant={following ? "secondary" : "primary"}
      size="small"
      startIcon={following ? <Favorite fontSize="small" /> : <FavoriteBorder fontSize="small" />}
      aria-label={`${shelterName} ${following ? "팔로잉" : "팔로우"}`}
      onClick={() => favorites.toggle(shelterId)}
    >
      {following ? "팔로잉" : "팔로우"}
    </Hb.Button>
  );
};
