import { describe, it, expect } from "vitest";
import { partitionNotes } from "./partition-notes";
import type { NoteItemType } from "@/entities/note";

const makeNote = (
  overrides: Partial<NoteItemType> & { id: { value: string } },
): NoteItemType => ({
  owner: { value: "owner-1" },
  title: "",
  content: "",
  type: "TEXT",
  checklistItems: [],
  color: { value: "" },
  labels: [],
  reminder: null,
  isPinned: false,
  status: "ACTIVE",
  trashedAt: null,
  order: 0,
  ...overrides,
});

describe("partitionNotes", () => {
  it("빈 배열이면 빈 결과를 반환한다", () => {
    const { pinnedNotes, otherNotes } = partitionNotes([]);

    expect(pinnedNotes).toEqual([]);
    expect(otherNotes).toEqual([]);
  });

  it("isPinned=true인 노트를 pinnedNotes로 분리한다", () => {
    const notes = [
      makeNote({ id: { value: "1" }, isPinned: true, order: 0 }),
      makeNote({ id: { value: "2" }, isPinned: false, order: 1 }),
      makeNote({ id: { value: "3" }, isPinned: true, order: 2 }),
    ];

    const { pinnedNotes, otherNotes } = partitionNotes(notes);

    expect(pinnedNotes).toHaveLength(2);
    expect(otherNotes).toHaveLength(1);
    expect(pinnedNotes.map((n) => n.id.value)).toEqual(["1", "3"]);
    expect(otherNotes.map((n) => n.id.value)).toEqual(["2"]);
  });

  it("각 그룹 내에서 order 오름차순으로 정렬한다", () => {
    const notes = [
      makeNote({ id: { value: "a" }, isPinned: false, order: 3 }),
      makeNote({ id: { value: "b" }, isPinned: false, order: 1 }),
      makeNote({ id: { value: "c" }, isPinned: false, order: 2 }),
    ];

    const { otherNotes } = partitionNotes(notes);

    expect(otherNotes.map((n) => n.id.value)).toEqual(["b", "c", "a"]);
  });

  it("pinnedNotes도 order 오름차순으로 정렬한다", () => {
    const notes = [
      makeNote({ id: { value: "p2" }, isPinned: true, order: 5 }),
      makeNote({ id: { value: "p1" }, isPinned: true, order: 2 }),
      makeNote({ id: { value: "p3" }, isPinned: true, order: 8 }),
    ];

    const { pinnedNotes } = partitionNotes(notes);

    expect(pinnedNotes.map((n) => n.id.value)).toEqual(["p1", "p2", "p3"]);
  });

  it("동일 order인 경우 원본 순서를 유지한다 (stable sort)", () => {
    const notes = [
      makeNote({ id: { value: "x" }, isPinned: false, order: 0 }),
      makeNote({ id: { value: "y" }, isPinned: false, order: 0 }),
    ];

    const { otherNotes } = partitionNotes(notes);

    expect(otherNotes.map((n) => n.id.value)).toEqual(["x", "y"]);
  });

  it("원본 배열을 mutate하지 않는다", () => {
    const notes = [
      makeNote({ id: { value: "1" }, isPinned: true, order: 2 }),
      makeNote({ id: { value: "2" }, isPinned: true, order: 1 }),
    ];
    const original = [...notes];

    partitionNotes(notes);

    expect(notes[0]!.id.value).toBe(original[0]!.id.value);
    expect(notes[1]!.id.value).toBe(original[1]!.id.value);
  });
});
