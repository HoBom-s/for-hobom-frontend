import type { NodeId } from "../model/document.model";

/** 새 노드용 고유 id를 생성한다. */
export const createNodeId = (): NodeId => `n_${crypto.randomUUID()}`;
