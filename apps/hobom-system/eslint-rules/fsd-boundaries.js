import path from "path";

const LAYERS = ["apps", "pages", "widgets", "features", "entities", "shared"];

const ALLOWED_IMPORTS = {
  apps: ["pages", "widgets", "features", "entities", "shared"],
  pages: ["widgets", "features", "entities", "shared"],
  widgets: ["features", "entities", "shared"],
  features: ["entities", "shared"],
  entities: ["shared"],
  shared: ["shared"],
};

// shared, apps는 slice 개념이 없으므로 cross-segment import 허용
const SLICELESS_LAYERS = new Set(["shared", "apps"]);

function parseLocation(filePath) {
  const parts = filePath.split(path.sep);
  const srcIndex = parts.indexOf("src");
  if (srcIndex < 0) return null;

  const layer = parts[srcIndex + 1];
  if (!layer || !(layer in ALLOWED_IMPORTS)) return null;

  const slice = parts[srcIndex + 2] ?? null;

  return { layer, slice };
}

function checkImport(context, node, importedLayer, importedSlice, current) {
  // 같은 레이어 내 cross-slice 검사
  if (importedLayer === current.layer) {
    if (!SLICELESS_LAYERS.has(current.layer) && importedSlice && importedSlice !== current.slice) {
      context.report({
        node,
        messageId: "crossSlice",
        data: {
          layer: current.layer,
          from: current.slice,
          to: importedSlice,
        },
      });
    }

    return;
  }

  // 상위 레이어 import 검사
  if (!ALLOWED_IMPORTS[current.layer].includes(importedLayer)) {
    context.report({
      node,
      messageId: "crossLayer",
      data: {
        currentLayer: current.layer,
        importedLayer,
      },
    });
  }
}

export const rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce FSD layer and slice import boundaries",
    },
    messages: {
      crossLayer: "'{{currentLayer}}' layer cannot import from '{{importedLayer}}'.",
      crossSlice: "Cross-slice import in '{{layer}}': '{{from}}' cannot import from '{{to}}'.",
    },
    schema: [],
  },

  create(context) {
    const current = parseLocation(context.filename);
    if (!current) return {};

    const checkSource = (node, importPath) => {
      if (typeof importPath !== "string") return;

      if (importPath.startsWith("@/")) {
        const [importedLayer, importedSlice] = importPath.slice(2).split("/");
        checkImport(context, node, importedLayer, importedSlice ?? null, current);

        return;
      }

      if (importPath.startsWith(".")) {
        const resolved = path.resolve(path.dirname(context.filename), importPath);
        const imported = parseLocation(resolved);
        if (!imported) return;
        checkImport(context, node, imported.layer, imported.slice, current);
      }
    };

    // `node.source` carries the `from "..."` specifier. It is present on static
    // imports and on re-exports (`export … from`), and absent on a bare
    // `export { x }`, so the guard skips those.
    const checkStatement = (node) => {
      if (node.source) checkSource(node, node.source.value);
    };

    return {
      ImportDeclaration: checkStatement,
      // Re-exports bypass ImportDeclaration but cross boundaries all the same.
      ExportNamedDeclaration: checkStatement,
      ExportAllDeclaration: checkStatement,
      // Dynamic `import("…")` (e.g. lazy-loaded pages) — only literal targets.
      ImportExpression(node) {
        if (node.source.type === "Literal") {
          checkSource(node, node.source.value);
        }
      },
    };
  },
};
