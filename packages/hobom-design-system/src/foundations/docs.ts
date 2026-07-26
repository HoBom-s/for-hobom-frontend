/**
 * Agent-facing component documentation.
 *
 * Each component ships a co-located `<Component>.doc.ts` exporting a `docs`
 * object typed by {@link ComponentDoc}. It is the single, structured source of
 * truth an agent (or a docs CLI) can read *instead of the source* to learn a
 * component's props, composition recipes, and accessibility contract.
 *
 * Keep it English-first and example-driven: props/types/defaults live here once,
 * and the `hobom-ds` skill's component index links back to these files.
 */

export interface ComponentDocProp {
  name: string;
  /** TypeScript type as written, e.g. `"outlined" | "plain"`. */
  type: string;
  description: string;
  /** Omit or `false` when the prop is optional. */
  required?: boolean;
  /** Default value as source, e.g. `"outlined"` or `false`. */
  default?: string;
}

export interface ComponentDocExample {
  label: string;
  /** A self-contained JSX snippet showing the component in a realistic use. */
  code: string;
}

export interface ComponentDoc {
  /** The `Hb.*` access path, e.g. `"SectionCard"` or `"Breadcrumb.Item"`. */
  name: string;
  description: string;
  /** One line each — what the component gives you for free. */
  features: string[];
  props: ComponentDocProp[];
  examples: ComponentDocExample[];
  /** ARIA/semantics guidance the consumer must not break. */
  accessibility?: string[];
  /** Keyboard interaction summary, when the component is interactive. */
  keyboard?: string;
  /** Gotchas, composition tips, related components. */
  notes?: string[];
}
