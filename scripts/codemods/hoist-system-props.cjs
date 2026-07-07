/**
 * Codemod: hoist MUI system props passed directly on a target component into a
 * plain `style` object (merging into an existing `style` if present).
 *
 * The in-house layout primitives (Box, …) no longer accept MUI system props
 * (`display`, `gap`, `p`, `bgcolor`, …) — those must move to `style`. This is
 * the companion to `sx-to-style.cjs`: run that first (converts `sx`), then this
 * (converts leftover direct system props).
 *
 *   CODEMOD_TARGET=Box pnpm dlx jscodeshift -t scripts/codemods/hoist-system-props.cjs \
 *     --parser tsx --extensions tsx apps/hobom-system/src
 */
const COMPONENT = { object: "Hb", property: process.env.CODEMOD_TARGET || "Box" };
const UNIT = 8;
const SPACING = {
  m: ["margin"], mt: ["marginTop"], mb: ["marginBottom"], ml: ["marginLeft"], mr: ["marginRight"],
  mx: ["marginLeft", "marginRight"], my: ["marginTop", "marginBottom"],
  p: ["padding"], pt: ["paddingTop"], pb: ["paddingBottom"], pl: ["paddingLeft"], pr: ["paddingRight"],
  px: ["paddingLeft", "paddingRight"], py: ["paddingTop", "paddingBottom"],
  gap: ["gap"], rowGap: ["rowGap"], columnGap: ["columnGap"],
};
// Non-spacing system props copied through as-is (value unchanged).
const PASSTHROUGH = new Set([
  "display", "flex", "flexDirection", "flexWrap", "flexShrink", "flexGrow", "flexBasis",
  "alignItems", "alignSelf", "alignContent", "justifyContent", "justifySelf", "order",
  "width", "height", "minWidth", "maxWidth", "minHeight", "maxHeight",
  "position", "top", "right", "bottom", "left", "zIndex",
  "overflow", "overflowX", "overflowY", "textAlign", "whiteSpace", "wordBreak",
  "boxShadow", "opacity", "cursor",
]);
const COLOR_KEYS = { bgcolor: "backgroundColor", color: "color", borderColor: "borderColor" };
const THEME_COLOR = {
  divider: "var(--hb-color-border)",
  "background.paper": "var(--hb-color-surface)",
  "background.default": "var(--hb-color-canvas)",
  "text.primary": "var(--hb-color-text-primary)",
  "text.secondary": "var(--hb-color-text-secondary)",
  "text.disabled": "var(--hb-color-text-disabled)",
  "primary.main": "var(--hb-color-accent)",
  "error.main": "var(--hb-color-danger)",
  "success.main": "var(--hb-color-success)",
  "warning.main": "var(--hb-color-warning)",
};

module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  let changed = false;

  const numNode = (n) =>
    n < 0 ? j.unaryExpression("-", j.numericLiteral(-n), true) : j.numericLiteral(n);
  const prop = (k, v) => j.objectProperty(j.identifier(k), v);

  // Unwrap a JSX attribute value into an expression node (or null to skip).
  const valueOf = (attrValue) => {
    if (!attrValue) return null; // bare boolean attr — not a style prop
    if (attrValue.type === "StringLiteral") return attrValue;
    if (attrValue.type === "JSXExpressionContainer") {
      const e = attrValue.expression;
      return e.type === "JSXEmptyExpression" ? null : e;
    }
    return null;
  };

  const staticValue = (node) => {
    if (node.type === "NumericLiteral") return { num: node.value };
    if (node.type === "StringLiteral") return { str: node.value };
    if (node.type === "UnaryExpression" && node.operator === "-" && node.argument.type === "NumericLiteral")
      return { num: -node.argument.value };
    return null;
  };

  // Convert one (key, valueNode) → array of ObjectProperty, or null to skip the prop.
  const convert = (key, valueNode) => {
    const sv = staticValue(valueNode);
    if (SPACING[key]) {
      if (!sv || sv.num == null) return null; // dynamic spacing — leave the prop in place
      return SPACING[key].map((t) => prop(t, numNode(sv.num * UNIT)));
    }
    if (COLOR_KEYS[key]) {
      const outKey = COLOR_KEYS[key];
      if (sv && sv.str != null) {
        let v = sv.str;
        if (THEME_COLOR[v]) v = THEME_COLOR[v];
        else if (!/^(#|rgb|hsl|[a-z]+$)/.test(v)) return null;
        return [prop(outKey, j.stringLiteral(v))];
      }
      return [j.objectProperty(j.identifier(outKey), valueNode)];
    }
    if (PASSTHROUGH.has(key)) return [j.objectProperty(j.identifier(key), valueNode)];
    return null; // not a system prop — leave untouched
  };

  root
    .find(j.JSXOpeningElement)
    .filter((p) => {
      const n = p.node.name;
      return (
        n.type === "JSXMemberExpression" &&
        n.object.type === "JSXIdentifier" &&
        n.object.name === COMPONENT.object &&
        n.property.name === COMPONENT.property
      );
    })
    .forEach((p) => {
      const attrs = p.node.attributes || [];
      const hoisted = [];
      const remaining = [];

      for (const a of attrs) {
        if (a.type !== "JSXAttribute" || !a.name || typeof a.name.name !== "string") {
          remaining.push(a);
          continue;
        }
        const key = a.name.name;
        if (!SPACING[key] && !PASSTHROUGH.has(key) && !COLOR_KEYS[key]) {
          remaining.push(a);
          continue;
        }
        const valueNode = valueOf(a.value);
        if (!valueNode) {
          remaining.push(a);
          continue;
        }
        const converted = convert(key, valueNode);
        if (!converted) {
          remaining.push(a); // dynamic/unknown — keep as prop (will surface in tsc)
          continue;
        }
        hoisted.push(...converted);
      }

      if (hoisted.length === 0) return;

      // Merge into an existing object `style`, or create one.
      const styleAttr = remaining.find(
        (a) => a.type === "JSXAttribute" && a.name.name === "style",
      );
      if (styleAttr) {
        const expr = styleAttr.value && styleAttr.value.type === "JSXExpressionContainer"
          ? styleAttr.value.expression
          : null;
        if (!expr || expr.type !== "ObjectExpression") return; // non-object style — bail this tag
        expr.properties.push(...hoisted);
        p.node.attributes = remaining;
      } else {
        remaining.push(
          j.jsxAttribute(
            j.jsxIdentifier("style"),
            j.jsxExpressionContainer(j.objectExpression(hoisted)),
          ),
        );
        p.node.attributes = remaining;
      }
      changed = true;
    });

  return changed ? root.toSource({ quote: "double" }) : null;
};
