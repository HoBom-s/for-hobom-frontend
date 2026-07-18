import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { SPECIES_LABEL, STATUS_LABEL } from "@/entities/animal";
import type { Animal, AnimalStatusLabel } from "@/entities/animal";
import { styles } from "./AnimalRoster.styles";

const STATUS_COLOR: Record<AnimalStatusLabel, "primary" | "warning" | "secondary" | "success" | "default"> =
  {
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

/** One roster row — name, species/breed, status — that selects the animal for
 *  editing. */
export const AnimalRosterRow = ({ animal, active, onEdit }: AnimalRosterRowProps) => {
  const statusLabel = STATUS_LABEL[animal.status];

  return (
    <button type="button" {...stylex.props(styles.row, active && styles.rowActive)} onClick={onEdit}>
      <span {...stylex.props(styles.name)}>{animal.name}</span>
      <span {...stylex.props(styles.meta)}>
        {SPECIES_LABEL[animal.species]}
        {animal.breed ? ` · ${animal.breed}` : ""}
      </span>
      <span {...stylex.props(styles.spacer)} />
      <Hb.Chip label={statusLabel} size="small" variant="soft" color={STATUS_COLOR[statusLabel]} />
    </button>
  );
};
