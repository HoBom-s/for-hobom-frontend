import * as stylex from "@stylexjs/stylex";
import { CheckCircle, Cancel, NavigateNext, Replay } from "hobom-design-system/icons";
import type { Quiz } from "@/entities/privacy-law";
import { Hb } from "@/shared/ui";
import { useQuizSession } from "../model/useQuizSession";

const styles = stylex.create({
  oxButton: {
    minWidth: 80,
    fontSize: "1.25rem",
    fontWeight: 700,
    paddingTop: 12,
    paddingBottom: 12,
  },
  oxAnswer: {
    backgroundColor: "var(--hb-color-success)",
    color: "#fff",
    ":hover": {
      backgroundColor: "color-mix(in srgb, var(--hb-color-success) 80%, #000)",
    },
  },
  oxWrong: {
    backgroundColor: "var(--hb-color-danger)",
    color: "#fff",
    ":hover": {
      backgroundColor: "color-mix(in srgb, var(--hb-color-danger) 80%, #000)",
    },
  },
});

interface Props {
  quizzes: Quiz[];
}

const OxInput = ({
  value,
  onChange,
  disabled,
  revealed,
  answer,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  revealed: boolean;
  answer: string;
}) => (
  <Hb.Stack direction="row" spacing={2}>
    {["O", "X"].map((option) => {
      const selected = value === option;
      const isAnswer = answer === option;

      return (
        <Hb.Button
          key={option}
          variant={selected || (revealed && isAnswer) ? "primary" : "secondary"}
          disabled={disabled}
          onClick={() => onChange(option)}
          {...stylex.props(
            styles.oxButton,
            revealed && isAnswer && styles.oxAnswer,
            revealed && selected && !isAnswer && styles.oxWrong,
          )}
        >
          {option}
          {revealed && isAnswer && <CheckCircle fontSize="small" sx={{ ml: 0.5 }} />}
          {revealed && selected && !isAnswer && <Cancel fontSize="small" sx={{ ml: 0.5 }} />}
        </Hb.Button>
      );
    })}
  </Hb.Stack>
);

const FillBlankInput = ({
  value,
  onChange,
  disabled,
  revealed,
  answer,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  revealed: boolean;
  answer: string;
}) => (
  <Hb.Stack spacing={1}>
    <Hb.TextField
      fullWidth
      size="small"
      placeholder="정답을 입력하세요..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
    {revealed && (
      <Hb.Text variant="body2" color="primary" fontWeight={600}>
        정답: {answer}
      </Hb.Text>
    )}
  </Hb.Stack>
);

const choiceBorderColor = (revealed: boolean, isAnswer: boolean, selected: boolean): string => {
  if (revealed) {
    if (isAnswer) return "success.main";
    if (selected) return "error.main";

    return "divider";
  }

  return selected ? "primary.main" : "divider";
};

const choiceBgColor = (revealed: boolean, isAnswer: boolean, selected: boolean): string => {
  if (!revealed) return "transparent";
  if (isAnswer) return "success.50";
  if (selected) return "error.50";

  return "transparent";
};

const MultipleChoiceInput = ({
  choices,
  value,
  onChange,
  disabled,
  revealed,
  answer,
}: {
  choices: string[];
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  revealed: boolean;
  answer: string;
}) => (
  <Hb.Radio.Group value={value} onChange={(_, v) => onChange(v)}>
    {choices.map((choice, i) => {
      const selected = value === choice;
      const isAnswer = answer === choice;
      let color: string | undefined;

      if (revealed) {
        if (isAnswer) color = "success.main";
        else if (selected) color = "error.main";
      }

      return (
        <Hb.Form.ControlLabel
          key={i}
          value={choice}
          disabled={disabled}
          control={<Hb.Radio.Root size="small" />}
          label={
            <Hb.Stack
              direction="row"
              spacing={1}
              style={{
                alignItems: "center",
              }}
            >
              <Hb.Text
                variant="body2"
                style={{
                  color,
                }}
              >
                {choice}
              </Hb.Text>
              {revealed && isAnswer && (
                <CheckCircle fontSize="small" sx={{ color: "success.main" }} />
              )}
              {revealed && selected && !isAnswer && (
                <Cancel fontSize="small" sx={{ color: "error.main" }} />
              )}
            </Hb.Stack>
          }
          sx={{
            mb: 0.5,
            mx: 0,
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            border: 1,
            borderColor: choiceBorderColor(revealed, isAnswer, selected),
            bgcolor: choiceBgColor(revealed, isAnswer, selected),
          }}
        />
      );
    })}
  </Hb.Radio.Group>
);

