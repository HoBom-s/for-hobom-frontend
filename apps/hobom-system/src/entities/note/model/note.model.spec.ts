import { describe, it, expect } from "vitest";
import { NoteStatusModel, NoteTypeModel, NoteRecurrenceModel } from "./note.model";

describe("NoteStatusModel", () => {
  it.each(["ACTIVE", "ARCHIVED", "TRASHED"])("parses valid status: %s", (s) => {
    expect(NoteStatusModel.parse(s)).toBe(s);
  });

  it("rejects invalid status", () => {
    expect(() => NoteStatusModel.parse("DELETED")).toThrow();
  });
});

describe("NoteTypeModel", () => {
  it.each(["TEXT", "CHECKLIST"])("parses valid type: %s", (t) => {
    expect(NoteTypeModel.parse(t)).toBe(t);
  });

  it("rejects invalid type", () => {
    expect(() => NoteTypeModel.parse("IMAGE")).toThrow();
  });
});

describe("NoteRecurrenceModel", () => {
  it.each(["NONE", "DAILY", "WEEKLY", "MONTHLY"])("parses valid recurrence: %s", (r) => {
    expect(NoteRecurrenceModel.parse(r)).toBe(r);
  });

  it("rejects invalid recurrence", () => {
    expect(() => NoteRecurrenceModel.parse("YEARLY")).toThrow();
  });
});
