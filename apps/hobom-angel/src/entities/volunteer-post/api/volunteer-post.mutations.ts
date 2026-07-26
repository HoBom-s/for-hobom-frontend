import { mutationOptions } from "hobom-data";
import { addComment } from "./comment.api";
import {
  bookmarkPost,
  createVolunteerPost,
  likePost,
  unbookmarkPost,
  unlikePost,
} from "./volunteer-post.api";
import type { PostBlockInput } from "./volunteer-post.api";
import type { VolunteerPost } from "../model/volunteer-post.model";

interface CreatePostInput {
  shelterId: string;
  eventId?: string;
  content: PostBlockInput[];
}

export const volunteerPostMutations = {
  create: () =>
    mutationOptions({
      mutationFn: (input: CreatePostInput) => createVolunteerPost(input),
    }),

  toggleLike: () =>
    mutationOptions({
      mutationFn: (post: VolunteerPost) => (post.liked ? unlikePost(post.id) : likePost(post.id)),
    }),

  toggleBookmark: () =>
    mutationOptions({
      mutationFn: (post: VolunteerPost) =>
        post.bookmarked ? unbookmarkPost(post.id) : bookmarkPost(post.id),
    }),

  addComment: (postId: string) =>
    mutationOptions({
      mutationFn: (body: string) => addComment(postId, body),
    }),
} as const;
