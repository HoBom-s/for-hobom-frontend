# Architecture Decision Records

Short documents capturing significant, hard-to-reverse technical decisions —
the context, the choice, and its consequences — so the reasoning survives past
the moment it was made.

| # | Decision | Status |
| --- | --- | --- |
| [0001](./0001-in-house-data-and-schema-libraries.md) | In-house data-fetching and schema libraries | Accepted |
| [0002](./0002-slice-public-api-and-import-boundaries.md) | Slice public API and import boundaries | Accepted |
| [0003](./0003-build-tooling-references-and-turborepo.md) | TypeScript project references without composite; no Turborepo | Accepted |
| [0004](./0004-product-apps-theme-the-design-system.md) | Product apps theme the design system rather than fork it | Accepted |
| [0005](./0005-build-to-the-backend-contract-with-anti-corruption-in-entities.md) | Build to the backend contract, with anti-corruption in entities | Accepted |
| [0006](./0006-forms-and-server-mutations.md) | Forms with react-hook-form; mutations via option factories with centralized feedback | Accepted |
| [0007](./0007-mock-the-network-with-msw-for-scenario-tests-only.md) | Mock the network with MSW for scenario tests only | Accepted |
| [0008](./0008-automated-security-scanning-in-ci.md) | Automated security scanning in CI | Accepted |
| [0009](./0009-csr-first-load-and-seo-at-the-code-level.md) | CSR first load and SEO handled at the code level | Accepted |

New ADRs are numbered sequentially and never edited once accepted — supersede
them with a new record instead.
