/**
 * Codemod: convert MUI spacing `sx` shorthands on <Hb.Divider> to `style`.
 *
 * Only handles margin shorthands with numeric values (m/mt/mb/ml/mr/mx/my),
 * expanded at MUI's default 8px spacing unit. A tag whose `sx` has any other
 * key (or a non-numeric value) is left untouched so it can be handled by hand.
 *
 *   pnpm dlx jscodeshift -t scripts/codemods/divider-sx-to-style.cjs \
 *     --parser tsx --extensions tsx apps/hobom-system/src
 *
 * Reusable for other components: change COMPONENT below.
 */
const SPACING = {
  m: ["margin"],
  mt: ["marginTop"],
  mb: ["marginBottom"],
  ml: ["marginLeft"],
  mr: ["marginRight"],
  mx: ["marginLeft", "marginRight"],
  my: ["marginTop", "marginBottom"],
};
const UNIT = 8;
const COMPONENT = { object: "Hb", property: "Divider" };

module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  let changed = false;

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
      const sxAttr = attrs.find((a) => a.type === "JSXAttribute" && a.name.name === "sx");
      if (!sxAttr || !sxAttr.value || sxAttr.value.type !== "JSXExpressionContainer") return;

      const obj = sxAttr.value.expression;
      if (obj.type !== "ObjectExpression") return;

      const styleProps = [];
      for (const prop of obj.properties) {
        if (prop.type !== "ObjectProperty" && prop.type !== "Property") return;
        const key = prop.key.name != null ? prop.key.name : prop.key.value;
        const targets = SPACING[key];
        if (!targets || prop.value.type !== "NumericLiteral") return;
        for (const target of targets) {
          styleProps.push(j.objectProperty(j.identifier(target), j.numericLiteral(prop.value.value * UNIT)));
        }
      }
      if (styleProps.length === 0) return;

      const styleAttr = j.jsxAttribute(
        j.jsxIdentifier("style"),
        j.jsxExpressionContainer(j.objectExpression(styleProps)),
      );
      attrs.splice(attrs.indexOf(sxAttr), 1, styleAttr);
      changed = true;
    });

  return changed ? root.toSource({ quote: "double" }) : null;
};
