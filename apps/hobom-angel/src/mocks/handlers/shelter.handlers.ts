import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { ok } from "./ok";
import { mockSession } from "./mock-session";

const SHELTER = {
  id: "shelter-1",
  name: "행복보호소",
  slug: "haengbok-shelter",
  status: "VERIFIED",
  trustTier: "A",
  addressVisibility: "PARTIAL",
  address: { region: "서울", city: "강남구" },
  facilityPhotos: [
    {
      objectKey: "https://picsum.photos/seed/shelter1-a/800/450",
      kind: "EXTERIOR",
      caption: "보호소 외관",
    },
    {
      objectKey: "https://picsum.photos/seed/shelter1-b/800/450",
      kind: "INTERIOR",
      caption: "실내 견사",
    },
    { objectKey: "https://picsum.photos/seed/shelter1-c/800/450", kind: "OTHER" },
  ],
  intro:
    "2015년부터 유기견·유기묘를 구조하고 새로운 가족을 찾아주는 비영리 보호소입니다. 건강한 입양 문화를 위해 투명하게 운영하고 있어요.",
  operatingSince: "2015-03-01T00:00:00.000Z",
  representativeName: "김보호",
  visitGuide: "방문은 평일 10:00–18:00, 사전 예약제로 운영해요. 예약은 상담 신청 후 안내드립니다.",
  supportGuide: "정기 후원과 물품 후원 모두 환영합니다. 후원 문의는 보호소에 남겨주세요.",
  coverImageKey: "https://picsum.photos/seed/shelter1-cover/1200/375",
};

interface VolunteerEventRow {
  id: string;
  shelterId: string;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  capacity: number;
  signedUpCount: number;
  status: string;
  type: string;
  transport: null;
  mySignupId: string | null;
  mySignupStatus: string | null;
}

const VOLUNTEER_EVENTS: VolunteerEventRow[] = [
  {
    id: "vol-1",
    shelterId: "shelter-1",
    title: "주말 산책 봉사",
    description: "아이들과 함께 동네를 산책하며 사회성을 길러주는 봉사예요.",
    startAt: "2026-08-02T01:00:00.000Z",
    endAt: "2026-08-02T04:00:00.000Z",
    capacity: 10,
    signedUpCount: 6,
    status: "OPEN",
    type: "GENERAL",
    transport: null,
    mySignupId: null,
    mySignupStatus: null,
  },
  {
    id: "vol-2",
    shelterId: "shelter-1",
    title: "견사 청소 봉사",
    description: "보호소 견사를 청소하고 정비하는 활동입니다.",
    startAt: "2026-07-05T01:00:00.000Z",
    endAt: "2026-07-05T03:00:00.000Z",
    capacity: 8,
    signedUpCount: 8,
    status: "CLOSED",
    type: "GENERAL",
    transport: null,
    mySignupId: null,
    mySignupStatus: null,
  },
];

// Applicants per event for the console (§07 봉사 일정 → 지원자 승인/거절).
const VOLUNTEER_APPLICANTS = new Map<
  string,
  { signupId: string; volunteerId: string; status: string }[]
>([
  [
    "vol-1",
    [
      { signupId: "vsg-1", volunteerId: "user-2", status: "APPROVED" },
      { signupId: "vsg-2", volunteerId: "user-3", status: "PENDING" },
      { signupId: "vsg-3", volunteerId: "mock-user-1", status: "PENDING" },
    ],
  ],
]);

let nextVolunteerEvent = VOLUNTEER_EVENTS.length + 1;

const ANNOUNCEMENTS = [
  {
    id: "ann-1",
    title: "설 연휴 임시보호 봉사자를 찾습니다",
    body: "연휴 기간 동안 아이들과 함께해 주실 임시보호 봉사자를 모집해요. 자세한 내용은 방문 상담 시 안내드립니다.",
    pinned: true,
    createdAt: "2026-02-10T00:00:00.000Z",
  },
  {
    id: "ann-2",
    title: "겨울 방한용품 후원에 감사드립니다",
    body: "따뜻한 마음 덕분에 아이들이 포근한 겨울을 보내고 있어요. 정말 감사합니다.",
    pinned: false,
    createdAt: "2026-01-20T00:00:00.000Z",
  },
];

let nextAnnouncement = ANNOUNCEMENTS.length + 1;

