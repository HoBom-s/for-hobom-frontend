import { createElement, type AllHTMLAttributes, type ElementType, type Ref } from "react";

// `AllHTMLAttributes` (not `HTMLAttributes`) so a polymorphic Box can carry
// element-specific attributes for whatever `component` renders — e.g. `noValidate`
// on a `form`, `href` on an `a`.
interface BoxProps extends AllHTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to `"div"`. */
  component?: ElementType;
  /** Forwarded to the rendered element (React 19 ref-as-prop). */
  ref?: Ref<HTMLElement>;
}

/**
 * Unstyled layout primitive: a polymorphic element (a `div` by default) that
 * passes `style`, `className`, `children`, and every DOM prop straight through.
 * All styling comes from the consumer's `style` — the legacy `sx` prop was
 * codemodded to `style` at the call sites.
 */
export const Box = ({ component = "div", ...rest }: BoxProps) => createElement(component, rest);
