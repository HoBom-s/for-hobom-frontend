import { getManifest, type PropSpec } from "@/entities/manifest";
import {
  isComponentNode,
  isTextNode,
  type DocumentNode,
  type NodeStyle,
  type PropValue,
  type StudioDocument,
} from "@/entities/document";

const INDENT = "  ";

/**
 * prop 하나를 JSX 속성 문자열로 직렬화한다.
 * 매니페스트 default와 같은 값은 생략한다(null 반환) — 깔끔한 코드를 위해.
 */
const serializeProp = (
  name: string,
  value: PropValue | undefined,
  spec: PropSpec,
): string | null => {
  if (value === undefined) {
    return null;
  }

  if (spec.kind !== "slot" && value === spec.default) {
    return null;
  }

  if (typeof value === "string") {
    return `${name}="${value}"`;
  }

  if (typeof value === "boolean") {
    return value ? name : `${name}={false}`;
  }

  return `${name}={${value}}`;
};

/** 사이징(style)을 sx 속성 문자열로 직렬화한다. 빈 값이면 null. */
const serializeSx = (style: NodeStyle | undefined): string | null => {
  if (!style) {
    return null;
  }

  const entries = Object.entries(style).filter(([, value]) => value !== undefined);

  if (entries.length === 0) {
    return null;
  }

  return `sx={{ ${entries.map(([key, value]) => `${key}: ${value}`).join(", ")} }}`;
};

/** 노드 하나를 JSX 문자열로 직렬화한다. 재귀적. */
const serializeNode = (node: DocumentNode, indent: string): string => {
  if (isTextNode(node)) {
    return indent + node.value;
  }

  const manifest = getManifest(node.type);

  if (!manifest) {
    return `${indent}{/* 미등록 컴포넌트: ${node.type} */}`;
  }

  const tag = manifest.import.access;
  const attrs = Object.entries(manifest.props)
    .filter(([, spec]) => spec.kind !== "slot")
    .map(([name, spec]) => serializeProp(name, node.props[name], spec))
    .filter((attr): attr is string => attr !== null);

  const sx = serializeSx(node.style);

  if (sx) {
    attrs.push(sx);
  }

  const attrString = attrs.length ? ` ${attrs.join(" ")}` : "";

  if (node.children.length === 0) {
    return `${indent}<${tag}${attrString} />`;
  }

  const [onlyChild] = node.children;

  if (node.children.length === 1 && onlyChild && isTextNode(onlyChild)) {
    return `${indent}<${tag}${attrString}>${onlyChild.value}</${tag}>`;
  }

  const inner = node.children.map((child) => serializeNode(child, indent + INDENT)).join("\n");

  return `${indent}<${tag}${attrString}>\n${inner}\n${indent}</${tag}>`;
};

/** 문서에서 쓰인 컴포넌트들의 import 문을 source별로 모은다. */
const collectImports = (doc: StudioDocument): string[] => {
  const bindingsBySource = new Map<string, Set<string>>();

  const visit = (node: DocumentNode): void => {
    if (!isComponentNode(node)) {
      return;
    }

    const manifest = getManifest(node.type);

    if (manifest) {
      const binding = manifest.import.access.split(".")[0] ?? manifest.import.access;
      const bindings = bindingsBySource.get(manifest.import.source) ?? new Set<string>();

      bindings.add(binding);
      bindingsBySource.set(manifest.import.source, bindings);
    }

    node.children.forEach(visit);
  };

  doc.children.forEach(visit);

  return [...bindingsBySource.entries()].map(
    ([source, bindings]) => `import { ${[...bindings].sort().join(", ")} } from "${source}";`,
  );
};

/** Document Model을 production JSX 문자열로 생성한다. */
export const generateJsx = (doc: StudioDocument): string => {
  const imports = collectImports(doc);
  const body = doc.children.map((node) => serializeNode(node, "")).join("\n");

  return imports.length ? `${imports.join("\n")}\n\n${body}` : body;
};