const QUIZ_TYPE_LABEL: Record<string, string> = {
  OX: "OX 퀴즈",
  FILL_BLANK: "빈칸 채우기",
  MULTIPLE_CHOICE: "객관식",
};

const scoreMessage = (score: number, total: number): string => {
  if (score === total) return "완벽합니다!";
  if (score >= total * 0.7) return "잘했습니다!";

  return "다시 도전해보세요.";
};

export const QuizCard = ({ quizzes }: Props) => {
  const {
    currentIndex,
    userAnswer,
    revealed,
    isCorrect,
    score,
    total,
    finished,
    currentQuiz,
    setAnswer,
    reveal,
    next,
    prev,
    reset,
  } = useQuizSession(quizzes);

  if (finished) {
    return (
      <Hb.Card.Root variant="outlined">
        <Hb.Card.Content
          style={{
            textAlign: "center",
            paddingTop: 32,
            paddingBottom: 32,
          }}
        >
          <Hb.Text variant="h5" gutterBottom>
            퀴즈 완료
          </Hb.Text>
          <Hb.Text variant="h3" color="primary" gutterBottom>
            {score} / {total}
          </Hb.Text>
          <Hb.Text variant="body2" color="text.secondary" gutterBottom>
            {scoreMessage(score, total)}
          </Hb.Text>
          <Hb.Button
            variant="secondary"
            startIcon={<Replay />}
            onClick={reset}
            style={{
              marginTop: 16,
            }}
          >
            다시 풀기
          </Hb.Button>
        </Hb.Card.Content>
      </Hb.Card.Root>
    );
  }

  if (!currentQuiz) return null;

  return (
    <Hb.Card.Root variant="outlined">
      <Hb.Card.Content>
        <Hb.Stack
          direction="row"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Hb.Stack direction="row" spacing={1}>
            <Hb.Chip label={`${currentIndex + 1} / ${total}`} size="small" color="primary" />
            <Hb.Chip
              label={QUIZ_TYPE_LABEL[currentQuiz.type] ?? currentQuiz.type}
              size="small"
              variant="outlined"
            />
          </Hb.Stack>
          <Hb.Text variant="caption" color="text.secondary">
            점수: {score}
          </Hb.Text>
        </Hb.Stack>

        <Hb.Progress.Linear
          variant="determinate"
          value={((currentIndex + 1) / total) * 100}
          style={{
            marginBottom: 24,
            borderRadius: 8,
          }}
        />

        <Hb.Text variant="subtitle1" fontWeight={600} gutterBottom>
          {currentQuiz.question}
        </Hb.Text>

        <Hb.Box
          style={{
            marginTop: 16,
          }}
        >
          {currentQuiz.type === "OX" && (
            <OxInput
              value={userAnswer}
              onChange={setAnswer}
              disabled={revealed}
              revealed={revealed}
              answer={currentQuiz.answer}
            />
          )}
          {currentQuiz.type === "FILL_BLANK" && (
            <FillBlankInput
              value={userAnswer}
              onChange={setAnswer}
              disabled={revealed}
              revealed={revealed}
              answer={currentQuiz.answer}
            />
          )}
          {currentQuiz.type === "MULTIPLE_CHOICE" && (
            <MultipleChoiceInput
              choices={currentQuiz.choices}
              value={userAnswer}
              onChange={setAnswer}
              disabled={revealed}
              revealed={revealed}
              answer={currentQuiz.answer}
            />
          )}
        </Hb.Box>

        {revealed && (
          <Hb.Alert severity={isCorrect ? "success" : "error"} sx={{ mt: 2 }}>
            {currentQuiz.explanation}
          </Hb.Alert>
        )}

        <Hb.Box
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Hb.Button variant="secondary" disabled={currentIndex === 0} onClick={prev}>
            이전
          </Hb.Button>
          <Hb.Stack direction="row" spacing={1}>
            {!revealed && (
              <Hb.Button variant="primary" disabled={!userAnswer} onClick={reveal}>
                정답 확인
              </Hb.Button>
            )}
            <Hb.Button
              variant={revealed ? "primary" : "secondary"}
              endIcon={<NavigateNext />}
              onClick={next}
            >
              {currentIndex + 1 < total ? "다음" : "결과 보기"}
            </Hb.Button>
          </Hb.Stack>
        </Hb.Box>
      </Hb.Card.Content>
    </Hb.Card.Root>
  );
};
