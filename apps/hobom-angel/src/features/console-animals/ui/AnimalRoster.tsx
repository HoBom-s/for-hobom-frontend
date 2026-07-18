import * as stylex from "@stylexjs/stylex";
import type { Animal } from "@/entities/animal";
import { AnimalRosterRow } from "./AnimalRosterRow";
import { styles } from "./AnimalRoster.styles";

interface AnimalRosterProps {
  animals: Animal[];
  editingId: string | null;
  onEdit: (animalId: string) => void;
}

/** The shelter's animals as a table (§7.1) — thumbnail · 이름·품종 · 상태 · 신청.
 *  Selecting a row opens it in the edit form. */
export const AnimalRoster = ({ animals, editingId, onEdit }: AnimalRosterProps) => {
  if (animals.length === 0) {
    return (
      <div {...stylex.props(styles.table)}>
        <p {...stylex.props(styles.empty)}>아직 등록한 동물이 없어요.</p>
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.table)}>
      <div {...stylex.props(styles.head)}>
        <span />
        <span>이름·품종</span>
        <span>상태</span>
        <span {...stylex.props(styles.count)}>신청</span>
      </div>
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
