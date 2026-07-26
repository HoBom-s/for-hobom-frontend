import { Suspense, useState } from "react";
import * as stylex from "@stylexjs/stylex";
import { PURPOSE_LABEL } from "@/entities/questionnaire";
import { LoadingState } from "@/shared/ui";
import type { QuestionnairePurpose } from "@/entities/questionnaire";
import { SurveyBuilder } from "./SurveyBuilder";
import { styles } from "./ConsoleSurvey.styles";

const PURPOSES: QuestionnairePurpose[] = ["ADOPTION", "FOSTER"];

/** §7.5 설문 빌더 — define the adoption and foster surveys applicants fill in.
 *  Scoped to the staff member's shelter. */
export const ConsoleSurvey = ({ shelterId }: { shelterId: string }) => {
  const [purpose, setPurpose] = useState<QuestionnairePurpose>("ADOPTION");

  return (
    <div {...stylex.props(styles.root)}>
      <h1 {...stylex.props(styles.title)}>설문 빌더</h1>
      <p {...stylex.props(styles.subtitle)}>
        왼쪽에서 필드를 만들고, 오른쪽 미리보기로 신청자 화면을 확인한 뒤 저장하면 새 버전으로 반영돼요
      </p>

      <div {...stylex.props(styles.purposeTabs)}>
        {PURPOSES.map((item) => (
          <button
            key={item}
            type="button"
            {...stylex.props(styles.tab, purpose === item && styles.tabActive)}
            onClick={() => setPurpose(item)}
          >
            {PURPOSE_LABEL[item]}
          </button>
        ))}
      </div>

      <Suspense fallback={<LoadingState />}>
        <SurveyBuilder key={purpose} shelterId={shelterId} purpose={purpose} />
      </Suspense>
    </div>
  );
};
