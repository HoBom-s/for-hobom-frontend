import * as stylex from "@stylexjs/stylex";
import { useEventApplicants } from "../model/useEventApplicants";
import { ApplicantRow } from "./ApplicantRow";
import { styles } from "./EventList.styles";

/** An event's applicants with approve / reject — loaded when the row expands. */
export const ApplicantList = ({ eventId }: { eventId: string }) => {
  const { applicants, loading, approve, reject, deciding } = useEventApplicants(eventId);

  if (loading) return <p {...stylex.props(styles.muted)}>지원자 불러오는 중…</p>;

  if (applicants.length === 0) {
    return <p {...stylex.props(styles.muted)}>아직 지원자가 없어요.</p>;
  }

  return (
    <>
      {applicants.map((applicant) => (
        <ApplicantRow
          key={applicant.signupId}
          applicant={applicant}
          disabled={deciding}
          onApprove={() => approve(applicant.signupId)}
          onReject={() => reject(applicant.signupId)}
        />
      ))}
    </>
  );
};
