// Claude Design의 커버 사진과 겹쳐지는 보호소 프로필 카드를 구현하는 헤더
import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import {
  formatShelterAddress,
  isShelterVerified,
  operatingYears,
  shelterFallbackImage,
} from "@/entities/shelter";
import type { AddressVisibility, Shelter } from "@/entities/shelter";
import { FollowButton } from "./FollowButton";
import { styles } from "./ShelterHeader.styles";

const VISIBILITY_NOTE: Record<AddressVisibility, string> = {
  FULL: "",
  PARTIAL: " (상세주소 부분공개)",
  HIDDEN: " (지역만 공개)",
};

export const ShelterHeader = ({ shelter }: { shelter: Shelter }) => {
  const representative = shelter.representativeName ? ` · 대표 ${shelter.representativeName}` : "";
  const years = operatingYears(shelter.operatingSince, new Date());
  const operating = years != null ? ` · ${years}년째 운영` : "";
  const addressLine = `${formatShelterAddress(shelter.address)}${VISIBILITY_NOTE[shelter.addressVisibility]}${operating}${representative}`;

  return (
    <header {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.cover)}>
        <Hb.Image
          src={shelter.coverImageUrl ?? shelterFallbackImage}
          alt={shelter.coverImageUrl ? `${shelter.name} 커버 이미지` : ""}
          ratio="16 / 5"
          priority
          style={{ height: "100%" }}
          fallback={
            <img src={shelterFallbackImage} alt="" {...stylex.props(styles.fallbackImage)} />
          }
        />
      </div>

      <div {...stylex.props(styles.profile)}>
        <span {...stylex.props(styles.avatar)} aria-hidden="true">
          {shelter.name.slice(0, 1)}
        </span>
        <div {...stylex.props(styles.identity)}>
          <div {...stylex.props(styles.nameRow)}>
            <h1 {...stylex.props(styles.name)}>{shelter.name}</h1>
            {isShelterVerified(shelter.status) && (
              <span {...stylex.props(styles.trust)}>
                {shelter.trustTier ? `신뢰등급 ${shelter.trustTier}` : "검증 완료"}
              </span>
            )}
          </div>
          <p {...stylex.props(styles.address)}>{addressLine}</p>
        </div>
        <div {...stylex.props(styles.follow)}>
          <FollowButton shelterId={shelter.id} shelterName={shelter.name} />
        </div>
      </div>
    </header>
  );
};
