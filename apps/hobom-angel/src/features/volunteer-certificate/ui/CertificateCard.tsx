import * as stylex from "@stylexjs/stylex";
import type { VolunteerCertificate } from "@/entities/volunteer-certificate";
import { formatCertDate, formatDay, formatMinutes } from "../lib/certificate-format.lib";
import { styles } from "./VolunteerCertificates.styles";

/** One issued certificate: its number, totals, and the participation lines. */
export const CertificateCard = ({ certificate }: { certificate: VolunteerCertificate }) => (
  <article {...stylex.props(styles.card)}>
    <span {...stylex.props(styles.accentBar)} aria-hidden="true" />
    <div {...stylex.props(styles.cardHead)}>
      <span {...stylex.props(styles.certNo)}>{certificate.certificateNo}</span>
      <span {...stylex.props(styles.spacer)} />
      <span {...stylex.props(styles.issuedAt)}>{formatCertDate(certificate.issuedAt)} 발급</span>
    </div>

    <div {...stylex.props(styles.totals)}>
      <div {...stylex.props(styles.total)}>
        <span {...stylex.props(styles.totalValue)}>{certificate.totalCount}회</span>
        <span {...stylex.props(styles.totalLabel)}>총 봉사</span>
      </div>
      <div {...stylex.props(styles.total)}>
        <span {...stylex.props(styles.totalValue)}>{certificate.totalHours}시간</span>
        <span {...stylex.props(styles.totalLabel)}>누적 시간</span>
      </div>
    </div>

    <div {...stylex.props(styles.items)}>
      {certificate.items.map((item, index) => (
        <div key={`${item.eventTitle}-${index}`} {...stylex.props(styles.item)}>
          <span {...stylex.props(styles.itemTitle)}>{item.eventTitle}</span>
          <span {...stylex.props(styles.itemMeta)}>{item.shelterName}</span>
          <span {...stylex.props(styles.itemSpacer)} />
          <span {...stylex.props(styles.itemMeta)}>
            {formatDay(item.startAt)} · {formatMinutes(item.minutes)}
          </span>
        </div>
      ))}
    </div>
  </article>
);
