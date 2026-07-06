/**
 * Codemod: convert MUI `sx` on a target component to plain `style`.
 *
 * Handles the common cases:
 *   - spacing shorthands (m/p family, gap) → expanded at MUI's 8px unit
 *   - borderRadius → ×8 (MUI shape multiplier)
 *   - `border: N` → borderWidth/borderStyle; `border: "1px solid"` → passthrough
 *   - theme color refs on color keys → var(--hb-color-*) (keeps dark adaptivity)
 *   - other keys → value copied as-is (static OR dynamic expressions)
 *
 * A tag is left UNTOUCHED (for manual handling) if its `sx` has a spread, a
 * selector/pseudo key ("&:hover"), a nested style object, an unknown static
 * theme color, a numeric boxShadow, a fractional sizing value, or an existing
 * `style` prop.
 *
 *   CODEMOD_TARGET=Chip pnpm dlx jscodeshift -t scripts/codemods/sx-to-style.cjs \
 *     --parser tsx --extensions tsx apps/hobom-system/src
 */
const COMPONENT = { object: "Hb", property: process.env.CODEMOD_TARGET || "Paper" };
const UNIT = 8;
const SIZING = new Set(["width", "height", "minWidth", "maxWidth", "minHeight", "maxHeight"]);
const SPACING = {
  m: ["margin"], mt: ["marginTop"], mb: ["marginBottom"], ml: ["marginLeft"], mr: ["marginRight"],
  mx: ["marginLeft", "marginRight"], my: ["marginTop", "marginBottom"],
  p: ["padding"], pt: ["paddingTop"], pb: ["paddingBottom"], pl: ["paddingLeft"], pr: ["paddingRight"],
  px: ["paddingLeft", "paddingRight"], py: ["paddingTop", "paddingBottom"],
  gap: ["gap"], rowGap: ["rowGap"], columnGap: ["columnGap"],
};
const COLOR_KEYS = new Set(["color", "bgcolor", "backgroundColor", "borderColor", "background"]);
const KEY_RENAME = { bgcolor: "backgroundColor" };
const THEME_COLOR = {
  divider: "var(--hb-color-border)",
  "action.selected": "var(--hb-color-border)",
  "action.hover": "var(--hb-color-border)",
  "background.paper": "var(--hb-color-surface)",
  "background.default": "var(--hb-color-canvas)",
  "text.primary": "var(--hb-color-text-primary)",
  "text.secondary": "var(--hb-color-text-secondary)",
  "text.disabled": "var(--hb-color-text-disabled)",
  "primary.main": "var(--hb-color-accent)",
  "error.main": "var(--hb-color-danger)",
  "error.light": "var(--hb-color-danger)",
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
  const staticValue = (node) => {
    if (node.type === "NumericLiteral") return { num: node.value };
    if (node.type === "StringLiteral") return { str: node.value };
    if (node.type === "UnaryExpression" && node.operator === "-" && node.argument.type === "NumericLiteral")
      return { num: -node.argument.value };
    return null;
  };

  // returns an array of ObjectProperty, or null to bail the whole tag
  const convert = (key, valueNode) => {
    // Selector/pseudo keys and nested style objects can't be inline style.
    if (/[^a-zA-Z0-9]/.test(String(key))) return null;
    if (valueNode.type === "ObjectExpression") return null;

    const sv = staticValue(valueNode);

    if (SPACING[key]) {
      if (!sv || sv.num == null) return null;
      return SPACING[key].map((t) => prop(t, numNode(sv.num * UNIT)));
    }
    if (key === "borderRadius") {
      if (!sv || sv.num == null) return null;
      return [prop(key, numNode(sv.num * UNIT))];
    }
    if (key === "border") {
      if (sv && sv.num != null) return [prop("borderWidth", numNode(sv.num)), prop("borderStyle", j.stringLiteral("solid"))];
      if (sv && sv.str != null) return [prop("border", j.stringLiteral(sv.str))];
      return null;
    }
    if (COLOR_KEYS.has(key)) {
      const outKey = KEY_RENAME[key] || key;
      if (sv && sv.str != null) {
        let v = sv.str;
        if (THEME_COLOR[v]) v = THEME_COLOR[v];
        else if (!/^(#|rgb|hsl|[a-z]+$)/.test(v)) return null;
        return [prop(outKey, j.stringLiteral(v))];
      }
      return [j.objectProperty(j.identifier(outKey), valueNode)];
    }
    if (key === "boxShadow") {
      if (sv && sv.str != null) return [prop(key, j.stringLiteral(sv.str))];
      return null;
    }
    // MUI treats a static sizing value <= 1 as a fraction (%) → bail.
    if (SIZING.has(key) && sv && sv.num != null && sv.num > 0 && sv.num <= 1) return null;
    return [j.objectProperty(j.identifier(key), valueNode)];
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
      if (attrs.some((a) => a.type === "JSXAttribute" && a.name.name === "style")) return;
      const sxAttr = attrs.find((a) => a.type === "JSXAttribute" && a.name.name === "sx");
      if (!sxAttr || !sxAttr.value || sxAttr.value.type !== "JSXExpressionContainer") return;
      const obj = sxAttr.value.expression;
      if (obj.type !== "ObjectExpression") return;

      const out = [];
      for (const property of obj.properties) {
        if (property.type !== "ObjectProperty" && property.type !== "Property") return; // spread → bail
        const key = property.key.name != null ? property.key.name : property.key.value;
        const converted = convert(key, property.value);
        if (!converted) return; // bail whole tag
        out.push(...converted);
      }
      if (out.length === 0) return;

      const styleAttr = j.jsxAttribute(
        j.jsxIdentifier("style"),
        j.jsxExpressionContainer(j.objectExpression(out)),
      );
      attrs.splice(attrs.indexOf(sxAttr), 1, styleAttr);
      changed = true;
    });

  return changed ? root.toSource({ quote: "double" }) : null;
};
