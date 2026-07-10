import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { ProjectLabelType } from "./project-label.type";

/** `ProjectLabelType` 응답 스키마. shape이 타입과 어긋나면 tsc가 잡는다. */
export const projectLabelSchema: Schema<ProjectLabelType> = HoBomSchema.object({
  id: HoBomSchema.string(),
  name: HoBomSchema.string(),
  color: HoBomSchema.string(),
});

export const projectLabelsSchema: Schema<ProjectLabelType[]> = HoBomSchema.array(projectLabelSchema);
