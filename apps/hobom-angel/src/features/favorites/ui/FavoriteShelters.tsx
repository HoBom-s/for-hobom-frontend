import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { EmptyState, Hb } from "hobom-design-system";
import { ChevronRight, FavoriteBorder, LocationOnOutlined } from "hobom-design-system/icons";
import { FavoriteButton } from "@/entities/favorite";
import { shelterPath } from "@/shared/config";
import { useFavoriteShelters } from "../model/useFavoriteShelters";
import { styles } from "./Favorites.styles";

/** 팔로우한 보호소 list — each row links to the microsite with an unfollow heart. */
export const FavoriteShelters = () => {
  const { shelters, controls } = useFavoriteShelters();

  if (shelters.length === 0) {
    return (
      <EmptyState
        icon={<FavoriteBorder style={{ fontSize: 40, color: "var(--hb-color-text-disabled)" }} />}
        message="아직 팔로우한 보호소가 없어요."
      />
    );
  }

  return (
    <Hb.Stack spacing={1.5}>
      {shelters.map((shelter) => (
        <Hb.Card.Root
          key={shelter.id}
          variant="outlined"
          style={{ padding: "12px 16px", borderRadius: "var(--hb-angel-radius-card)" }}
        >
          <div {...stylex.props(styles.shelterRow)}>
            <Link
              to={shelterPath(shelter.slug)}
              {...stylex.props(styles.shelterLink)}
              aria-label={`${shelter.name} 보호소 프로필 보기`}
            >
              <span {...stylex.props(styles.shelterName)}>{shelter.name}</span>
              <span {...stylex.props(styles.shelterRegion)}>
                <LocationOnOutlined fontSize="small" />
                {shelter.region}
              </span>
              <ChevronRight fontSize="small" {...stylex.props(styles.chevron)} />
            </Link>
            <FavoriteButton
              favorited={controls.isFavorited(shelter.id)}
              onToggle={() => controls.toggle(shelter.id)}
              label={shelter.name}
            />
          </div>
        </Hb.Card.Root>
      ))}
    </Hb.Stack>
  );
};
