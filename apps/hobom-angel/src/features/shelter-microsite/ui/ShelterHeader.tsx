import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import { formatShelterAddress, isShelterVerified, TRUST_TIER_LABEL } from "@/entities/shelter";
import type { AddressVisibility, Shelter } from "@/entities/shelter";
import { FollowButton } from "./FollowButton";
import { styles } from "./ShelterHeader.styles";

const VISIBILITY_NOTE: Record<AddressVisibility, string> = {
  FULL: "",
  PARTIAL: " (상세주소 부분공개)",
  HIDDEN: " (지역만 공개)",
};

/** §04 microsite header: cover image, avatar, name + verification/trust badges,
 *  and the address·representative line. Composed from DS primitives. */
export const ShelterHeader = ({ shelter }: { shelter: Shelter }) => {
  const rep = shelter.representativeName ? ` · 대표 ${shelter.representativeName}` : "";
  const addressLine = `${formatShelterAddress(shelter.address)}${VISIBILITY_NOTE[shelter.addressVisibility]}${rep}`;

  return (
    <Hb.Stack spacing={2}>
      {shelter.coverImageUrl && (
        <Hb.Image
          src={shelter.coverImageUrl}
          alt={`${shelter.name} 커버 이미지`}
          ratio="16 / 5"
          priority
          style={{ borderRadius: 16 }}
        />
      )}

      <div {...stylex.props(styles.row)}>
        <span {...stylex.props(styles.avatar)} aria-hidden="true">
          {shelter.name.slice(0, 1)}
        </span>
        <Hb.Stack spacing={0.5}>
          <Hb.Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
            <Hb.Text variant="h4" component="h1">
              {shelter.name}
            </Hb.Text>
            {isShelterVerified(shelter.status) && (
              <Hb.Chip label="인증 보호소" color="success" variant="soft" size="small" />
            )}
            {shelter.trustTier && (
              <Hb.Chip label={TRUST_TIER_LABEL[shelter.trustTier]} variant="soft" size="small" />
            )}
          </Hb.Stack>
          <Hb.Text variant="body2" color="text.secondary">
            {addressLine}
          </Hb.Text>
        </Hb.Stack>

        <span {...stylex.props(styles.follow)}>
          <FollowButton shelterId={shelter.id} shelterName={shelter.name} />
        </span>
      </div>
    </Hb.Stack>
  );
};
