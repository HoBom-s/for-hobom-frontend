import { describe, expect, it } from "vitest";
import {
  addDesign,
  addFavorite,
  addFolder,
  itemsInFolder,
  removeDesign,
  removeFavorite,
  removeFolder,
  renameFavorite,
  renameFolder,
  renameItem,
  setItemDocument,
} from "./workspace-ops.lib";
import type { WorkspaceState } from "./workspace-ops.lib";

const doc = (): WorkspaceState => ({
  folders: [{ id: "f1", name: "내 작업" }],
  items: [{ id: "i1", name: "샘플", folderId: "f1" }],
  documents: { i1: { children: [] } },
  favorites: [],
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
    expect(renameFolder(doc(), "f1", "기획").folders[0]?.name).toBe("기획");
  });

  it("renameItem은 아이템 이름을 바꾼다", () => {
    expect(renameItem(doc(), "i1", "메인 폼").items[0]?.name).toBe("메인 폼");
  });

  it("removeDesign은 아이템과 문서를 제거한다", () => {
    const next = removeDesign(doc(), "i1");

    expect(next.items).toHaveLength(0);
    expect(next.documents.i1).toBeUndefined();
  });

  it("removeFolder는 폴더와 그 안의 아이템·문서를 cascade 제거한다", () => {
    const next = removeFolder(doc(), "f1");

    expect(next.folders).toHaveLength(0);
    expect(next.items).toHaveLength(0);
    expect(next.documents.i1).toBeUndefined();
  });

  it("addFavorite은 즐겨찾기를 추가하고 같은 디자인 중복은 막는다", () => {
    const once = addFavorite(doc(), { id: "fav1", designId: "i1", label: "샘플" });
    const twice = addFavorite(once, { id: "fav2", designId: "i1", label: "또" });

    expect(twice.favorites).toHaveLength(1);
  });

  it("renameFavorite은 라벨을 바꾼다", () => {
    const withFav = addFavorite(doc(), { id: "fav1", designId: "i1", label: "샘플" });

    expect(renameFavorite(withFav, "fav1", "즐겨").favorites[0]?.label).toBe("즐겨");
  });

  it("디자인 삭제 시 그 즐겨찾기도 제거된다", () => {
    const withFav = addFavorite(doc(), { id: "fav1", designId: "i1", label: "샘플" });

    expect(removeDesign(withFav, "i1").favorites).toHaveLength(0);
  });

  it("removeFavorite은 즐겨찾기를 제거한다", () => {
    const withFav = addFavorite(doc(), { id: "fav1", designId: "i1", label: "샘플" });

    expect(removeFavorite(withFav, "fav1").favorites).toHaveLength(0);
  });
});
