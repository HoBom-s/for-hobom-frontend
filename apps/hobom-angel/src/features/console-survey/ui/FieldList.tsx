import * as stylex from "@stylexjs/stylex";
import { Hb, Sortable } from "hobom-design-system";
import type { Question } from "@/entities/questionnaire";
import { questionMeta } from "../lib/survey-draft.lib";
import { styles } from "./ConsoleSurvey.styles";
import type { DragEndEvent } from "hobom-design-system";

interface FieldListProps {
  questions: Question[];
  selectedId: string | null;
  invalidIds: Set<string>;
  onSelect: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
  onRemove: (id: string) => void;
}

/** The ordered field list — drag the handle to reorder, click a row to edit. */
export const FieldList = ({
  questions,
  selectedId,
  invalidIds,
  onSelect,
  onReorder,
  onRemove,
}: FieldListProps) => {
  if (questions.length === 0) {
    return <p {...stylex.props(styles.emptyList)}>아래에서 필드를 추가해 설문을 시작하세요.</p>;
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) onReorder(String(active.id), String(over.id));
  };

  return (
    <Sortable.Root onDragEnd={handleDragEnd}>
      <Sortable.List items={questions.map((question) => question.id)}>
        <div {...stylex.props(styles.list)}>
          {questions.map((question) => (
            <Sortable.Item key={question.id} id={question.id} useHandle>
              <div
                {...stylex.props(
                  styles.fieldRow,
                  question.id === selectedId && styles.fieldRowActive,
                  invalidIds.has(question.id) && styles.fieldRowInvalid,
                )}
                role="button"
                tabIndex={0}
                onClick={() => onSelect(question.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(question.id);
                  }
                }}
              >
                <Sortable.Handle>
                  <span {...stylex.props(styles.handle)} aria-label="드래그해서 순서 변경">
                    ⠿
                  </span>
                </Sortable.Handle>
                <span {...stylex.props(styles.fieldText)}>
                  <span
                    {...stylex.props(
                      styles.fieldTitle,
                      !question.prompt.trim() && styles.fieldTitlePlaceholder,
                    )}
                  >
                    {question.prompt.trim() || "제목 없는 질문"}
                  </span>
                  <span {...stylex.props(styles.fieldMeta)}>{questionMeta(question)}</span>
                </span>
                <Hb.Button
                  variant="ghost"
                  size="small"
                  aria-label="필드 삭제"
                  onClick={(event) => {
                    event.stopPropagation();
                    onRemove(question.id);
                  }}
                >
                  삭제
                </Hb.Button>
              </div>
            </Sortable.Item>
          ))}
        </div>
      </Sortable.List>
    </Sortable.Root>
  );
};
