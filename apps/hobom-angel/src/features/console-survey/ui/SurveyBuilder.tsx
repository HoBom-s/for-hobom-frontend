import * as stylex from "@stylexjs/stylex";
import { Hb } from "hobom-design-system";
import type { QuestionnairePurpose } from "@/entities/questionnaire";
import { useConsoleSurvey } from "../model/useConsoleSurvey";
import { saveStatusCaption } from "../lib/survey-draft.lib";
import { FieldList } from "./FieldList";
import { FieldPalette } from "./FieldPalette";
import { FieldEditor } from "./FieldEditor";
import { SurveyPreview } from "./SurveyPreview";
import { styles } from "./ConsoleSurvey.styles";

/** The editable survey for one purpose: build on the left, preview the
 *  applicant's view on the right, publish a new version from the top bar.
 *  Mounted with `key={purpose}` so switching purpose re-seeds the draft. */
export const SurveyBuilder = ({
  shelterId,
  purpose,
}: {
  shelterId: string;
  purpose: QuestionnairePurpose;
}) => {
  const survey = useConsoleSurvey(shelterId, purpose);
  const invalidIds = new Set(survey.errors.map((error) => error.id));
  const selectedError = survey.selected
    ? survey.errors.find((error) => error.id === survey.selected?.id)?.message
    : undefined;

  const published = survey.version !== null;
  const caption = saveStatusCaption(published, survey.dirty);

  return (
    <div {...stylex.props(styles.builder)}>
      <div {...stylex.props(styles.topBar)}>
        <div {...stylex.props(styles.status)}>
          <span
            {...stylex.props(
              styles.statusDot,
              published && !survey.dirty ? styles.statusDotSaved : styles.statusDotDraft,
            )}
          />
          <span {...stylex.props(styles.statusVersion)}>
            {published ? `버전 ${survey.version}` : "새 설문"}
          </span>
          <span {...stylex.props(styles.statusCaption)}>· {caption}</span>
        </div>
        <span {...stylex.props(styles.topSpacer)} />
        <Hb.Button
          variant="primary"
          onClick={survey.save}
          disabled={!survey.canSave}
          loading={survey.saving}
        >
          저장
        </Hb.Button>
      </div>

      <div {...stylex.props(styles.panes)}>
        <div {...stylex.props(styles.pane)}>
          <h2 {...stylex.props(styles.paneHeading)}>
            필드 <span {...stylex.props(styles.paneCount)}>{survey.questions.length}</span>
          </h2>

          <FieldList
            questions={survey.questions}
            selectedId={survey.selectedId}
            invalidIds={invalidIds}
            onSelect={survey.select}
            onReorder={survey.reorder}
            onRemove={survey.removeQuestion}
          />

          <FieldPalette onAdd={survey.addQuestion} />

          <FieldEditor
            question={survey.selected}
            error={selectedError}
            onPrompt={(value) => survey.selected && survey.setPrompt(survey.selected.id, value)}
            onType={(type) => survey.selected && survey.setType(survey.selected.id, type)}
            onRequired={(required) =>
              survey.selected && survey.setRequired(survey.selected.id, required)
            }
            onOptions={(opts) => survey.selected && survey.setOptions(survey.selected.id, opts)}
          />
        </div>

        <div {...stylex.props(styles.pane)}>
          <h2 {...stylex.props(styles.paneHeading)}>미리보기</h2>
          <SurveyPreview questions={survey.questions} />
        </div>
      </div>
    </div>
  );
};
