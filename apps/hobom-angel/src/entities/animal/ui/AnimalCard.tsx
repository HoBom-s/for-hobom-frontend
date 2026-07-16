import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { AnimalPhoto } from "./AnimalPhoto";
import { styles } from "./AnimalCard.styles";
import type { AnimalStatusLabel } from "../model/animal.model";

interface AnimalCardProps {
  name: string;
  status: AnimalStatusLabel;
  /** Attribute line, e.g. "푸들 · 2살 · 소형". */
  meta: string;
  imageUrl?: string;
  /** When set, the whole card links to the animal's detail page. */
  to?: string;
  /** Overlaid on the photo's top-right — e.g. a favorite button. */
  action?: ReactNode;
}

const STATUS_COLOR = {
  입양가능: "primary",
  예약중: "warning",
  임보중: "secondary",
  입양완료: "success",
  반환: "default",
} as const;

/** A shelter animal preview card — used on the landing, list, and shelter pages. */
export const AnimalCard = ({ name, status, meta, imageUrl, to, action }: AnimalCardProps) => {
  const card = (
    <Hb.Card.Root
      variant="outlined"
      style={{ overflow: "hidden", borderRadius: "var(--hb-angel-radius-card)", height: "100%" }}
    >
      <div {...stylex.props(styles.media)}>
        <AnimalPhoto src={imageUrl} alt={name} ratio="4 / 3" />
        {action}
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

  if (!to) return card;

  return (
    <Link to={to} {...stylex.props(styles.link)} aria-label={`${name} 상세 보기`}>
      {card}
    </Link>
  );
};
