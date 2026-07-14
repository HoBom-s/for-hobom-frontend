import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { styles } from "./AnimalCard.styles";
import type { AnimalStatusLabel } from "../model/animal.model";

interface AnimalCardProps {
  name: string;
  status: AnimalStatusLabel;
  /** Attribute line, e.g. "dog · 2yr · Seoul". */
  meta: string;
  imageUrl?: string;
}

const STATUS_COLOR = {
  입양가능: "primary",
  예약중: "warning",
  임보중: "secondary",
  입양완료: "success",
  반환: "default",
} as const;

/** A shelter animal preview card — used on the landing, list, and shelter pages. */
export const AnimalCard = ({ name, status, meta, imageUrl }: AnimalCardProps) => (
  <Hb.Card.Root
    variant="outlined"
    style={{ overflow: "hidden", borderRadius: "var(--hb-angel-radius-card)" }}
  >
    <div {...stylex.props(styles.photo)}>
      {imageUrl ? (
        <img src={imageUrl} alt={name} {...stylex.props(styles.image)} />
      ) : (
        <span {...stylex.props(styles.paw)} aria-hidden="true">
          🐾
        </span>
      )}
    </div>
    <div {...stylex.props(styles.body)}>
      <div {...stylex.props(styles.nameRow)}>
        <h3 {...stylex.props(styles.name)}>{name}</h3>
        <Hb.Chip label={status} size="small" variant="soft" color={STATUS_COLOR[status]} />
      </div>
      <p {...stylex.props(styles.meta)}>{meta}</p>
    </div>
  </Hb.Card.Root>
);
