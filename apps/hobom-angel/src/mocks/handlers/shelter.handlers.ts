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

const VOLUNTEER_EVENTS = [
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
  },
];

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

const NAMES = ["콩이", "보리", "초코", "나비", "깜냥", "단추"];
const SPECIES = ["DOG", "CAT", "OTHER"] as const;
const SIZES = ["SMALL", "MEDIUM", "LARGE"] as const;

const ROSTER = NAMES.map((name, i) => ({
  id: `shelter1-animal-${i + 1}`,
  shelterId: "shelter-1",
  name,
  species: SPECIES[i % SPECIES.length],
  description: "행복보호소에서 새 가족을 기다리는 아이예요.",
  status: i % 4 === 3 ? "RESERVED" : "AVAILABLE",
  traits: {
    sex: i % 2 === 0 ? "FEMALE" : "MALE",
    size: SIZES[i % SIZES.length],
    ageMonths: (i % 5) * 6 + 4,
    weightKg: (i % 4) + 3,
    breed: "믹스",
    color: "아이보리",
    personality: "온순·사교적",
  },
  photos: [{ objectKey: `https://picsum.photos/seed/shelter1-roster${i + 1}/600/450` }],
}));

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

const unauthorized = () => HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });

/** §04 shelter microsite mock handlers — profile, notices, FAQs, and roster. */
export const shelterHandlers = [
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

  http.get(mockUrl("/shelters/:shelterId/faqs"), () => {
    if (!mockSession.isActive()) return unauthorized();

    return ok(FAQS);
  }),

  http.get(mockUrl("/shelters/:shelterId/animals"), () => {
    if (!mockSession.isActive()) return unauthorized();

    return ok(ROSTER);
  }),

  http.get(mockUrl("/shelters/:shelterId/stats"), () => {
    if (!mockSession.isActive()) return unauthorized();

    return ok({ adoptedCount: 240, shelteredCount: 32, availableCount: 18 });
  }),

  http.get(mockUrl("/shelters/:shelterId/volunteer-events"), () => {
    if (!mockSession.isActive()) return unauthorized();

    return ok(VOLUNTEER_EVENTS);
  }),
];
