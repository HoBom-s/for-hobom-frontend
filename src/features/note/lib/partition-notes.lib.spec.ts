import { describe, it, expect } from "vitest";
import { partitionNotesLib } from "./partition-notes.lib";
import { NoteItemType } from "../../../entities/note";

const makeNote = (
  overrides: Partial<NoteItemType> & { id: string },
): NoteItemType => ({
  owner: "owner-1",
  title: "",
  content: "",
  type: "TEXT",
  checklistItems: [],
  color: "",
  labels: [],
  members: [],
  reminder: null,
  isPinned: false,
  status: "ACTIVE",
  trashedAt: null,
  order: 0,
  ...overrides,
});

describe("partitionNotes", () => {
  it("빈 배열이면 빈 결과를 반환한다", () => {
    const { pinnedNotes, otherNotes } = partitionNotesLib([]);

    expect(pinnedNotes).toEqual([]);
    expect(otherNotes).toEqual([]);
  });

  it("isPinned=true인 노트를 pinnedNotes로 분리한다", () => {
    const notes = [
      makeNote({ id: "1", isPinned: true, order: 0 }),
      makeNote({ id: "2", isPinned: false, order: 1 }),
      makeNote({ id: "3", isPinned: true, order: 2 }),
    ];

    const { pinnedNotes, otherNotes } = partitionNotesLib(notes);

    expect(pinnedNotes).toHaveLength(2);
    expect(otherNotes).toHaveLength(1);
    expect(pinnedNotes.map((n) => n.id)).toEqual(["1", "3"]);
    expect(otherNotes.map((n) => n.id)).toEqual(["2"]);
  });

  it("각 그룹 내에서 order 오름차순으로 정렬한다", () => {
    const notes = [
      makeNote({ id: "a", isPinned: false, order: 3 }),
      makeNote({ id: "b", isPinned: false, order: 1 }),
      makeNote({ id: "c", isPinned: false, order: 2 }),
    ];

    const { otherNotes } = partitionNotesLib(notes);

    expect(otherNotes.map((n) => n.id)).toEqual(["b", "c", "a"]);
  });

  it("pinnedNotes도 order 오름차순으로 정렬한다", () => {
    const notes = [
      makeNote({ id: "p2", isPinned: true, order: 5 }),
      makeNote({ id: "p1", isPinned: true, order: 2 }),
      makeNote({ id: "p3", isPinned: true, order: 8 }),
    ];

    const { pinnedNotes } = partitionNotesLib(notes);

    expect(pinnedNotes.map((n) => n.id)).toEqual(["p1", "p2", "p3"]);
  });

  it("동일 order인 경우 원본 순서를 유지한다 (stable sort)", () => {
    const notes = [
      makeNote({ id: "x", isPinned: false, order: 0 }),
      makeNote({ id: "y", isPinned: false, order: 0 }),
    ];

    const { otherNotes } = partitionNotesLib(notes);

    expect(otherNotes.map((n) => n.id)).toEqual(["x", "y"]);
  });

  it("원본 배열을 mutate하지 않는다", () => {
    const notes = [
      makeNote({ id: "1", isPinned: true, order: 2 }),
      makeNote({ id: "2", isPinned: true, order: 1 }),
    ];
    const original = [...notes];

    partitionNotesLib(notes);

    expect(notes[0]!.id).toBe(original[0]!.id);
    expect(notes[1]!.id).toBe(original[1]!.id);
  });
});
