# 4. Product apps theme the design system rather than fork it

- Status: Accepted
- Date: 2026-07-13
- Deciders: HoBom frontend

## Context

A second product (HoBom Angel) joined the monorepo with its own brand — a green
accent, rounder controls, its own typeface. The first instinct was to build
product-specific components (an `AngelButton`, an Angel card) that looked right.
That quickly produced parallel component trees: the design system had a `Button`
and Angel had its own, drifting in props, a11y, and behavior. It also put a
product name inside the shared design system, which is supposed to be
brand-agnostic.

## Decision

**The design system holds only brand-neutral, tokenized primitives. A product
brands the app by overriding design tokens and composing the same `Hb.*`
primitives — never by forking them.**

- Primitives read their visual values from CSS custom properties
  (`--hb-color-accent`, `--hb-radius-control`, …). They ship a neutral default.
- A product provides a thin theme layer (e.g. Angel's `AngelThemeVars`) that
  overrides those tokens at the root, plus product-specific composition and copy.
- No product name appears in the design system. Anything genuinely reusable is
  harvested back into the system on the rule of three, as a neutral primitive.
- Product-specific, non-primitive UI (e.g. an animal card) lives in that
  product's `entities`/`features`, not in the design system.

## Consequences

- One implementation of each primitive — a11y, keyboard behavior, and API stay
  consistent across products; a fix lands everywhere at once.
- Re-theming is a token change, not a component rewrite; a third product is a new
  token set, not a new component library.
- Cost: a primitive must be parameterized through tokens/props up front, which is
  slightly more work than hardcoding one brand's look. That discipline is the
  point — it keeps the shared layer shared.
- A primitive that can't be expressed through tokens is a signal the token set is
  missing a variable, not that the product should fork the component.
