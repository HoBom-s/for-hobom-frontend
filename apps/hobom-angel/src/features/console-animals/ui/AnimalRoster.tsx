import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import type { Animal } from "@/entities/animal";
import { AnimalRosterRow } from "./AnimalRosterRow";
import { styles } from "./AnimalRoster.styles";

/** Soft-green sticky header (green=status/trust) that floats a soft shadow so it
 *  reads as elevated when the list scrolls beneath it. */
const HEADER = {
  backgroundColor: "var(--hb-angel-green-tint)",
  color: "var(--hb-color-accent-dark)",
  boxShadow: "var(--hb-angel-shadow-sm)",
} as const;

interface AnimalRosterProps {
  animals: Animal[];
  editingId: string | null;
  onEdit: (animalId: string) => void;
}

/** The shelter's animals as a DS table with a sticky header (§7.1). Selecting a
 *  row opens it in the edit form. */
export const AnimalRoster = ({ animals, editingId, onEdit }: AnimalRosterProps) => {
  if (animals.length === 0) {
    return (
      <div {...stylex.props(styles.empty)}>
        <span {...stylex.props(styles.emptyKicker)}>동물</span>
        <p {...stylex.props(styles.emptyText)}>아직 등록한 동물이 없어요.</p>
        <p {...stylex.props(styles.emptyMeta)}>우리 보호소 동물을 등록해 보세요.</p>
      </div>
    );
  }

  return (
    <Hb.Table.Root size="small" stickyHeader style={{ width: "100%" }}>
      <Hb.Table.Head>
        <Hb.Table.Row>
          <Hb.Table.Cell scope="col" width={52} style={HEADER} />
          <Hb.Table.Cell scope="col" style={HEADER}>
            이름·품종
          </Hb.Table.Cell>
          <Hb.Table.Cell scope="col" style={HEADER}>
            상태
          </Hb.Table.Cell>
          <Hb.Table.Cell
            scope="col"
            align="right"
            style={HEADER}
            className={stylex.props(styles.countCol).className}
          >
            신청
          </Hb.Table.Cell>
        </Hb.Table.Row>
      </Hb.Table.Head>
      <Hb.Table.Body>
        {animals.map((animal) => (
          <AnimalRosterRow
            key={animal.id}
            animal={animal}
            active={animal.id === editingId}
            onEdit={() => onEdit(animal.id)}
          />
        ))}
      </Hb.Table.Body>
    </Hb.Table.Root>
  );
};
