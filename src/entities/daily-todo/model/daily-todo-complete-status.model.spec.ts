import { describe, it, expect } from "vitest";
import {
  changeCompleteStatus,
  DailyTodoCompleteStatusModel,
} from "./daily-todo-complete-status.model";

describe("changeCompleteStatus", () => {
  it("change complete status", () => {
    expect(changeCompleteStatus(DailyTodoCompleteStatusModel.PROGRESS)).toBe(
      DailyTodoCompleteStatusModel.COMPLETED,
    );
    expect(changeCompleteStatus(DailyTodoCompleteStatusModel.COMPLETED)).toBe(
      DailyTodoCompleteStatusModel.PROGRESS,
    );
  });
});
