import type { ReactNode } from "react";
import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
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
  /** Overlaid on the photo's top-left — e.g. a status/kind chip. */
  overlayStart?: ReactNode;
}

/** A shelter animal preview card — the canonical photo-first floating card used
 *  on the list and shelter pages. Status and favorite actions sit over the
 *  image while the name and attributes remain on the white information body. */
export const AnimalCard = ({
  name,
  status,
  meta,
  imageUrl,
  to,
  action,
  overlayStart,
}: AnimalCardProps) => {
  const card = (
    <div {...stylex.props(styles.card, Boolean(to) && styles.cardHoverable)}>
      <div {...stylex.props(styles.media)}>
        <AnimalPhoto src={imageUrl} alt={name} ratio="4 / 3" />
        {overlayStart ? (
          <div {...stylex.props(styles.overlayStart)}>{overlayStart}</div>
        ) : (
          <span {...stylex.props(styles.status, status === "입양 진행중" && styles.statusReserved)}>
            {status}
          </span>
        )}
        {action && <div {...stylex.props(styles.action)}>{action}</div>}
      </div>
      <div {...stylex.props(styles.body)}>
        <h3 {...stylex.props(styles.name)}>{name}</h3>
        <p {...stylex.props(styles.meta)}>{meta}</p>
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