const FAQS = [
  {
    id: "faq-1",
    question: "입양 절차가 어떻게 되나요?",
    answer: "관심 있는 아이의 프로필에서 입양 신청서를 작성하시면, 상담 후 방문·매칭 절차가 진행됩니다.",
    order: 1,
  },
  {
    id: "faq-2",
    question: "임시보호도 신청할 수 있나요?",
    answer: "네, 각 아이 상세 페이지에서 임시보호 신청이 가능하며 보호소가 개별적으로 연락드립니다.",
    order: 2,
  },
];

let nextFaq = FAQS.length + 1;

// Verified-shelter directory (§3.5). Only VERIFIED shelters are listed.
const DIRECTORY_NAMES = [
  ["행복보호소", "haengbok-shelter", "서울", "A"],
  ["행복한마음보호소", "haengbok-maeum", "서울", "B"],
  ["댕댕이쉼터", "daengdaeng", "서울", null],
  ["경기사랑보호소", "gg-sarang", "경기", "A"],
  ["평택동물보호소", "pyeongtaek", "경기", "B"],
  ["인천희망보호소", "ic-huimang", "인천", "A"],
  ["부산해운대보호소", "bs-haeundae", "부산", "B"],
  ["부산온기보호소", "bs-ongi", "부산", null],
  ["대구포근보호소", "dg-pogeun", "대구", "A"],
] as const;

const DIRECTORY = DIRECTORY_NAMES.map(([name, slug, region, trustTier], i) => ({
  id: `shelter-dir-${i + 1}`,
  name,
  slug,
  region,
  status: "VERIFIED",
  trustTier,
  coverImageKey: `https://picsum.photos/seed/shelter-dir-${i + 1}/800/450`,
}));

const MARKERS = [
  { id: "shelter-1", name: "행복보호소", slug: "haengbok-shelter", region: "서울", lat: 37.5665, lng: 126.978 },
  { id: "shelter-2", name: "행복한마음보호소", slug: "haengbok-maeum", region: "경기", lat: 37.4138, lng: 127.5183 },
  { id: "shelter-3", name: "인천반려동물보호소", slug: "incheon-anifriends", region: "인천", lat: 37.4563, lng: 126.7052 },
  { id: "shelter-4", name: "부산해운대보호소", slug: "busan-haeundae", region: "부산", lat: 35.1631, lng: 129.1637 },
  { id: "shelter-5", name: "대구동물사랑센터", slug: "daegu-animal-love", region: "대구", lat: 35.8714, lng: 128.6014 },
];

// §7.6 staff roster — one 대표 (ADMIN) plus staff, scoped to this shelter.
const STAFF = [
  { id: "mock-user-1", nickname: "봄이네", roles: ["SHELTER_ADMIN"], status: "ACTIVE" },
  { id: "user-2", nickname: "햇살", roles: ["SHELTER_STAFF"], status: "ACTIVE" },
  { id: "user-3", nickname: "바다", roles: ["SHELTER_STAFF"], status: "ACTIVE" },
  { id: "user-7", nickname: "구름", roles: ["SHELTER_STAFF"], status: "SUSPENDED" },
];

let nextApproval = 1;

// §7.6 pending 승격 요청 queue — candidates awaiting the representative's call.
interface PromotionRow {
  approvalId: string;
  candidateUserId: string;
  candidateNickname: string;
  candidateJoinedAt: string | null;
  volunteerCount: number;
}

const PROMOTION_REQUESTS: PromotionRow[] = [
  {
    approvalId: "appr-1001",
    candidateUserId: "user-21",
    candidateNickname: "박자원",
    candidateJoinedAt: "2025-11-20T00:00:00.000Z",
    volunteerCount: 20,
  },
  {
    approvalId: "appr-1002",
    candidateUserId: "user-22",
    candidateNickname: "이초록",
    candidateJoinedAt: "2026-05-02T00:00:00.000Z",
    volunteerCount: 5,
  },
];

const unauthorized = () => HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });

