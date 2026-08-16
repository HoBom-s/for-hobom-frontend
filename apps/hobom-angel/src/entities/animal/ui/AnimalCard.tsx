import type { ReactNode } from "react";
import { Link } from "react-router";
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
  "입양 진행중": "warning",
  임보중: "secondary",
  입양완료: "success",
  반환: "default",
} as const;

/** A shelter animal preview card — the canonical photo-first floating card used
 *  on the list and shelter pages. Full-bleed media carries the name on a scrim
 *  and the favorite action; the attribute line + status chip sit below. */
export const AnimalCard = ({ name, status, meta, imageUrl, to, action }: AnimalCardProps) => {
  const card = (
    <div {...stylex.props(styles.card, Boolean(to) && styles.cardHoverable)}>
      <div {...stylex.props(styles.media)}>
        <AnimalPhoto src={imageUrl} alt={name} ratio="4 / 3" />
        <div {...stylex.props(styles.scrim)} aria-hidden="true" />
        {action && <div {...stylex.props(styles.action)}>{action}</div>}
        <h3 {...stylex.props(styles.name)}>{name}</h3>
      </div>
      <div {...stylex.props(styles.body)}>
        <p {...stylex.props(styles.meta)}>{meta}</p>
        <Hb.Chip label={status} size="small" variant="soft" color={STATUS_COLOR[status]} />
      </div>
    </div>
  );

  if (!to) return card;

  return (
    <Link to={to} {...stylex.props(styles.link)} aria-label={`${name} 상세 보기`}>
      {card}
    </Link>
  );
};
