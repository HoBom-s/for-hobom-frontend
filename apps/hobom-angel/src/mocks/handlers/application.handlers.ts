import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { ok } from "./ok";
import { mockSession } from "./mock-session";

interface AnswerRow {
  questionId: string;
  values: string[];
}

interface ApplicationRow {
  id: string;
  animalId: string;
  shelterId: string;
  applicantId: string;
  status: string;
  questionnaireVersion: number;
  plannedEndDate?: string | null;
  createdAt: string | null;
  answers: AnswerRow[];
}

// Answers reference the seeded questionnaire question ids (q1–q5 / f1–f4).
const ADOPTION_APPLICATIONS: ApplicationRow[] = [
  {
    id: "adopt-1",
    animalId: "animal-1",
    shelterId: "shelter-1",
    applicantId: "651f2a9c0b1d2e3f4a5b6c7d",
    status: "PENDING",
    questionnaireVersion: 1,
    createdAt: "2026-07-16T02:00:00.000Z",
    answers: [
      { questionId: "q1", values: ["아파트"] },
      { questionId: "q2", values: ["false"] },
      { questionId: "q4", values: ["오래 함께할 가족을 찾고 있어요. 산책도 매일 시켜줄 수 있어요."] },
      { questionId: "q5", values: ["6시간 이상"] },
    ],
  },
  {
    id: "adopt-2",
    animalId: "animal-6",
    shelterId: "shelter-1",
    applicantId: "651f2a9c0b1d2e3f4a5b6c99",
    status: "APPROVED",
    questionnaireVersion: 1,
    createdAt: "2026-07-10T05:30:00.000Z",
    answers: [
      { questionId: "q1", values: ["주택"] },
      { questionId: "q2", values: ["true"] },
      { questionId: "q3", values: ["배우자", "자녀"] },
    ],
  },
  {
    id: "adopt-3",
    animalId: "animal-11",
    shelterId: "shelter-1",
    applicantId: "651f2a9c0b1d2e3f4a5babcd",
    status: "REJECTED",
    questionnaireVersion: 1,
    createdAt: "2026-06-28T09:15:00.000Z",
    answers: [{ questionId: "q1", values: ["원룸"] }],
  },
];

const FOSTER_APPLICATIONS: ApplicationRow[] = [
  {
    id: "foster-1",
    animalId: "animal-6",
    shelterId: "shelter-1",
    applicantId: "651f2a9c0b1d2e3f4a5bcdef",
    status: "PENDING",
    questionnaireVersion: 1,
    plannedEndDate: "2026-09-30T00:00:00.000Z",
    createdAt: "2026-07-15T01:00:00.000Z",
    answers: [
      { questionId: "f1", values: ["1~3개월"] },
      { questionId: "f2", values: ["true"] },
      { questionId: "f4", values: ["잠시나마 따뜻한 보금자리를 내어주고 싶어요."] },
    ],
  },
  {
    id: "foster-2",
    animalId: "animal-1",
    shelterId: "shelter-1",
    applicantId: "651f2a9c0b1d2e3f4a5bffff",
    status: "APPROVED",
    questionnaireVersion: 1,
    plannedEndDate: null,
    createdAt: "2026-07-01T07:45:00.000Z",
    answers: [
      { questionId: "f1", values: ["3개월 이상"] },
      { questionId: "f3", values: ["true"] },
    ],
  },
];

const toSummary = (row: ApplicationRow) => ({
  id: row.id,
  animalId: row.animalId,
  shelterId: row.shelterId,
  applicantId: row.applicantId,
  status: row.status,
  questionnaireVersion: row.questionnaireVersion,
  plannedEndDate: row.plannedEndDate ?? null,
  createdAt: row.createdAt,
});

const queue = (rows: ApplicationRow[], status: string | null) => {
  const items = (status ? rows.filter((row) => row.status === status) : rows).map(toSummary);

  return ok({ items, nextCursor: null, hasNext: false });
};

const detail = (rows: ApplicationRow[], id: string | readonly string[] | undefined) => {
  const row = rows.find((candidate) => candidate.id === id);

  if (!row) return HttpResponse.json({ message: "신청을 찾을 수 없어요." }, { status: 404 });

  return ok(row);
};

/** §7.2 console — adoption / foster application read endpoints (queue + detail). */
export const applicationHandlers = [
  http.get(mockUrl("/shelters/:shelterId/adoption-applications"), ({ request }) => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    return queue(ADOPTION_APPLICATIONS, new URL(request.url).searchParams.get("status"));
  }),

  http.get(mockUrl("/shelters/:shelterId/foster-applications"), ({ request }) => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    return queue(FOSTER_APPLICATIONS, new URL(request.url).searchParams.get("status"));
  }),

  // §05 consumer — the viewer's own applications (내 신청 내역).
  http.get(mockUrl("/me/adoption-applications"), ({ request }) => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    return queue(ADOPTION_APPLICATIONS, new URL(request.url).searchParams.get("status"));
  }),

  http.get(mockUrl("/me/foster-applications"), ({ request }) => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    return queue(FOSTER_APPLICATIONS, new URL(request.url).searchParams.get("status"));
  }),

  http.get(mockUrl("/adoption-applications/:id"), ({ params }) => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    return detail(ADOPTION_APPLICATIONS, params.id);
  }),

  http.get(mockUrl("/foster-applications/:id"), ({ params }) => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    return detail(FOSTER_APPLICATIONS, params.id);
  }),
];
