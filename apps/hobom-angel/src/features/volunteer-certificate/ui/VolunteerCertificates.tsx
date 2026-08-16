import * as stylex from "@stylexjs/stylex";
import { EmptyState, Hb } from "hobom-design-system";
import { useVolunteerCertificates } from "../model/useVolunteerCertificates";
import { CertificateCard } from "./CertificateCard";
import { styles } from "./VolunteerCertificates.styles";

/** §05 내 봉사 확인서 — the volunteer's issued certificates, plus issuing a new
 *  one from completed participations. */
export const VolunteerCertificates = () => {
  const { certificates, issue, issuing } = useVolunteerCertificates();

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <div {...stylex.props(styles.headings)}>
          <span {...stylex.props(styles.kicker)}>
            <span {...stylex.props(styles.kickerDot)} aria-hidden="true" />
            MY VOLUNTEERING
          </span>
          <h1 {...stylex.props(styles.title)}>
            <span {...stylex.props(styles.rule)} aria-hidden="true" />
            봉사 확인서
          </h1>
          <p {...stylex.props(styles.subtitle)}>
            완료한 봉사 이력으로 확인서를 발급하고, 확인서 번호로 인증할 수 있어요.
          </p>
        </div>
        <Hb.Button variant="primary" onClick={issue} loading={issuing} {...stylex.props(styles.issue)}>
          확인서 발급
        </Hb.Button>
      </header>

      {certificates.length === 0 ? (
        <EmptyState message="아직 발급한 확인서가 없어요. 완료한 봉사가 있으면 발급할 수 있어요." />
      ) : (
        <div {...stylex.props(styles.list)}>
          {certificates.map((certificate) => (
            <CertificateCard key={certificate.certificateNo} certificate={certificate} />
          ))}
        </div>
      )}
    </div>
  );
};
