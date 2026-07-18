import * as stylex from "@stylexjs/stylex";
import type { Animal } from "@/entities/animal";
import { AnimalRosterRow } from "./AnimalRosterRow";
import { styles } from "./AnimalRoster.styles";

interface AnimalRosterProps {
  animals: Animal[];
  editingId: string | null;
  onEdit: (animalId: string) => void;
}

/** The shelter's animals — selecting one opens it in the edit form. */
export const AnimalRoster = ({ animals, editingId, onEdit }: AnimalRosterProps) => {
  if (animals.length === 0) {
    return <p {...stylex.props(styles.empty)}>아직 등록한 동물이 없어요.</p>;
  }

  return (
    <div {...stylex.props(styles.list)}>
      {animals.map((animal) => (
        <AnimalRosterRow
          key={animal.id}
          animal={animal}
          active={animal.id === editingId}
          onEdit={() => onEdit(animal.id)}
        />
      ))}
    </div>
  );
};
