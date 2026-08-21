import { Link } from "react-router";
import * as stylex from "@stylexjs/stylex";
import { EmptyState } from "hobom-design-system";
import { ChevronRight, MailOutline } from "hobom-design-system/icons";
import { inquiryPath } from "@/shared/config";
import { mediaUrl } from "@/shared/lib";
import { useMyInquiries } from "../model/useMyInquiries";
import { styles } from "./MyInquiries.styles";

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" }) : "";

/** 내 문의 — the viewer's shelter inquiries, each opening its message thread. */
export const MyInquiries = () => {
  const { inquiries, animal } = useMyInquiries();

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <span {...stylex.props(styles.kicker)}>
          <span {...stylex.props(styles.kickerDot)} aria-hidden />
          MY INQUIRIES
        </span>
        <h1 {...stylex.props(styles.title)}>내 문의</h1>
        <p {...stylex.props(styles.subtitle)}>보호소에 남긴 문의와 답변을 확인해요.</p>
      </header>

      {inquiries.length === 0 ? (
        <EmptyState
          icon={
            <MailOutline
              style={{ fontSize: 40, color: "var(--hb-color-text-disabled)" }}
            />
          }
          message="아직 문의한 내역이 없어요."
        />
      ) : (
        <ul {...stylex.props(styles.list)}>
          {inquiries.map((inquiry) => {
            const pet = animal(inquiry.animalId);
            const thumb = pet?.photos[0];

            return (
              <li key={inquiry.inquiryId}>
                <Link to={inquiryPath(inquiry.inquiryId)} {...stylex.props(styles.card)}>
                  {thumb ? (
                    <img src={mediaUrl(thumb)} alt="" {...stylex.props(styles.thumb)} />
                  ) : (
                    <span {...stylex.props(styles.thumb, styles.thumbFallback)} aria-hidden>
                      <MailOutline fontSize="small" />
                    </span>
                  )}
                  <span {...stylex.props(styles.info)}>
                    <span {...stylex.props(styles.name)}>
                      {pet ? `${pet.name} 문의` : "보호소 문의"}
                    </span>
                    <span {...stylex.props(styles.date)}>{formatDate(inquiry.createdAt)}</span>
                  </span>
                  <ChevronRight fontSize="small" {...stylex.props(styles.chevron)} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
