import type { VolunteerPost, VolunteerPostPage } from "../model/volunteer-post.model";

/** A patch to a single post's viewer-facing reaction fields. */
export type PostPatch = Partial<Pick<VolunteerPost, "liked" | "likeCount" | "bookmarked">>;

/** Apply a patch to one post wherever it sits across the loaded feed pages.
 *  Generic over the container so it preserves an infinite query's `pageParams`.
 *  Pure — the optimistic mutation just calls this, and it is unit-tested. */
export const patchPost = <T extends { pages: VolunteerPostPage[] }>(
  data: T,
  postId: string,
  patch: PostPatch,
): T => ({
  ...data,
  pages: data.pages.map((page) => ({
    ...page,
    posts: page.posts.map((post) => (post.id === postId ? { ...post, ...patch } : post)),
  })),
});

/** The optimistic patch for toggling a like. */
export const likePatch = (post: VolunteerPost): PostPatch => ({
  liked: !post.liked,
  likeCount: post.likeCount + (post.liked ? -1 : 1),
});

/** The optimistic patch for toggling a bookmark. */
export const bookmarkPatch = (post: VolunteerPost): PostPatch => ({
  bookmarked: !post.bookmarked,
});
