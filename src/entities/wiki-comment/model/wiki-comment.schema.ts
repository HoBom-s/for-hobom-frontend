import { z } from "zod";

export const CreateCommentSchema = z.object({
  content: z
    .string()
    .min(1, "댓글 내용을 입력해주세요.")
    .max(2000, "댓글은 2000자 이내로 입력해주세요."),
  parentCommentId: z.string().nullable().optional(),
});
