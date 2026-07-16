import * as stylex from "@stylexjs/stylex";
import { EmptyState } from "hobom-design-system";
import { FavoriteBorder } from "hobom-design-system/icons";
import { AnimalCard, STATUS_LABEL, animalMeta } from "@/entities/animal";
import { FavoriteButton } from "@/entities/favorite";
import { animalDetailPath } from "@/shared/config";
import { useFavoriteAnimals } from "../model/useFavoriteAnimals";
import { styles } from "./Favorites.styles";

/** 찜한 동물 grid — unfavoriting drops the card in place (§05·부록). */
export const FavoriteAnimals = () => {
  const { animals, controls } = useFavoriteAnimals();

  if (animals.length === 0) {
    return (
      <EmptyState
        icon={<FavoriteBorder style={{ fontSize: 40, color: "var(--hb-color-text-disabled)" }} />}
        message="아직 찜한 동물이 없어요."
      />
    );
  }

  return (
    <div {...stylex.props(styles.grid)}>
      {animals.map((animal) => (
        <AnimalCard
          key={animal.id}
          name={animal.name}
          status={STATUS_LABEL[animal.status]}
          meta={animalMeta(animal)}
          imageUrl={animal.photoUrl}
          to={animalDetailPath(animal.id)}
          action={
            <FavoriteButton
              favorited={controls.isFavorited(animal.id)}
              onToggle={() => controls.toggle(animal.id)}
              label={animal.name}
              overlay
            />
          }
        />
      ))}
    </div>
  );
};
