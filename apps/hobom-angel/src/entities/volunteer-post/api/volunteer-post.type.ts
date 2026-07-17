import type { PostBlockType } from "../model/volunteer-post.model";

/** One content block off the wire (flat — irrelevant fields are null). */
export interface RawPostBlock {
  type: PostBlockType;
  text: string | null;
  imageKey: string | null;
  caption: string | null;
}

/** `GET /volunteer-posts` item, straight off the wire. */
export interface RawVolunteerPost {
  id: string;
  authorId: string;
  shelterId: string;
  eventId: string | null;
  content: RawPostBlock[];
  likeCount: number;
  commentCount: number;
  liked: boolean;
  bookmarked: boolean;
  createdAt: string | null;
}

/** `GET /volunteer-posts` cursor page envelope. */
export interface RawVolunteerPostPage {
  items: RawVolunteerPost[];
  nextCursor: string | null;
  hasNext: boolean;
}
