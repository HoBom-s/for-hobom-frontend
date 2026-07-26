import { describe, expect, it } from "vitest";
import { bookmarkPatch, likePatch, patchPost } from "./apply-post-reaction.lib";
import type { VolunteerPost, VolunteerPostPage } from "../model/volunteer-post.model";

const post = (id: string, over: Partial<VolunteerPost> = {}): VolunteerPost => ({
  id,
  authorId: "user-1",
  shelterId: "shelter-1",
  eventId: null,
  content: [{ type: "TEXT", text: "후기", imageKey: null, caption: null }],
  likeCount: 3,
  commentCount: 0,
  liked: false,
  bookmarked: false,
  createdAt: null,
  ...over,
});

const page = (posts: VolunteerPost[]): VolunteerPostPage => ({
  posts,
  nextCursor: null,
  hasNext: false,
});

describe("likePatch", () => {
  it("increments when liking, decrements when unliking", () => {
    expect(likePatch(post("p1"))).toEqual({ liked: true, likeCount: 4 });
    expect(likePatch(post("p1", { liked: true, likeCount: 4 }))).toEqual({ liked: false, likeCount: 3 });
  });
});

describe("bookmarkPatch", () => {
  it("flips the bookmark", () => {
    expect(bookmarkPatch(post("p1"))).toEqual({ bookmarked: true });
    expect(bookmarkPatch(post("p1", { bookmarked: true }))).toEqual({ bookmarked: false });
  });
});

describe("patchPost", () => {
  it("patches the matching post across pages and preserves pageParams", () => {
    const data = {
      pages: [page([post("p1"), post("p2")]), page([post("p3")])],
      pageParams: [undefined, "cursor-1"],
    };

    const next = patchPost(data, "p3", { liked: true, likeCount: 4 });

    expect(next.pages[1]?.posts[0]).toMatchObject({ id: "p3", liked: true, likeCount: 4 });
    expect(next.pages[0]?.posts[0]?.liked).toBe(false);
    expect(next.pageParams).toEqual([undefined, "cursor-1"]);
  });
});
