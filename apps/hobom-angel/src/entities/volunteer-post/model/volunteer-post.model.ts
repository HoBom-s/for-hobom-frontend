export type PostBlockType = "TEXT" | "IMAGE";

/** One content block. A post body is an ordered list of these, so images sit
 *  inline between text. Flat shape mirrors the wire — irrelevant fields are null. */
export interface PostBlock {
  type: PostBlockType;
  text: string | null;
  imageKey: string | null;
  caption: string | null;
}

/** A volunteer review post (§05 봉사 후기 피드). Shelter-scoped and viewer-aware —
 *  `liked`/`bookmarked` reflect the current user. */
export interface VolunteerPost {
  id: string;
  authorId: string;
  /** The shelter the review is about. */
  shelterId: string;
  /** The volunteer event this review is about, if any. */
  eventId: string | null;
  /** Ordered text/image content blocks. */
  content: PostBlock[];
  likeCount: number;
  commentCount: number;
  liked: boolean;
  bookmarked: boolean;
  /** ISO datetime, or null. */
  createdAt: string | null;
}

/** One page of the feed, as the UI model holds it (cursor pagination). */
export interface VolunteerPostPage {
  posts: VolunteerPost[];
  nextCursor: string | null;
  hasNext: boolean;
}
