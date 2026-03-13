import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Radio,
  RadioGroup,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { CheckCircle, Cancel, NavigateNext, Replay } from "@mui/icons-material";
import type { ExamQuestion } from "@/entities/privacy-law";
import { useExamSession } from "../model/useExamSession";

interface Props {
  questions: ExamQuestion[];
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
  <Stack direction="row" spacing={2}>
    {["O", "X"].map((option) => {
      const selected = value === option;
      const isAnswer = answer === option;
      let color: "primary" | "success" | "error" | "inherit" = "inherit";

      if (revealed) {
        if (isAnswer) color = "success";
        else if (selected) color = "error";
      } else if (selected) {
        color = "primary";
      }

      return (
        <Button
          key={option}
          variant={
            selected || (revealed && isAnswer) ? "contained" : "outlined"
          }
          color={color}
          disabled={disabled}
          onClick={() => onChange(option)}
          sx={{ minWidth: 80, fontSize: "1.25rem", fontWeight: 700, py: 1.5 }}
        >
          {option}
          {revealed && isAnswer && (
            <CheckCircle fontSize="small" sx={{ ml: 0.5 }} />
          )}
          {revealed && selected && !isAnswer && (
            <Cancel fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Button>
      );
    })}
  </Stack>
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
  <Stack spacing={1}>
    <TextField
      fullWidth
      size="small"
      placeholder="정답을 입력하세요..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
    {revealed && (
      <Typography variant="body2" color="primary" fontWeight={600}>
        정답: {answer}
      </Typography>
    )}
  </Stack>
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
  <RadioGroup value={value} onChange={(_, v) => onChange(v)}>
    {choices.map((choice, i) => {
      const selected = value === choice;
      const isAnswer = answer === choice;
      let color: string | undefined;

      if (revealed) {
        if (isAnswer) color = "success.main";
        else if (selected) color = "error.main";
      }

      return (
        <FormControlLabel
          key={i}
          value={choice}
          disabled={disabled}
          control={<Radio size="small" />}
          label={
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" sx={{ color }}>
                {choice}
              </Typography>
              {revealed && isAnswer && (
                <CheckCircle fontSize="small" sx={{ color: "success.main" }} />
              )}
              {revealed && selected && !isAnswer && (
                <Cancel fontSize="small" sx={{ color: "error.main" }} />
              )}
            </Stack>
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
  </RadioGroup>
);

const QUIZ_TYPE_LABEL: Record<string, string> = {
  OX: "OX 퀴즈",
  FILL_BLANK: "빈칸 채우기",
  MULTIPLE_CHOICE: "객관식",
};

export const ExamQuestionCard = ({ questions }: Props) => {
  const {
    currentIndex,
    userAnswer,
    revealed,
    isCorrect,
    score,
    total,
    finished,
    currentQuestion,
    setAnswer,
    reveal,
    next,
    reset,
  } = useExamSession(questions);

  if (finished) {
    return (
      <Card variant="outlined">
        <CardContent sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h5" gutterBottom>
            모의고사 완료
          </Typography>
          <Typography variant="h3" color="primary" gutterBottom>
            {score} / {total}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {score === total
              ? "완벽합니다!"
              : score >= total * 0.7
                ? "잘했습니다!"
                : "다시 도전해보세요."}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Replay />}
            onClick={reset}
            sx={{ mt: 2 }}
          >
            다시 풀기
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!currentQuestion) return null;

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Stack direction="row" spacing={1}>
            <Chip
              label={`${currentIndex + 1} / ${total}`}
              size="small"
              color="primary"
            />
            <Chip
              label={
                QUIZ_TYPE_LABEL[currentQuestion.type] ?? currentQuestion.type
              }
              size="small"
              variant="outlined"
            />
            <Chip
              label={currentQuestion.subject}
              size="small"
              variant="outlined"
              color="secondary"
            />
          </Stack>
          <Typography variant="caption" color="text.secondary">
            점수: {score}
          </Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={((currentIndex + 1) / total) * 100}
          sx={{ mb: 3, borderRadius: 1 }}
        />

        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          {currentQuestion.question}
        </Typography>

        <Box sx={{ mt: 2 }}>
          {currentQuestion.type === "OX" && (
            <OxInput
              value={userAnswer}
              onChange={setAnswer}
              disabled={revealed}
              revealed={revealed}
              answer={currentQuestion.answer}
            />
          )}
          {currentQuestion.type === "FILL_BLANK" && (
            <FillBlankInput
              value={userAnswer}
              onChange={setAnswer}
              disabled={revealed}
              revealed={revealed}
              answer={currentQuestion.answer}
            />
          )}
          {currentQuestion.type === "MULTIPLE_CHOICE" && (
            <MultipleChoiceInput
              choices={currentQuestion.choices}
              value={userAnswer}
              onChange={setAnswer}
              disabled={revealed}
              revealed={revealed}
              answer={currentQuestion.answer}
            />
          )}
        </Box>

        {revealed && (
          <Alert severity={isCorrect ? "success" : "error"} sx={{ mt: 2 }}>
            {currentQuestion.explanation}
          </Alert>
        )}

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          {!revealed ? (
            <Button variant="contained" disabled={!userAnswer} onClick={reveal}>
              정답 확인
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<NavigateNext />}
              onClick={next}
            >
              {currentIndex + 1 < total ? "다음 문제" : "결과 보기"}
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
