const fs = require("fs");
const BASE = "node_modules/.pnpm/@mui+icons-material@7.3.11_@mui+material@7.3.11_@emotion+react@11.14.0_@types+react@19.2.17_r_rpybvityi6rii3pk3ntd42gpte/node_modules/@mui/icons-material/esm";
const names = fs.readFileSync("/tmp/icon_names.txt","utf8").trim().split("\n").filter(Boolean);

const FRAGMENT = Symbol("Fragment");
const _jsx = (type, props) => ({ type, props });
const _jsxs = (type, props) => ({ type, props });

function serialize(node) {
  if (node == null || node === false) return "";
  if (Array.isArray(node)) return node.map(serialize).join("");
  if (typeof node !== "object") return String(node);
  const { type, props } = node;
  const { children, ...attrs } = props || {};
  const attrStr = Object.entries(attrs)
    .map(([k, v]) => ` ${k}="${String(v)}"`)
    .join("");
  const inner = children != null ? serialize(children) : "";
  if (type === FRAGMENT) return inner;
  return inner ? `<${type}${attrStr}>${inner}</${type}>` : `<${type}${attrStr} />`;
}

const lines = [];
const failed = [];
for (const name of names) {
  const src = fs.readFileSync(`${BASE}/${name}.js`, "utf8");
  const start = src.indexOf("createSvgIcon(");
  let arg = src.slice(start + "createSvgIcon(".length);
  arg = arg.replace(/,\s*'[^']*'\)\s*;?\s*$/s, "");
  arg = arg.replace(/\/\*#__PURE__\*\//g, "").trim();
  try {
    const node = new Function("_jsx", "_jsxs", "_Fragment", `return (${arg});`)(_jsx, _jsxs, FRAGMENT);
    const jsx = serialize(node);
    lines.push(`export const ${name} = createIcon(<>${jsx}</>, "${name}");`);
  } catch (e) {
    failed.push(name + ": " + e.message);
  }
}
const header = `import { createIcon } from "../foundations/icon/Icon";

/**
 * Generated icon set — each icon's 24×24 SVG content extracted from its
 * \`@mui/icons-material\` source path, rendered by the in-house \`Icon\` base.
 * Regenerate with scripts/gen-icons.cjs.
 */
`;
fs.writeFileSync("packages/hobom-design-system/src/icons/generated.tsx", header + lines.join("\n") + "\n");
console.log("generated", lines.length, "icons; failed:", failed.length);
failed.forEach((f) => console.log("  FAIL", f));
