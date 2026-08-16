import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import {
  formatShelterAddress,
  isShelterVerified,
  operatingYears,
  TRUST_TIER_LABEL,
} from "@/entities/shelter";
import type { AddressVisibility, Shelter } from "@/entities/shelter";
import { FollowButton } from "./FollowButton";
import { styles } from "./ShelterHeader.styles";

const VISIBILITY_NOTE: Record<AddressVisibility, string> = {
  FULL: "",
  PARTIAL: " (상세주소 부분공개)",
  HIDDEN: " (지역만 공개)",
};

/** §04 microsite header: an asymmetric hero — shelter identity (name, trust
 *  chips, address) beside a photo-first cover carrying a floating proof chip.
 *  Composed from DS primitives on a warm wash. */
export const ShelterHeader = ({ shelter }: { shelter: Shelter }) => {
  const rep = shelter.representativeName ? ` · 대표 ${shelter.representativeName}` : "";
  const addressLine = `${formatShelterAddress(shelter.address)}${VISIBILITY_NOTE[shelter.addressVisibility]}${rep}`;
  const verified = isShelterVerified(shelter.status);
  const years = operatingYears(shelter.operatingSince, new Date());

  return (
    <header {...stylex.props(styles.hero)}>
      <div {...stylex.props(styles.identity)}>
        <div {...stylex.props(styles.avatarRow)}>
          <span {...stylex.props(styles.avatar)} aria-hidden="true">
            {shelter.name.slice(0, 1)}
          </span>
          <div>
            <p {...stylex.props(styles.kicker)}>보호소</p>
            <h1 {...stylex.props(styles.name)}>{shelter.name}</h1>
          </div>
        </div>

        <div {...stylex.props(styles.chips)}>
          {verified && (
            <span {...stylex.props(styles.chip, styles.chipVerified)}>인증 보호소</span>
          )}
          {shelter.trustTier && (
            <span {...stylex.props(styles.chip, styles.chipTrust)}>
              {TRUST_TIER_LABEL[shelter.trustTier]}
            </span>
          )}
        </div>

        <p {...stylex.props(styles.address)}>{addressLine}</p>

        <div {...stylex.props(styles.follow)}>
          <FollowButton shelterId={shelter.id} shelterName={shelter.name} />
        </div>
      </div>

      <div {...stylex.props(styles.cover)}>
        {shelter.coverImageUrl ? (
          <Hb.Image
            src={shelter.coverImageUrl}
            alt={`${shelter.name} 커버 이미지`}
            ratio="16 / 9"
            priority
          />
        ) : (
          <span {...stylex.props(styles.coverEmpty)} aria-hidden="true">
            🐾
          </span>
        )}
        <span {...stylex.props(styles.coverScrim)} aria-hidden="true" />
        {years != null && (
          <div {...stylex.props(styles.proof)}>
            <span {...stylex.props(styles.proofValue)}>{years}년째</span>
            <span {...stylex.props(styles.proofLabel)}>함께하고 있어요</span>
          </div>
        )}
      </div>
    </header>
  );
};