/** §04 shelter microsite mock handlers — profile, notices, FAQs, and roster. */
export const shelterHandlers = [
  http.get(mockUrl("/shelters/map"), ({ request }) => {
    if (!mockSession.isActive()) return unauthorized();

    const region = new URL(request.url).searchParams.get("region");
    const items = region ? MARKERS.filter((marker) => marker.region === region) : MARKERS;

    return ok(items);
  }),

  http.get(mockUrl("/shelters"), ({ request }) => {
    if (!mockSession.isActive()) return unauthorized();

    const url = new URL(request.url);
    const region = url.searchParams.get("region");
    const limit = Number(url.searchParams.get("limit") ?? "20");
    const cursor = Number(url.searchParams.get("cursor") ?? "0");
    const filtered = region ? DIRECTORY.filter((item) => item.region === region) : DIRECTORY;
    const page = filtered.slice(cursor, cursor + limit);
    const nextIndex = cursor + limit;
    const hasNext = nextIndex < filtered.length;

    return ok({ items: page, nextCursor: hasNext ? String(nextIndex) : null, hasNext });
  }),

  http.get(mockUrl("/shelters/:slug"), ({ params }) => {
    if (!mockSession.isActive()) return unauthorized();

    if (params.slug === SHELTER.slug) return ok(SHELTER);

    const dir = DIRECTORY.find((item) => item.slug === params.slug);

    if (!dir) {
      return HttpResponse.json({ message: "보호소를 찾을 수 없어요." }, { status: 404 });
    }

    return ok({
      ...SHELTER,
      id: dir.id,
      name: dir.name,
      slug: dir.slug,
      trustTier: dir.trustTier,
      coverImageKey: dir.coverImageKey,
      address: { ...SHELTER.address, region: dir.region },
    });
  }),

  http.get(mockUrl("/shelters/:shelterId/announcements"), () => {
    if (!mockSession.isActive()) return unauthorized();

    return ok(ANNOUNCEMENTS);
  }),

  // §7.4 console — announcement CRUD.
  http.post(mockUrl("/shelters/:shelterId/announcements"), async ({ request }) => {
    if (!mockSession.isActive()) return unauthorized();

    const input = (await request.json()) as { title: string; body: string; pinned: boolean };
    const id = `ann-${nextAnnouncement}`;

    nextAnnouncement += 1;
    ANNOUNCEMENTS.unshift({
      id,
      title: input.title,
      body: input.body,
      pinned: input.pinned,
      createdAt: "2026-07-18T00:00:00.000Z",
    });

    return ok({ id });
  }),

  http.patch(mockUrl("/announcements/:id"), async ({ params, request }) => {
    if (!mockSession.isActive()) return unauthorized();

    const input = (await request.json()) as { title: string; body: string; pinned: boolean };
    const announcement = ANNOUNCEMENTS.find((item) => item.id === params.id);

    if (announcement) {
      announcement.title = input.title;
      announcement.body = input.body;
      announcement.pinned = input.pinned;
    }

    return new HttpResponse(null, { status: 204 });
  }),

  http.delete(mockUrl("/announcements/:id"), ({ params }) => {
    if (!mockSession.isActive()) return unauthorized();

    const index = ANNOUNCEMENTS.findIndex((item) => item.id === params.id);

    if (index >= 0) ANNOUNCEMENTS.splice(index, 1);

    return new HttpResponse(null, { status: 204 });
  }),

  http.get(mockUrl("/shelters/:shelterId/faqs"), () => {
    if (!mockSession.isActive()) return unauthorized();

    return ok(FAQS);
  }),

  // §7.4 console — FAQ CRUD.
  http.post(mockUrl("/shelters/:shelterId/faqs"), async ({ request }) => {
    if (!mockSession.isActive()) return unauthorized();

    const input = (await request.json()) as { question: string; answer: string; order: number };
    const id = `faq-${nextFaq}`;

    nextFaq += 1;
    FAQS.push({ id, question: input.question, answer: input.answer, order: input.order });

    return ok({ id });
  }),

  http.patch(mockUrl("/faqs/:id"), async ({ params, request }) => {
    if (!mockSession.isActive()) return unauthorized();

    const input = (await request.json()) as { question: string; answer: string; order: number };
    const faq = FAQS.find((item) => item.id === params.id);

    if (faq) {
      faq.question = input.question;
      faq.answer = input.answer;
      faq.order = input.order;
    }

    return new HttpResponse(null, { status: 204 });
  }),

  http.delete(mockUrl("/faqs/:id"), ({ params }) => {
    if (!mockSession.isActive()) return unauthorized();

    const index = FAQS.findIndex((item) => item.id === params.id);

    if (index >= 0) FAQS.splice(index, 1);

    return new HttpResponse(null, { status: 204 });
  }),

  http.get(mockUrl("/shelters/:shelterId/stats"), () => {
    if (!mockSession.isActive()) return unauthorized();

    return ok({ adoptedCount: 240, shelteredCount: 32, availableCount: 18 });
  }),

  // §07 console — staff KPI dashboard (input for the 통계 screen).
  http.get(mockUrl("/shelters/:shelterId/dashboard"), () => {
    if (!mockSession.isActive()) return unauthorized();

    return ok({
      adoptedCount: 240,
      shelteredCount: 32,
      availableCount: 18,
      adoptionRate: 240 / (240 + 32),
      thisMonthAdoptions: 18,
      lastMonthAdoptions: 13,
      monthlyAdoptions: [
        { month: "2026-02", count: 7 },
        { month: "2026-03", count: 11 },
        { month: "2026-04", count: 9 },
        { month: "2026-05", count: 14 },
        { month: "2026-06", count: 13 },
        { month: "2026-07", count: 18 },
      ],
      pendingApplications: 6,
    });
  }),

  // §7.6 console — staff roster + open a promotion approval.
  http.get(mockUrl("/shelters/:shelterId/staff"), () => {
    if (!mockSession.isActive()) return unauthorized();

    return ok(STAFF);
  }),

  http.post(mockUrl("/shelters/:shelterId/staff-promotions"), async ({ request }) => {
    if (!mockSession.isActive()) return unauthorized();

    await request.json();
    const approvalId = `appr-${nextApproval}`;

    nextApproval += 1;

    return ok({ approvalId });
  }),

  http.get(mockUrl("/shelters/:shelterId/staff-promotions"), () => {
    if (!mockSession.isActive()) return unauthorized();

    return ok(PROMOTION_REQUESTS);
  }),

  // Decide a promotion approval — drops it from the queue.
  http.post(mockUrl("/approvals/:approvalId/decision"), ({ params }) => {
    if (!mockSession.isActive()) return unauthorized();

    const index = PROMOTION_REQUESTS.findIndex((row) => row.approvalId === params.approvalId);

    if (index >= 0) PROMOTION_REQUESTS.splice(index, 1);

    return new HttpResponse(null, { status: 204 });
  }),

  http.get(mockUrl("/shelters/:shelterId/volunteer-events"), () => {
    if (!mockSession.isActive()) return unauthorized();

    return ok({ items: VOLUNTEER_EVENTS, nextCursor: null, hasNext: false });
  }),

  // §07 console — create / cancel events and decide applicants.
  http.post(mockUrl("/shelters/:shelterId/volunteer-events"), async ({ params, request }) => {
    if (!mockSession.isActive()) return unauthorized();

    const input = (await request.json()) as {
      title: string;
      description?: string;
      startAt: string;
      endAt: string;
      capacity: number;
    };
    const id = `vol-${nextVolunteerEvent}`;

    nextVolunteerEvent += 1;

    VOLUNTEER_EVENTS.unshift({
      id,
      shelterId: String(params.shelterId),
      title: input.title,
      description: input.description ?? "",
      startAt: input.startAt,
      endAt: input.endAt,
      capacity: input.capacity,
      signedUpCount: 0,
      status: "OPEN",
      type: "GENERAL",
      transport: null,
      mySignupId: null,
      mySignupStatus: null,
    });

    return ok({ eventId: id });
  }),

  http.post(mockUrl("/volunteer-events/:eventId/cancellation"), ({ params }) => {
    if (!mockSession.isActive()) return unauthorized();

    const event = VOLUNTEER_EVENTS.find((candidate) => candidate.id === params.eventId);

    if (event) event.status = "CANCELLED";

    return new HttpResponse(null, { status: 204 });
  }),

  http.get(mockUrl("/volunteer-events/:eventId/signups"), ({ params }) => {
    if (!mockSession.isActive()) return unauthorized();

    return ok(VOLUNTEER_APPLICANTS.get(String(params.eventId)) ?? []);
  }),

  http.post(mockUrl("/volunteer-signups/:signupId/decision"), async ({ params, request }) => {
    if (!mockSession.isActive()) return unauthorized();

    const { decision } = (await request.json()) as { decision: "APPROVE" | "REJECT" };

    for (const list of VOLUNTEER_APPLICANTS.values()) {
      const applicant = list.find((candidate) => candidate.signupId === params.signupId);

      if (applicant) {
        applicant.status = decision === "APPROVE" ? "APPROVED" : "REJECTED";
        break;
      }
    }

    return new HttpResponse(null, { status: 204 });
  }),
];
