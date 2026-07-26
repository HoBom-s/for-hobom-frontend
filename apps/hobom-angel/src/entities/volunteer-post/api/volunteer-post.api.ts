import { httpClient, parseResponse } from "@/shared/api";
import { toVolunteerPost } from "../lib/to-volunteer-post.lib";
import { volunteerPostPageSchema } from "./volunteer-post.schema";
import type { VolunteerPostPage } from "../model/volunteer-post.model";

/** Fetch one cursor page from a feed-shaped endpoint (newest first). */
const fetchPostPage = (
  path: string,
  context: string,
  cursor: string | undefined,
  limit: number,
  signal?: AbortSignal,
): Promise<VolunteerPostPage> => {
  const query = new URLSearchParams({ limit: String(limit) });

  if (cursor) query.set("cursor", cursor);

  return httpClient
    .get(`${path}?${query.toString()}`, { signal })
    .then(parseResponse(volunteerPostPageSchema, context))
    .then((page) => ({
      posts: page.items.map(toVolunteerPost),
      nextCursor: page.nextCursor,
      hasNext: page.hasNext,
    }));
};

/** A page of the review feed (§05, newest first, cursor pagination). */
export const getVolunteerFeed = (cursor: string | undefined, limit: number, signal?: AbortSignal) =>
  fetchPostPage("/volunteer-posts", "GET /volunteer-posts", cursor, limit, signal);

/** A page of the viewer's saved (bookmarked) reviews. */
export const getMyBookmarks = (cursor: string | undefined, limit: number, signal?: AbortSignal) =>
  fetchPostPage(
    "/me/volunteer-post-bookmarks",
    "GET /me/volunteer-post-bookmarks",
    cursor,
    limit,
    signal,
  );

/** A content block to write — text for now (image blocks come with the presign
 *  flow). */
export interface PostBlockInput {
  type: "TEXT" | "IMAGE";
  text?: string;
  imageKey?: string;
  caption?: string;
}

/** Write a shelter-scoped review post from ordered content blocks. */
export const createVolunteerPost = (input: {
  shelterId: string;
  eventId?: string;
  content: PostBlockInput[];
}): Promise<void> => httpClient.post("/volunteer-posts", input).then(() => undefined);

/** Like a review post (no response body). */
export const likePost = (postId: string): Promise<void> =>
  httpClient.post(`/volunteer-posts/${postId}/likes`, {}).then(() => undefined);

/** Remove a like. */
export const unlikePost = (postId: string): Promise<void> =>
  httpClient.delete(`/volunteer-posts/${postId}/likes`).then(() => undefined);

/** Save (bookmark) a review post. */
export const bookmarkPost = (postId: string): Promise<void> =>
  httpClient.post(`/volunteer-posts/${postId}/bookmarks`, {}).then(() => undefined);

/** Remove a bookmark. */
export const unbookmarkPost = (postId: string): Promise<void> =>
  httpClient.delete(`/volunteer-posts/${postId}/bookmarks`).then(() => undefined);
