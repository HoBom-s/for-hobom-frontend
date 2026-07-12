# 5. Build to the backend contract, with anti-corruption in entities

- Status: Accepted
- Date: 2026-07-13
- Deciders: HoBom frontend

## Context

Screens were first built against a static design mock. When the real backend
arrived it disagreed with the mock in ways that mattered: the signup/login flow
was designed as email + verification code + password, but the backend
authenticated by identity verification (a `verificationToken`), then later
switched again to email + password with a different field set. Wiring UI
straight to whichever shape was in front of us produced dead inputs (fields with
no endpoint) and churn every time either side moved.

We also kept reaching for raw response shapes directly in components, so a rename
in a DTO rippled into JSX.

## Decision

**The backend contract is the source of truth for behavior, and `entities` is
the anti-corruption layer between the wire and the UI.**

- When the design mock and the live API disagree, the API wins. UI that has no
  endpoint behind it is not built; the screen is reshaped to what the backend
  actually supports (this is why the signup funnel was rebuilt twice).
- An entity's `api` segment owns the network call and immediately **converts the
  raw response into a UI model** (a pure, tested `to*` function in the entity's
  `lib`). Components and features consume the UI model, never the raw DTO.
- Client-side validation **mirrors** the server's rules (e.g. the nickname value
  object's charset, the phone format) as an instant UX guard, with the server as
  the real authority.
- Environment-invariant contract details live in code, not per-env config — e.g.
  the fixed backend path prefix that sits behind the gateway is a constant in the
  API base, not part of the gateway env var.

## Consequences

- A DTO change is absorbed in one converter, not across the UI.
- Screens can't drift into rendering inputs the backend will reject.
- Cost: an explicit model + converter per entity, even when it currently looks
  like a pass-through. That seam is what makes the raw shape safe to change.
- Reconciling against a moving backend is expected; the cost of a reshape is
  contained to one feature because the contract lives in one place.
