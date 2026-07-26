# 6. Forms with react-hook-form; mutations via option factories with centralized feedback

- Status: Accepted
- Date: 2026-07-13
- Deciders: HoBom frontend

## Context

The first forms tracked every field with `useState`, hand-rolled validation, and
inline submit-error state. Each form re-implemented the same wiring, monolithic
components mixed field markup with orchestration, and success/error handling was
copy-pasted per screen. The in-house data library already offered a
`mutationOptions`/`queryOptions` pattern that the other app used, but the new app
was calling `useMutation({ mutationFn })` inline and duplicating cache keys.

## Decision

**Forms use react-hook-form; server writes go through option factories; user
feedback (toast + redirect) is centralized in the mutation hook.**

- **Forms**: one `FormProvider` per form; each field is a small
  `useFormContext` + `Controller` component (`EmailField`, `PasswordField`, …).
  The container orchestrates (submit, step navigation); fields own their own
  rule and, where relevant, local UI state (show/hide password). Validators stay
  pure in `lib` and are unit-tested; the RHF rule references them.
- **Mutations**: each entity exposes a `mutationOptions` factory
  (`authMutations.login()`) carrying a stable `mutationKey` and `mutationFn`. A
  feature hook consumes it: `useMutation(authMutations.login())`.
- **Feedback**: success and failure live in that hook, not the form —
  `onSuccess` fires a toast and redirects; `onError` toasts the server message.
  Components call `mutate(...)` and stay declarative.

## Consequences

- Forms are consistent and decomposed; a new field is a small component, and a
  multi-step flow reuses the same field components across steps.
- Cache keys and side effects for a mutation have one definition, reused wherever
  the mutation is called.
- A screen doesn't repeat submit/success/error plumbing; the pattern is the same
  everywhere, so it's predictable.
- Cost: more small files (one per field, one per mutation factory) instead of a
  single form component. The separation is deliberate — it's what keeps forms
  testable and the feedback uniform.
