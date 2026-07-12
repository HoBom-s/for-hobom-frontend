# 9. CSR first load and SEO handled at the code level

- Status: Accepted
- Date: 2026-07-13
- Deciders: HoBom frontend

## Context

The app is a client-rendered Vite SPA served under a base path. CSR ships an
empty shell and renders on the client, which costs first paint (a blank screen
until the JS mounts) and hurts crawlers and link-preview bots that read a single
static `<head>`. Server-side rendering or prerendering would address both but is
a large change — a different build/runtime model and infrastructure — that we are
not ready to take on for a mostly auth-gated product.

## Decision

**Keep CSR for now, and pre-empt its first-load and SEO costs at the code
level.**

- **First paint**: an inline branded splash lives in `#root`, so the shell never
  flashes blank before the app JS mounts; React replaces it on first render. A
  preconnect to the API origin is injected at boot so the first backend request
  skips DNS/TLS setup.
- **Navigation**: route-level code splitting per page, plus an idle-time prefetch
  of the likely-next chunks so in-app navigation is instant.
- **SEO**: rich static meta and Organization JSON-LD in `index.html`, and
  **runtime per-route metadata** — a hook sets `title`/`description`/`robots`
  from a route→metadata map on each navigation, since CSR has one static head.
  Auth/transient routes go `noindex`.
- **Build**: skip the gzip-size report to cut build (and e2e-build) time.

SSR/prerendering is explicitly deferred, not rejected — it is the next lever if
the public surface grows and organic discovery matters.

## Consequences

- Perceived load and in-app navigation improve without changing the rendering
  model or adding infrastructure.
- Crawlers and share cards get per-route titles/descriptions instead of one
  generic head.
- Cost: this is mitigation, not a cure — bots that don't execute JS still see the
  shell first, and the runtime metadata can't beat a server-rendered document.
  When that ceiling is reached, prerender the public landing (a superseding ADR),
  rather than piling on more client-side workarounds.
