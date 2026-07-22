import * as stylex from "@stylexjs/stylex";
import { EmptyState } from "hobom-design-system";
import { ArticleOutlined } from "hobom-design-system/icons";
import { useMyApplications } from "../model/useMyApplications";
import { ApplicationCard } from "./ApplicationCard";
import { styles } from "./MyApplications.styles";

/** 내 신청 내역 — the viewer's adoption + foster applications, newest first,
 *  laid out as an animal-card grid (matching 찜한 동물). */
export const MyApplications = () => {
  const { applications, animal } = useMyApplications();

  return (
    <div {...stylex.props(styles.root)}>
      <header {...stylex.props(styles.header)}>
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
            <ApplicationCard
              key={application.id}
              application={application}
              animal={animal(application.animalId)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
