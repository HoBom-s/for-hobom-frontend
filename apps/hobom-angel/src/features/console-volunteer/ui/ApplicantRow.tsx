import * as stylex from "@stylexjs/stylex";
import { useQuery } from "hobom-data";
import { Hb } from "hobom-design-system";
import { userQueries } from "@/entities/user";
import { VOLUNTEER_APPLICANT_STATUS_LABEL } from "@/entities/volunteer-event";
import type { VolunteerApplicant } from "@/entities/volunteer-event";
import { styles } from "./EventList.styles";

interface ApplicantRowProps {
  applicant: VolunteerApplicant;
  disabled: boolean;
  onApprove: () => void;
  onReject: () => void;
}

/** One applicant — nickname (hydrated) with approve / reject for pending signups,
 *  or the decided status otherwise. */
export const ApplicantRow = ({ applicant, disabled, onApprove, onReject }: ApplicantRowProps) => {
  const { data: profile } = useQuery(userQueries.publicProfile(applicant.volunteerId));

  return (
    <div {...stylex.props(styles.applicantRow)}>
      <span {...stylex.props(styles.applicantName)}>{profile?.nickname ?? "봉사자"}</span>
      <span {...stylex.props(styles.spacer)} />
      {applicant.status === "PENDING" ? (
        <>
          <Hb.Button variant="primary" size="small" disabled={disabled} onClick={onApprove}>
            승인
          </Hb.Button>
          <Hb.Button variant="ghost" size="small" disabled={disabled} onClick={onReject}>
            거절
          </Hb.Button>
        </>
      ) : (
        <span {...stylex.props(styles.applicantStatus)}>
          {VOLUNTEER_APPLICANT_STATUS_LABEL[applicant.status]}
        </span>
      )}
    </div>
  );
};
