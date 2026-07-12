# 8. Automated security scanning in CI

- Status: Accepted
- Date: 2026-07-13
- Deciders: HoBom frontend

## Context

CI checked build, types, lint, and tests, but nothing looked at security:
dependency CVEs, accidentally committed secrets, or vulnerable code patterns.
These are cheap to catch on every pull request and expensive to find later.
GitHub's first-party options have licensing friction — the Gitleaks *action*
requires a paid license for organizations, and some scanners drift across action
versions.

## Decision

**A dedicated `Security` workflow runs three scanners on every pull request and
on pushes to `main`/`develop`, each as an independent job with least-privilege
permissions.**

- **Trivy** (filesystem scan) fails the build on **fixable** HIGH/CRITICAL
  dependency CVEs (`--ignore-unfixed`).
- **Gitleaks** scans the tree for committed secrets. (`.env` is gitignored, so
  local keys are out of scope.)
- **CodeQL** runs `security-extended` static analysis for JS/TS; results surface
  in the Security tab.
- Trivy and Gitleaks run from their **official CLI images** rather than
  Marketplace actions, to avoid version drift and the action's org licensing.
  CodeQL is free on this public repository.

## Consequences

- Every PR is gated on dependency, secret, and SAST checks; regressions surface
  at review time, not in production.
- A red Trivy run is a real signal to bump a dependency, not something to
  silence.
- Using CLI images keeps the workflow portable and licensing-clean, at the cost
  of a little more YAML than a one-line action.
- CodeQL's SAST depth depends on the repository staying public or on GitHub
  Advanced Security; if that changes, the CodeQL job is the part to revisit.
