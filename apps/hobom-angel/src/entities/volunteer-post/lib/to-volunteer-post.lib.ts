import type { RawVolunteerPost } from "../api/volunteer-post.type";
import type { VolunteerPost } from "../model/volunteer-post.model";

/** Anti-corruption: map the API review post to the UI model. */
export const toVolunteerPost = (raw: RawVolunteerPost): VolunteerPost => ({
  id: raw.id,
  authorId: raw.authorId,
  shelterId: raw.shelterId,
  eventId: raw.eventId,
  content: raw.content.map((block) => ({
    type: block.type,
    text: block.text,
    imageKey: block.imageKey,
    caption: block.caption,
  })),
  likeCount: raw.likeCount,
  commentCount: raw.commentCount,
  liked: raw.liked,
  bookmarked: raw.bookmarked,
  createdAt: raw.createdAt,
});
