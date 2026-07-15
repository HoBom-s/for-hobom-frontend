import { useSuspenseQuery } from "hobom-data";
import * as stylex from "@stylexjs/stylex";
import { EmptyState } from "hobom-design-system";
import { InboxOutlined } from "hobom-design-system/icons";
import { AnimalCard, STATUS_LABEL, animalMeta, animalQueries } from "@/entities/animal";
import { animalDetailPath } from "@/shared/config";
import { styles } from "./AnimalsTab.styles";

/** 우리 아이들 tab — the shelter's animal roster (first page). Reuses the
 *  entity's AnimalCard so cards match the browse/landing screens. */
export const AnimalsTab = ({ shelterId }: { shelterId: string }) => {
  const { data: animals } = useSuspenseQuery(animalQueries.byShelter(shelterId));

  if (animals.length === 0) {
    return (
      <EmptyState
        icon={<InboxOutlined style={{ fontSize: 40, color: "var(--hb-color-text-disabled)" }} />}
        message="아직 소개할 아이가 없어요."
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
        />
      ))}
    </div>
  );
};
