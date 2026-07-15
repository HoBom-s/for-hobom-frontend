import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { ok } from "./ok";
import { mockSession } from "./mock-session";

const EVENTS = [
  {
    id: "vol-1",
    shelterId: "shelter-1",
    title: "주말 유기견 산책 봉사",
    description: "아이들과 동네를 산책하며 사회성을 길러주는 봉사예요. 편한 복장으로 오세요.",
    startAt: "2026-07-18T01:00:00.000Z",
    endAt: "2026-07-18T04:00:00.000Z",
    capacity: 12,
    signedUpCount: 5,
    status: "OPEN",
  },
  {
    id: "vol-2",
    shelterId: "shelter-1",
    title: "보호소 대청소",
    description: "견사와 마당을 정비하는 활동입니다.",
    startAt: "2026-07-20T00:00:00.000Z",
    endAt: "2026-07-20T03:00:00.000Z",
    capacity: 8,
    signedUpCount: 8,
    status: "CLOSED",
  },
  {
    id: "vol-3",
    shelterId: "shelter-2",
    title: "입양 홍보 부스 운영",
    description: "주말 플리마켓에서 입양 홍보 부스를 함께 운영해요.",
    startAt: "2026-07-20T05:00:00.000Z",
    endAt: "2026-07-20T08:00:00.000Z",
    capacity: 6,
    signedUpCount: 2,
    status: "OPEN",
  },
  {
    id: "vol-4",
    shelterId: "shelter-1",
    title: "해외 이동봉사 동행",
    description: "해외로 입양 가는 아이와 공항까지 동행하는 이동봉사입니다.",
    startAt: "2026-07-25T02:00:00.000Z",
    endAt: "2026-07-25T09:00:00.000Z",
    capacity: 4,
    signedUpCount: 1,
    status: "OPEN",
  },
];

const unauthorized = () => HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });

/** §05 volunteer mock handlers — upcoming list, detail, and signup. */
export const volunteerHandlers = [
  http.get(mockUrl("/volunteer-events"), () => {
    if (!mockSession.isActive()) return unauthorized();

    return ok(EVENTS);
  }),

  http.get(mockUrl("/volunteer-events/:eventId"), ({ params }) => {
    if (!mockSession.isActive()) return unauthorized();

    const event = EVENTS.find((candidate) => candidate.id === params.eventId);

    if (!event) {
      return HttpResponse.json({ message: "봉사 일정을 찾을 수 없어요." }, { status: 404 });
    }

    return ok(event);
  }),

  http.post(mockUrl("/volunteer-events/:eventId/signups"), ({ params }) => {
    if (!mockSession.isActive()) return unauthorized();

    const event = EVENTS.find((candidate) => candidate.id === params.eventId);

    if (event && event.signedUpCount < event.capacity) {
      event.signedUpCount += 1;
    }

    return ok({ signupId: `signup-${params.eventId as string}` });
  }),
];
