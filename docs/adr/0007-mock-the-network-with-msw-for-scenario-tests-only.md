# 7. Mock the network with MSW for scenario tests only

- Status: Accepted
- Date: 2026-07-13
- Deciders: HoBom frontend

## Context

We wanted end-to-end coverage of the auth flows without hitting a live backend
(the identity-verification vendor was stubbed, and e2e must be deterministic and
offline). MSW was the obvious tool, but it can be applied at every level, and
applied indiscriminately it slows unit tests and couples pure logic to a fake
network it never touches.

## Decision

**MSW mocks the network only at the scenario level — end-to-end and integration
tests. Unit tests stay pure.**

- **Unit**: pure functions and logic only (validators, converters). No network,
  no MSW.
- **Integration**: a hook or feature slice exercised against a mocked HTTP
  boundary via `msw/node` `setupServer` + `renderHook` — for convert logic, error
  mapping, and success paths where the request/response round-trip is the point.
- **E2E**: the real browser flow against an MSW **browser worker**, started only
  when `VITE_ENABLE_MSW=true`. Playwright's web server sets that flag; nothing
  sets it in normal `dev` or in production.
- The worker lives under a top-level `src/mocks` (test/dev infrastructure), not in
  a `shared` segment. Handlers are split per domain so the mock surface scales.
- Because the flag is a build-time constant, the mock code is **tree-shaken out
  of the production bundle** entirely.

## Consequences

- MSW's value — network-boundary fidelity — is spent where a boundary actually
  exists; unit tests stay fast and decoupled.
- E2E can assert the real request path and body (via `waitForRequest`) while
  never leaving the machine.
- Production never ships mock code, and normal `dev` talks to the real backend
  unless a developer opts in.
- Cost: three testing tiers to keep straight. The rule ("no MSW in unit tests")
  is the guardrail that keeps them from blurring.
