import type { ComponentDoc } from "../../foundations/docs";

export const docs: ComponentDoc = {
  name: "Tabs",
  description:
    "A controlled tab bar (Root + Item) with an optional matching Panel. Root holds the selected value; Items render the underlined triggers; Panels reveal content for the active value.",
  features: [
    "Controlled: you own `value` and `onChange` (on Root standalone, or on Tabs.Provider)",
    "Index-based fallback — Items without an explicit `value` use their position",
    "`Tabs.Provider` scopes Root + sibling `Tabs.Panel`s so they share the value",
    "`Tabs.Panel value` shows its children only when active; `keepMounted` keeps it in the DOM (hidden)",
    "Wired for a11y: role=tablist/tab/tabpanel with aria-selected/hidden",
  ],
  props: [
    {
      name: "Root.value",
      type: "string | number",
      description: "The selected tab value.",
      required: true,
    },
    {
      name: "Root.onChange",
      type: "(event, value) => void",
      description: "Fires with the clicked tab's value.",
      required: true,
    },
    { name: "Item.value", type: "string | number", description: "Falls back to positional index." },
    { name: "Item.label", type: "ReactNode", description: "Tab text." },
    { name: "Item.icon", type: "ReactNode", description: "Optional leading/trailing icon." },
    { name: "Item.disabled", type: "boolean", description: "Disable the tab.", default: "false" },
    {
      name: "Panel.value",
      type: "string | number",
      description: "Shown when it equals Root's value.",
      required: true,
    },
    {
      name: "Panel.keepMounted",
      type: "boolean",
      description: "Keep mounted (hidden) when inactive.",
      default: "false",
    },
  ],
  examples: [
    {
      label: "Standalone tab bar (no panels)",
      code: `const [tab, setTab] = useState("board");
<Hb.Tabs.Root value={tab} onChange={(_, v) => setTab(v)}>
  <Hb.Tabs.Item value="board" label="보드" />
  <Hb.Tabs.Item value="backlog" label="백로그" />
</Hb.Tabs.Root>`,
    },
    {
      label: "Tabs with panels — wrap Root + Panels in a Provider",
      code: `const [tab, setTab] = useState("about");
<Hb.Tabs.Provider value={tab} onChange={(_, v) => setTab(v)}>
  <Hb.Tabs.Root>
    <Hb.Tabs.Item value="about" label="소개" />
    <Hb.Tabs.Item value="animals" label="동물" />
  </Hb.Tabs.Root>
  <Hb.Tabs.Panel value="about"><AboutTab /></Hb.Tabs.Panel>
  <Hb.Tabs.Panel value="animals"><AnimalsTab /></Hb.Tabs.Panel>
</Hb.Tabs.Provider>`,
    },
  ],
  accessibility: [
    "Root is role=tablist, Items are role=tab (aria-selected), Panels are role=tabpanel (hidden when inactive).",
    "Keep each Panel's value in sync with its Item's value.",
  ],
  keyboard: "Items are buttons — Tab moves focus, Enter/Space activates. (No arrow-key roving yet.)",
  notes: [
    "Panels must sit inside a Tabs.Provider (they read the value via context); a standalone Root only renders the bar.",
    "In Provider mode, drop `value`/`onChange` from Root — it inherits them from the Provider.",
    "Controlled only; persist the value in URL state (e.g. useSearchParamsState) for deep-linkable tabs.",
  ],
};
