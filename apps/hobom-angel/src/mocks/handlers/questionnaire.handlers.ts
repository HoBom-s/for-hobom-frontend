import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { ok } from "./ok";
import { mockSession } from "./mock-session";

const ADOPTION_QUESTIONS = [
  { id: "q1", prompt: "주거 형태를 알려주세요.", type: "SINGLE_CHOICE", options: ["아파트", "주택", "원룸"], required: true },
  { id: "q2", prompt: "현재 반려동물이 있나요?", type: "BOOLEAN", options: [], required: true },
  { id: "q3", prompt: "함께 지낼 가족 구성원을 모두 선택해주세요.", type: "MULTI_CHOICE", options: ["1인", "배우자", "자녀", "부모님"], required: false },
  { id: "q4", prompt: "입양을 결심한 이유를 자유롭게 작성해주세요.", type: "TEXT", options: [], required: true },
  { id: "q5", prompt: "하루 중 반려동물과 함께하는 시간은 어느 정도인가요?", type: "SINGLE_CHOICE", options: ["3시간 미만", "3~6시간", "6시간 이상"], required: true },
];

const FOSTER_QUESTIONS = [
  { id: "f1", prompt: "임시보호 가능 기간을 알려주세요.", type: "SINGLE_CHOICE", options: ["1개월 이내", "1~3개월", "3개월 이상"], required: true },
  { id: "f2", prompt: "현재 반려동물이 있나요?", type: "BOOLEAN", options: [], required: true },
  { id: "f3", prompt: "임시보호 경험이 있나요?", type: "BOOLEAN", options: [], required: false },
  { id: "f4", prompt: "임시보호를 신청하는 이유를 알려주세요.", type: "TEXT", options: [], required: true },
];

interface QuestionRow {
  id: string;
  prompt: string;
  type: string;
  options: string[];
  required: boolean;
}

const SURVEYS: Record<string, { id: string; version: number; questions: QuestionRow[] }> = {
  ADOPTION: { id: "questionnaire-1", version: 1, questions: ADOPTION_QUESTIONS },
  FOSTER: { id: "questionnaire-2", version: 1, questions: FOSTER_QUESTIONS },
};

let nextSurvey = Object.keys(SURVEYS).length + 1;

/** Questionnaire domain mock — a shelter's survey per purpose (adoption / foster). */
export const questionnaireHandlers = [
  http.get(mockUrl("/shelters/:shelterId/questionnaires/:purpose"), ({ params }) => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    const purpose = String(params.purpose);
    const survey = SURVEYS[purpose];

    if (!survey) {
      return HttpResponse.json({ message: "설문을 찾을 수 없어요." }, { status: 404 });
    }

    return ok({
      id: survey.id,
      shelterId: String(params.shelterId),
      purpose,
      version: survey.version,
      questions: survey.questions,
    });
  }),

  // §7.5 console — define / replace a survey; the server bumps the version.
  http.put(mockUrl("/shelters/:shelterId/questionnaires/:purpose"), async ({ params, request }) => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    const purpose = String(params.purpose);
    const body = (await request.json()) as { questions: QuestionRow[] };
    const existing = SURVEYS[purpose];

    SURVEYS[purpose] = {
      id: existing?.id ?? `questionnaire-${nextSurvey}`,
      version: (existing?.version ?? 0) + 1,
      questions: body.questions,
    };

    if (!existing) nextSurvey += 1;

    return new HttpResponse(null, { status: 204 });
  }),
];
