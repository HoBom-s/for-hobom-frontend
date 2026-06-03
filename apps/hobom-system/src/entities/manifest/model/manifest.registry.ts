import { buttonManifest } from "./button.manifest";
import type { ComponentKey, ComponentManifest } from "./manifest.model";

/** 컴포넌트 키 → 매니페스트. 새 컴포넌트는 여기 등록한다. */
export const MANIFEST_REGISTRY: Readonly<Record<ComponentKey, ComponentManifest>> = {
  [buttonManifest.name]: buttonManifest,
};

/** 등록된 매니페스트를 조회한다. 미등록 키는 `undefined`. */
export const getManifest = (name: ComponentKey): ComponentManifest | undefined =>
  MANIFEST_REGISTRY[name];

/** 팔레트 노출용 — 등록된 모든 매니페스트. */
export const listManifests = (): ComponentManifest[] => Object.values(MANIFEST_REGISTRY);
