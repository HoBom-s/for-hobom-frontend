import path from "path";

function getLayer(filePath) {
  const parts = filePath.split(path.sep);
  const srcIndex = parts.indexOf("src");
  if (srcIndex >= 0 && parts.length > srcIndex + 1) {
    return parts[srcIndex + 1];
  }
  return null;
}

function getSlice(filePath) {
  const parts = filePath.split(path.sep);
  const srcIndex = parts.indexOf("src");
  // layer -> slice
  if (srcIndex >= 0 && parts.length > srcIndex + 2) {
    return parts[srcIndex + 2];
  }
  return null;
}

// excepts packages/*
const ALLOWED_IMPORTS = {
  apps: ["features", "entities", "shared", "packages"],
  features: ["entities", "shared", "packages"],
  entities: ["shared", "packages"],
  shared: ["shared", "packages"],
};

export const rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce FSD import boundaries including slices",
      category: "FSD",
      recommended: false,
    },
    messages: {
      forbiddenImport:
        "'{{importLayer}}/{{importSlice}}' imports from '{{importedLayer}}/{{importedSlice}}' are not allowed.",
    },
    schema: [],
  },

  create(context) {
    const currentFile = context.getFilename();
    const currentLayer = getLayer(currentFile);
    const currentSlice = getSlice(currentFile);

    if (!currentLayer || !(currentLayer in ALLOWED_IMPORTS)) {
      return {};
    }

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        if (typeof importPath !== "string") return;

        // '@/' alias import
        if (importPath.startsWith("@/")) {
          const parts = importPath.slice(2).split("/");
          const importedLayer = parts[0];
          const importedSlice = parts[1] || null;

          if (importedLayer === currentLayer) {
            // slice check
            if (importedSlice && importedSlice !== currentSlice) {
              context.report({
                node,
                messageId: "forbiddenImport",
                data: {
                  importLayer: currentLayer,
                  importSlice: currentSlice,
                  importedLayer,
                  importedSlice,
                },
              });
            }
            return;
          }

          // check another layer ALLOWED_IMPORTS
          if (!ALLOWED_IMPORTS[currentLayer].includes(importedLayer)) {
            context.report({
              node,
              messageId: "forbiddenImport",
              data: {
                importLayer: currentLayer,
                importSlice: currentSlice,
                importedLayer,
                importedSlice,
              },
            });
          }
          return;
        }

        if (importPath.startsWith(".")) {
          const currentDir = path.dirname(currentFile);
          const resolvedPath = path.resolve(currentDir, importPath);
          const importedLayer = getLayer(resolvedPath);
          const importedSlice = getSlice(resolvedPath);

          if (importedLayer === currentLayer) {
            if (importedSlice && importedSlice !== currentSlice) {
              context.report({
                node,
                messageId: "forbiddenImport",
                data: {
                  importLayer: currentLayer,
                  importSlice: currentSlice,
                  importedLayer,
                  importedSlice,
                },
              });
            }
            return;
          }

          if (!ALLOWED_IMPORTS[currentLayer].includes(importedLayer)) {
            context.report({
              node,
              messageId: "forbiddenImport",
              data: {
                importLayer: currentLayer,
                importSlice: currentSlice,
                importedLayer,
                importedSlice,
              },
            });
          }
          return;
        }
      },
    };
  },
};
