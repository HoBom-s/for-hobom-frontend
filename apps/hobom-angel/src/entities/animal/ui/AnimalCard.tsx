import type { ReactNode } from "react";
import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { AnimalPhoto } from "./AnimalPhoto";
import { styles } from "./AnimalCard.styles";
import { SEX_LABEL } from "../model/animal.model";
import type { AnimalSex, AnimalStatusLabel } from "../model/animal.model";

const SEX_GLYPH: Record<AnimalSex, string | null> = {
  MALE: "♂",
  FEMALE: "♀",
  UNKNOWN: null,
};

interface AnimalCardProps {
  name: string;
  status: AnimalStatusLabel;
  /** Attribute line, e.g. "푸들 · 2살 · 소형". */
  meta: string;
  /** Rendered as a ♂/♀ glyph beside the name. */
  sex?: AnimalSex;
  /** One-line personality note, e.g. "듬직하고 순해요". */
  personality?: string | null;
  /** Short trust badges under the attribute line — 중성화 완료 등. */
  badges?: string[];
  /** Muted closing line, e.g. "보호 113일째". */
  footnote?: string;
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
  sex,
  personality,
  badges = [],
  footnote,
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
        <div {...stylex.props(styles.nameRow)}>
          <h3 {...stylex.props(styles.name)}>{name}</h3>
          {sex && SEX_GLYPH[sex] && (
            <span
              {...stylex.props(styles.sex, sex === "FEMALE" && styles.sexFemale)}
              role="img"
              aria-label={SEX_LABEL[sex]}
            >
              {SEX_GLYPH[sex]}
            </span>
          )}
        </div>
        <p {...stylex.props(styles.meta)}>{meta}</p>
        {personality && <p {...stylex.props(styles.personality)}>{personality}</p>}
        {(badges.length > 0 || footnote) && (
          <div {...stylex.props(styles.badges)}>
            {badges.map((badge) => (
              <span key={badge} {...stylex.props(styles.badge)}>
                {badge}
              </span>
            ))}
            {footnote && <span {...stylex.props(styles.footnote)}>{footnote}</span>}
          </div>
        )}
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
