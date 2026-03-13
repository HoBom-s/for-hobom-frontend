import {
  CheckCircle,
  Cancel,
  NavigateNext,
  Replay,
} from "hobom-design-system/icons";
import type { Quiz } from "@/entities/privacy-law";
import { Hb } from "@/shared/ui";
import { useQuizSession } from "../model/useQuizSession";

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
          sx={{
            minWidth: 80,
            fontSize: "1.25rem",
            fontWeight: 700,
            ...(revealed &&
              isAnswer && {
                bgcolor: "success.main",
                color: "#fff",
                "&:hover": { bgcolor: "success.dark" },
              }),
            ...(revealed &&
              selected &&
              !isAnswer && {
                bgcolor: "error.main",
                color: "#fff",
                "&:hover": { bgcolor: "error.dark" },
              }),
            py: 1.5,
          }}
        >
          {option}
          {revealed && isAnswer && (
            <CheckCircle fontSize="small" sx={{ ml: 0.5 }} />
          )}
          {revealed && selected && !isAnswer && (
            <Cancel fontSize="small" sx={{ ml: 0.5 }} />
          )}
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
            <Hb.Stack direction="row" alignItems="center" spacing={1}>
              <Hb.Text variant="body2" sx={{ color }}>
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
            borderColor: revealed
              ? isAnswer
                ? "success.main"
                : selected
                  ? "error.main"
                  : "divider"
              : selected
                ? "primary.main"
                : "divider",
            bgcolor: revealed
              ? isAnswer
                ? "success.50"
                : selected
                  ? "error.50"
                  : "transparent"
              : "transparent",
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
        <Hb.Card.Content sx={{ textAlign: "center", py: 4 }}>
          <Hb.Text variant="h5" gutterBottom>
            퀴즈 완료
          </Hb.Text>
          <Hb.Text variant="h3" color="primary" gutterBottom>
            {score} / {total}
          </Hb.Text>
          <Hb.Text variant="body2" color="text.secondary" gutterBottom>
            {score === total
              ? "완벽합니다!"
              : score >= total * 0.7
                ? "잘했습니다!"
                : "다시 도전해보세요."}
          </Hb.Text>
          <Hb.Button
            variant="secondary"
            startIcon={<Replay />}
            onClick={reset}
            sx={{ mt: 2 }}
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
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Hb.Stack direction="row" spacing={1}>
            <Hb.Chip
              label={`${currentIndex + 1} / ${total}`}
              size="small"
              color="primary"
            />
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
          sx={{ mb: 3, borderRadius: 1 }}
        />

        <Hb.Text variant="subtitle1" fontWeight={600} gutterBottom>
          {currentQuiz.question}
        </Hb.Text>

        <Hb.Box sx={{ mt: 2 }}>
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

        <Hb.Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Hb.Button
            variant="secondary"
            disabled={currentIndex === 0}
            onClick={prev}
          >
            이전
          </Hb.Button>
          <Hb.Stack direction="row" spacing={1}>
            {!revealed && (
              <Hb.Button
                variant="primary"
                disabled={!userAnswer}
                onClick={reveal}
              >
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
