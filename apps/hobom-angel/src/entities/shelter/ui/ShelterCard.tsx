import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { ChevronRight } from "hobom-design-system/icons";
import { shelterPath } from "@/shared/config";
import { isShelterVerified, TRUST_TIER_LABEL } from "../model/shelter.model";
import { styles } from "./ShelterCard.styles";
import type { ShelterListItem } from "../model/shelter.model";

interface ShelterCardProps {
  shelter: ShelterListItem;
}

/** A verified-shelter preview card — the whole card links to the microsite. */
export const ShelterCard = ({ shelter }: ShelterCardProps) => {
  const { name, slug, region, status, trustTier, coverImageUrl } = shelter;

  return (
    <Link to={shelterPath(slug)} {...stylex.props(styles.link)} aria-label={`${name} 보호소 보기`}>
      <Hb.Card.Root
        variant="outlined"
        style={{ overflow: "hidden", borderRadius: "var(--hb-angel-radius-card)", height: "100%" }}
      >
        <Hb.Image src={coverImageUrl ?? undefined} alt={name} ratio="16 / 9" />
        <div {...stylex.props(styles.body)}>
          <span {...stylex.props(styles.avatar)} aria-hidden="true">
            {name.slice(0, 1)}
          </span>

          <div {...stylex.props(styles.nameRow)}>
            <h3 {...stylex.props(styles.name)}>{name}</h3>
            {isShelterVerified(status) && (
              <Hb.Chip label="인증" color="success" variant="soft" size="small" />
            )}
          </div>

          <p {...stylex.props(styles.region)}>
            {region}
            {trustTier ? ` · ${TRUST_TIER_LABEL[trustTier]}` : ""}
          </p>

          <span {...stylex.props(styles.cta)}>
            보호소 방문하기
            <ChevronRight style={{ fontSize: 16 }} />
          </span>
        </div>
      </Hb.Card.Root>
    </Link>
  );
};
