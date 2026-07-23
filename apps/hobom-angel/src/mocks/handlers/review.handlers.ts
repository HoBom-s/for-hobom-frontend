import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { ok } from "./ok";
import { mockSession } from "./mock-session";

interface ReviewRow {
  id: string;
  authorId: string;
  placementType: "ADOPTION" | "FOSTER";
  rating: number;
  body: string;
  createdAt: string;
}

const REVIEWS: ReviewRow[] = [
  {
    id: "review-1",
    authorId: "user-11",
    placementType: "ADOPTION",
    rating: 5,
    body: "상담부터 입양까지 정말 꼼꼼하게 챙겨주셨어요. 아이 건강 기록도 투명하게 공유해 주셔서 믿음이 갔습니다.",
    createdAt: "2026-06-28T09:00:00.000Z",
  },
  {
    id: "review-2",
    authorId: "user-12",
    placementType: "FOSTER",
    rating: 5,
    body: "임시보호 기간 내내 사료와 용품을 지원해 주시고, 궁금한 점은 언제든 친절하게 답해 주셨어요.",
    createdAt: "2026-06-20T04:30:00.000Z",
  },
  {
    id: "review-3",
    authorId: "user-13",
    placementType: "ADOPTION",
    rating: 4,
    body: "전반적으로 만족스러웠어요. 방문 예약이 조금 빠듯했지만 스태프분들이 배려해 주셨습니다.",
    createdAt: "2026-06-11T07:15:00.000Z",
  },
  {
    id: "review-4",
    authorId: "user-14",
    placementType: "ADOPTION",
    rating: 5,
    body: "입양 후에도 적응은 잘 하는지 먼저 연락 주셔서 감동했어요. 책임감이 느껴지는 보호소예요.",
    createdAt: "2026-05-30T10:00:00.000Z",
  },
  {
    id: "review-5",
    authorId: "user-15",
    placementType: "FOSTER",
    rating: 4,
    body: "처음 임보라 걱정이 많았는데 가이드가 자세해서 어렵지 않았어요. 추천합니다.",
    createdAt: "2026-05-18T02:45:00.000Z",
  },
  {
    id: "review-6",
    authorId: "user-16",
    placementType: "ADOPTION",
    rating: 3,
    body: "아이는 건강하고 좋아요. 다만 연락이 조금 늦을 때가 있어 별 하나 뺐어요.",
    createdAt: "2026-05-02T06:20:00.000Z",
  },
];

const reputationOf = () => {
  const reviewCount = REVIEWS.length;
  const sum = REVIEWS.reduce((total, review) => total + review.rating, 0);
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  REVIEWS.forEach((review) => {
    distribution[review.rating] = (distribution[review.rating] ?? 0) + 1;
  });

  return {
    reviewCount,
    average: reviewCount > 0 ? Math.round((sum / reviewCount) * 10) / 10 : 0,
    distribution,
  };
};

/** Review domain mock — a shelter's reputation and paginated reviews (§04). */
export const reviewHandlers = [
  http.get(mockUrl("/shelters/:shelterId/reviews/reputation"), ({ params }) => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    return ok({ shelterId: String(params.shelterId), ...reputationOf() });
  }),

  http.get(mockUrl("/shelters/:shelterId/reviews"), ({ params }) => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    const shelterId = String(params.shelterId);
    const items = REVIEWS.map((review) => ({ ...review, shelterId }));

    return ok({ items, nextCursor: null, hasNext: false });
  }),

  // §04 — write a review for a completed placement.
  http.post(mockUrl("/shelters/:shelterId/reviews"), async ({ request }) => {
    if (!mockSession.isActive()) {
      return HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
    }

    await request.json();

    return ok({ reviewId: `review-${REVIEWS.length + 1}` });
  }),
];
