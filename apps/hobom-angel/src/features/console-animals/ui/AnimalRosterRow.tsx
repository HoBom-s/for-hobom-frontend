import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { SPECIES_LABEL, STATUS_LABEL } from "@/entities/animal";
import { mediaUrl } from "@/shared/lib";
import type { Animal, AnimalStatusLabel } from "@/entities/animal";
import { styles } from "./AnimalRoster.styles";

const STATUS_COLOR: Record<
  AnimalStatusLabel,
  "primary" | "warning" | "secondary" | "success" | "default"
> = {
  입양가능: "primary",
  예약중: "warning",
  임보중: "secondary",
  입양완료: "success",
  반환: "default",
};

interface AnimalRosterRowProps {
  animal: Animal;
  active: boolean;
  onEdit: () => void;
}

/** A table row — thumbnail, name·breed, status, and a signup-count slot (shown
 *  as — until the backend exposes counts). Selects the animal for editing. */
export const AnimalRosterRow = ({ animal, active, onEdit }: AnimalRosterRowProps) => {
  const statusLabel = STATUS_LABEL[animal.status];

  return (
    <button type="button" {...stylex.props(styles.row, active && styles.rowActive)} onClick={onEdit}>
      {animal.photoUrl ? (
        <img src={mediaUrl(animal.photoUrl)} alt="" {...stylex.props(styles.thumb)} />
      ) : (
        <span {...stylex.props(styles.thumbEmpty)} />
      )}
      <span {...stylex.props(styles.nameCell)}>
        <span {...stylex.props(styles.name)}>{animal.name}</span>
        <span {...stylex.props(styles.breed)}>
          {SPECIES_LABEL[animal.species]}
          {animal.breed ? ` · ${animal.breed}` : ""}
        </span>
      </span>
      <span>
        <Hb.Chip label={statusLabel} size="small" variant="soft" color={STATUS_COLOR[statusLabel]} />
      </span>
      <span {...stylex.props(styles.count)}>—</span>
    </button>
  );
};
