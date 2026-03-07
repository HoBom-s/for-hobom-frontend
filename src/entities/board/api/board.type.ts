export type BoardKind = "KANBAN" | "SCRUM";

export interface BoardColumn {
  statusId: string;
  name: string;
  wipLimit: number | null;
  order: number;
}

export interface BoardDto {
  id: string;
  project: string;
  name: string;
  type: BoardKind;
  columns: BoardColumn[];
  createdBy: string;
}

export interface CreateBoardRequest {
  name: string;
  type: BoardKind;
}

export interface UpdateBoardRequest {
  name?: string;
  columns?: BoardColumn[];
}
