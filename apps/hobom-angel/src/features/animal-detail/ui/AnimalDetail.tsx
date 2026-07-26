import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { SPECIES_LABEL } from "@/entities/animal";
import { useFavoriteToggle } from "@/entities/favorite";
import { ROUTES } from "@/shared/config";
import { useAnimalDetail } from "../model/useAnimalDetail";
import { AnimalAttributes } from "./AnimalAttributes";
import { AnimalGallery } from "./AnimalGallery";
import { ApplyCard } from "./ApplyCard";
import { styles } from "./AnimalDetail.styles";

/** §02 animal profile: breadcrumb, gallery, application panel, and the
 *  health / traits / rescue attribute grids. */
export const AnimalDetail = ({ animalId }: { animalId: string }) => {
  const animal = useAnimalDetail(animalId);
  const favorites = useFavoriteToggle("ANIMAL");

  return (
    <div {...stylex.props(styles.root)}>
      <nav {...stylex.props(styles.breadcrumb)} aria-label="위치">
        <Link to={ROUTES.ANIMALS} {...stylex.props(styles.crumbLink)}>
          동물 탐색
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          to={`${ROUTES.ANIMALS}?species=${animal.species}`}
          {...stylex.props(styles.crumbLink)}
        >
          {SPECIES_LABEL[animal.species]}
        </Link>
        <span aria-hidden="true">/</span>
        <span {...stylex.props(styles.crumbCurrent)}>{animal.name}</span>
      </nav>

      <div {...stylex.props(styles.topGrid)}>
        <AnimalGallery photos={animal.photos} name={animal.name} />
        <ApplyCard
          animal={animal}
          favorited={favorites.isFavorited(animal.id)}
          onToggleFavorite={() => favorites.toggle(animal.id)}
        />
      </div>

      {animal.description && (
        <section {...stylex.props(styles.intro)}>
          <h2 {...stylex.props(styles.introTitle)}>소개</h2>
          <p {...stylex.props(styles.introBody)}>{animal.description}</p>
        </section>
      )}

      <AnimalAttributes animal={animal} />
    </div>
  );
};
