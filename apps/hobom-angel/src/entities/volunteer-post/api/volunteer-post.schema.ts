import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { RawVolunteerPost, RawVolunteerPostPage } from "./volunteer-post.type";

/** A content block on the wire. */
const postBlockSchema = HoBomSchema.object({
  type: HoBomSchema.enum(["TEXT", "IMAGE"]),
  text: HoBomSchema.string().nullable(),
  imageKey: HoBomSchema.string().nullable(),
  caption: HoBomSchema.string().nullable(),
});

/** A single review post on the wire. */
export const volunteerPostSchema: Schema<RawVolunteerPost> = HoBomSchema.object({
  id: HoBomSchema.string(),
  authorId: HoBomSchema.string(),
  shelterId: HoBomSchema.string(),
  eventId: HoBomSchema.string().nullable(),
  content: HoBomSchema.array(postBlockSchema),
  likeCount: HoBomSchema.number(),
  commentCount: HoBomSchema.number(),
  liked: HoBomSchema.boolean(),
  bookmarked: HoBomSchema.boolean(),
  createdAt: HoBomSchema.string().nullable(),
});

/** `GET /volunteer-posts` — a cursor page of review posts. */
export const volunteerPostPageSchema: Schema<RawVolunteerPostPage> = HoBomSchema.object({
  items: HoBomSchema.array(volunteerPostSchema),
  nextCursor: HoBomSchema.string().nullable(),
  hasNext: HoBomSchema.boolean(),
});
