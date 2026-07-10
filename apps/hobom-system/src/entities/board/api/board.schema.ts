import { HoBomSchema } from "hobom-schema";
import type { Schema } from "hobom-schema";
import type { BoardColumn, BoardDto } from "./board.type";

const boardColumnSchema: Schema<BoardColumn> = HoBomSchema.object({
  statusId: HoBomSchema.string(),
  name: HoBomSchema.string(),
  wipLimit: HoBomSchema.number().nullable(),
  order: HoBomSchema.number(),
});

/** `BoardDto` 응답 스키마. shape이 타입과 어긋나면 tsc가 잡는다. */
export const boardSchema: Schema<BoardDto> = HoBomSchema.object({
  id: HoBomSchema.string(),
  project: HoBomSchema.string(),
  name: HoBomSchema.string(),
  type: HoBomSchema.enum(["KANBAN", "SCRUM"]),
  columns: HoBomSchema.array(boardColumnSchema),
  createdBy: HoBomSchema.string(),
});

export const boardsSchema: Schema<BoardDto[]> = HoBomSchema.array(boardSchema);
