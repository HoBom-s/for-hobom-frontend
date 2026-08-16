import * as stylex from "@stylexjs/stylex";
import { EmptyState } from "hobom-design-system";
import { ArticleOutlined } from "hobom-design-system/icons";
import { useOverlay } from "@/shared/model";
import type { ApplicationSummary } from "@/entities/application";
import { useMyApplications } from "../model/useMyApplications";
import { ApplicationCard } from "./ApplicationCard";
import { ReviewComposeDialog } from "./ReviewComposeDialog";
import { styles } from "./MyApplications.styles";

/** 내 신청 내역 — the viewer's adoption + foster applications, newest first,
 *  laid out as an animal-card grid (matching 찜한 동물). Completed placements
 *  can leave a review. */
export const MyApplications = () => {
  const { applications, animal } = useMyApplications();
  const overlay = useOverlay();

  const compose = (application: ApplicationSummary) =>
    overlay.open(({ close }) => (
      <ReviewComposeDialog
        application={application}
        animalName={animal(application.animalId)?.name ?? "이 아이"}
        onClose={close}
      />
    ));

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
        <span {...stylex.props(styles.kicker)}>
          <span {...stylex.props(styles.kickerDot)} aria-hidden />
          MY APPLICATIONS
        </span>
        <h1 {...stylex.props(styles.title)}>내 신청 내역</h1>
        <p {...stylex.props(styles.subtitle)}>입양·임시보호 신청 현황을 확인해요.</p>
      </header>

      {applications.length === 0 ? (
        <EmptyState
          icon={<ArticleOutlined style={{ fontSize: 40, color: "var(--hb-color-text-disabled)" }} />}
          message="아직 신청한 내역이 없어요."
        />
      ) : (
        <div {...stylex.props(styles.grid)}>
          {applications.map((application) => (
            <div key={application.id} {...stylex.props(styles.cell)}>
              <ApplicationCard application={application} animal={animal(application.animalId)} />
              {application.status === "APPROVED" && (
                <button
                  type="button"
                  {...stylex.props(styles.reviewCta)}
                  onClick={() => compose(application)}
                >
                  후기 남기기
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
