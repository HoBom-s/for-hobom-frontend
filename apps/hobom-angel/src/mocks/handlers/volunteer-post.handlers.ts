import { http, HttpResponse } from "msw";
import { mockUrl } from "./mock-url";
import { ok } from "./ok";
import { mockSession } from "./mock-session";

interface Block {
  type: "TEXT" | "IMAGE";
  text: string | null;
  imageKey: string | null;
  caption: string | null;
}

const text = (value: string): Block => ({ type: "TEXT", text: value, imageKey: null, caption: null });
const image = (key: string, caption: string | null): Block => ({
  type: "IMAGE",
  text: null,
  imageKey: key,
  caption,
});

// Mutable review-post feed — viewer like/bookmark state lives on each post since
// the mock is single-user.
const POSTS = [
  {
    id: "post-1",
    authorId: "user-2",
    shelterId: "shelter-1",
    eventId: "vol-1",
    content: [
      text("날씨도 좋고 너무 행복한 하루였습니다. 아이들과 산책하며 힐링했어요."),
      image("https://picsum.photos/seed/hobompost1/600/450", "산책 중인 콩이"),
    ] as Block[],
    likeCount: 12,
    commentCount: 3,
    liked: false,
    bookmarked: false,
    createdAt: "2026-07-16T05:00:00.000Z",
  },
  {
    id: "post-2",
    authorId: "mock-user-1",
    shelterId: "shelter-1",
    eventId: null,
    content: [text("입양 홍보 부스 함께해 주신 봉사자분들 정말 감사했어요!")] as Block[],
    likeCount: 8,
    commentCount: 1,
    liked: true,
    bookmarked: true,
    createdAt: "2026-07-15T02:00:00.000Z",
  },
  {
    id: "post-3",
    authorId: "user-3",
    shelterId: "shelter-1",
    eventId: "vol-4",
    content: [text("미국행 이동봉사 무사히 잘 다녀왔습니다. 새 가족 품에서 행복하길.")] as Block[],
    likeCount: 25,
    commentCount: 5,
    liked: false,
    bookmarked: false,
    createdAt: "2026-07-14T09:00:00.000Z",
  },
];

// A few more image posts so the feed grid fills out.
const AUTHORS = ["user-2", "user-3", "mock-user-1"];

for (let i = 4; i <= 12; i += 1) {
  POSTS.push({
    id: `post-${i}`,
    authorId: AUTHORS[i % AUTHORS.length] ?? "user-2",
    shelterId: "shelter-1",
    eventId: null,
    content: [
      text(`봉사 후기 ${i} — 오늘도 아이들과 행복한 하루를 보냈어요.`),
      image(`https://picsum.photos/seed/hobomfeed${i}/600/600`, null),
    ] as Block[],
    likeCount: (i * 3) % 20,
    commentCount: i % 4,
    liked: false,
    bookmarked: false,
    createdAt: `2026-07-${10 + (i % 4)}T0${i % 9}:00:00.000Z`,
  });
}

interface StoredComment {
  id: string;
  postId: string;
  authorId: string;
  body: string;
  createdAt: string;
}

const COMMENTS: StoredComment[] = [
  {
    id: "comment-1",
    postId: "post-1",
    authorId: "user-3",
    body: "저도 다음 주에 참여해요! 후기 감사합니다.",
    createdAt: "2026-07-16T06:00:00.000Z",
  },
];

const unauthorized = () => HttpResponse.json({ message: "인증이 필요해요." }, { status: 401 });
const noContent = () => new HttpResponse(null, { status: 204 });

const find = (postId: unknown) => POSTS.find((post) => post.id === postId);

let nextId = POSTS.length + 1;
let nextCommentId = COMMENTS.length + 1;

/** §05 봉사 후기 피드 mock handlers — feed, write, like, bookmark. */
export const volunteerPostHandlers = [
  http.get(mockUrl("/volunteer-posts"), () => {
    if (!mockSession.isActive()) return unauthorized();

    return ok({ items: POSTS, nextCursor: null, hasNext: false });
  }),

  http.post(mockUrl("/volunteer-posts"), async ({ request }) => {
    if (!mockSession.isActive()) return unauthorized();

    const input = (await request.json()) as {
      shelterId: string;
      eventId?: string;
      content: { type: "TEXT" | "IMAGE"; text?: string; imageKey?: string; caption?: string }[];
    };
    const id = `post-${nextId}`;

    nextId += 1;

    POSTS.unshift({
      id,
      authorId: "mock-user-1",
      shelterId: input.shelterId,
      eventId: input.eventId ?? null,
      content: input.content.map((block) => ({
        type: block.type,
        text: block.text ?? null,
        imageKey: block.imageKey ?? null,
        caption: block.caption ?? null,
      })),
      likeCount: 0,
      commentCount: 0,
      liked: false,
      bookmarked: false,
      createdAt: "2026-07-17T00:00:00.000Z",
    });

    return ok({ id });
  }),

  http.get(mockUrl("/volunteer-posts/:postId/comments"), ({ params }) => {
    if (!mockSession.isActive()) return unauthorized();

    const items = COMMENTS.filter((comment) => comment.postId === params.postId);

    return ok({ items, nextCursor: null, hasNext: false });
  }),

  http.post(mockUrl("/volunteer-posts/:postId/comments"), async ({ params, request }) => {
    if (!mockSession.isActive()) return unauthorized();

    const { body } = (await request.json()) as { body: string };
    const postId = params.postId as string;
    const commentId = `comment-${nextCommentId}`;

    nextCommentId += 1;

    COMMENTS.push({
      id: commentId,
      postId,
      authorId: "mock-user-1",
      body,
      createdAt: "2026-07-17T00:00:00.000Z",
    });

    const post = find(postId);

    if (post) post.commentCount += 1;

    return ok({ commentId });
  }),

  http.post(mockUrl("/volunteer-posts/:postId/likes"), ({ params }) => {
    if (!mockSession.isActive()) return unauthorized();

    const post = find(params.postId);

    if (post && !post.liked) {
      post.liked = true;
      post.likeCount += 1;
    }

    return noContent();
  }),

  http.delete(mockUrl("/volunteer-posts/:postId/likes"), ({ params }) => {
    if (!mockSession.isActive()) return unauthorized();

    const post = find(params.postId);

    if (post && post.liked) {
      post.liked = false;
      post.likeCount -= 1;
    }

    return noContent();
  }),

  http.post(mockUrl("/volunteer-posts/:postId/bookmarks"), ({ params }) => {
    if (!mockSession.isActive()) return unauthorized();

    const post = find(params.postId);

    if (post) post.bookmarked = true;

    return noContent();
  }),

  http.delete(mockUrl("/volunteer-posts/:postId/bookmarks"), ({ params }) => {
    if (!mockSession.isActive()) return unauthorized();

    const post = find(params.postId);

    if (post) post.bookmarked = false;

    return noContent();
  }),
];
