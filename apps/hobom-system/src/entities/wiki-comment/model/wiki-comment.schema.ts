import { HoBomSchema } from "hobom-schema";

export const CreateCommentSchema = HoBomSchema.object({
  content: HoBomSchema.string()
    .min(1, "댓글 내용을 입력해주세요.")
    .max(2000, "댓글은 2000자 이내로 입력해주세요."),
  parentCommentId: HoBomSchema.string().nullable().optional(),
});
