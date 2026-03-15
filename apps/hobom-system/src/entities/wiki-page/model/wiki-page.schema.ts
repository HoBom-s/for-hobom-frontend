import { HoBomSchema } from "hobom-schema";

export const UpdatePageSchema = HoBomSchema.object({
  title: HoBomSchema.string()
    .min(1, "페이지 제목을 입력해주세요.")
    .max(200, "제목은 200자 이내로 입력해주세요."),
  content: HoBomSchema.string(),
});
