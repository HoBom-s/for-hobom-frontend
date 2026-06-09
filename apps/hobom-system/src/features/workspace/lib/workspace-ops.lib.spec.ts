import { describe, expect, it } from "vitest";
import {
  addDesign,
  addFolder,
  itemsInFolder,
  renameFolder,
  renameItem,
  setItemDocument,
} from "./workspace-ops.lib";
import type { WorkspaceState } from "./workspace-ops.lib";

const doc = (): WorkspaceState => ({
  folders: [{ id: "f1", name: "내 작업" }],
  items: [{ id: "i1", name: "샘플", folderId: "f1" }],
  documents: { i1: { children: [] } },
});

describe("workspace-ops", () => {
  it("addFolder는 폴더를 추가한다(불변)", () => {
    const base = doc();
    const next = addFolder(base, { id: "f2", name: "새 폴더" });

    expect(next.folders.map((f) => f.id)).toEqual(["f1", "f2"]);
    expect(base.folders).toHaveLength(1);
  });

  it("addDesign은 아이템 메타와 문서를 함께 추가한다", () => {
    const next = addDesign(doc(), { id: "i2", name: "디자인", folderId: "f1" }, { children: [] });

    expect(next.items.map((i) => i.id)).toEqual(["i1", "i2"]);
    expect(next.documents.i2).toEqual({ children: [] });
  });

  it("setItemDocument는 문서를 교체한다", () => {
    const updated = { children: [{ id: "n", type: "Hb.Button", props: {}, children: [] }] };
    const next = setItemDocument(doc(), "i1", updated);

    expect(next.documents.i1).toBe(updated);
  });

  it("itemsInFolder는 해당 폴더 아이템만 반환한다", () => {
    const state = addDesign(doc(), { id: "i2", name: "x", folderId: "f2" }, { children: [] });

    expect(itemsInFolder(state, "f1").map((i) => i.id)).toEqual(["i1"]);
  });

  it("renameFolder는 폴더 이름을 바꾼다", () => {
    expect(renameFolder(doc(), "f1", "기획").folders[0].name).toBe("기획");
  });

  it("renameItem은 아이템 이름을 바꾼다", () => {
    expect(renameItem(doc(), "i1", "메인 폼").items[0].name).toBe("메인 폼");
  });
});
