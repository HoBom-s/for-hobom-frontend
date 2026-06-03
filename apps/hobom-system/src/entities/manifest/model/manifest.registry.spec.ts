import { describe, expect, it } from "vitest";
import { getManifest, listManifests, MANIFEST_REGISTRY } from "./manifest.registry";

describe("manifest.registry", () => {
  it("등록된 키로 매니페스트를 조회한다", () => {
    expect(getManifest("Hb.Button")?.name).toBe("Hb.Button");
  });

  it("미등록 키는 undefined를 반환한다", () => {
    expect(getManifest("Hb.Unknown")).toBeUndefined();
  });

  it("listManifests는 레지스트리의 모든 매니페스트를 반환한다", () => {
    expect(listManifests()).toEqual(Object.values(MANIFEST_REGISTRY));
  });

  it("레지스트리 키는 매니페스트의 name과 일치한다", () => {
    for (const [key, manifest] of Object.entries(MANIFEST_REGISTRY)) {
      expect(key).toBe(manifest.name);
    }
  });
});
