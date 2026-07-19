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
  "입양 진행중": "warning",
  임보중: "secondary",
  입양완료: "success",
  반환: "default",
};

const ACTIVE = { backgroundColor: "var(--hb-color-accent-subtle, oklch(0.95 0.03 155))" };

interface AnimalRosterRowProps {
  animal: Animal;
  active: boolean;
  onEdit: () => void;
}

/** A DS-table row — thumbnail, name·breed, status, and a signup-count slot.
 *  Selecting it opens the animal in the edit form. */
export const AnimalRosterRow = ({ animal, active, onEdit }: AnimalRosterRowProps) => {
  const statusLabel = STATUS_LABEL[animal.status];

  return (
    <Hb.Table.Row hover selected={active} onClick={onEdit} style={{ cursor: "pointer", ...(active ? ACTIVE : {}) }}>
      <Hb.Table.Cell>
        {animal.photoUrl ? (
          <img src={mediaUrl(animal.photoUrl)} alt="" {...stylex.props(styles.thumb)} />
        ) : (
          <span {...stylex.props(styles.thumbEmpty)} />
        )}
      </Hb.Table.Cell>
      <Hb.Table.Cell>
        <span {...stylex.props(styles.nameCell)}>
          <span {...stylex.props(styles.name)}>{animal.name}</span>
          <span {...stylex.props(styles.breed)}>
            {SPECIES_LABEL[animal.species]}
            {animal.breed ? ` · ${animal.breed}` : ""}
          </span>
        </span>
      </Hb.Table.Cell>
      <Hb.Table.Cell>
        <Hb.Chip label={statusLabel} size="small" variant="soft" color={STATUS_COLOR[statusLabel]} />
      </Hb.Table.Cell>
      <Hb.Table.Cell align="right">—</Hb.Table.Cell>
    </Hb.Table.Row>
  );
};
