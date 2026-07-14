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

/** Questionnaire domain mock — a shelter's adoption survey. */
export const questionnaireHandlers = [
  http.get(mockUrl("/shelters/:shelterId/questionnaires/:purpose"), ({ params }) => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    if (params.purpose !== "ADOPTION") {
      return HttpResponse.json({ message: "설문을 찾을 수 없어요." }, { status: 404 });
    }

    return ok({
      id: "questionnaire-1",
      shelterId: String(params.shelterId),
      purpose: "ADOPTION",
      version: 1,
      questions: ADOPTION_QUESTIONS,
    });
  }),
];
