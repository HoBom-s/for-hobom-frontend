/**
 * Runs 본인확인 (CI/DI identity verification) and resolves the vendor's
 * short-lived receipt (`verificationToken`), which signup exchanges for a
 * session. Real name and contact stay with the vendor — the app never sees them.
 *
 * TODO: integrate the real vendor SDK once the provider is selected. Until then
 * this returns a stub receipt so the flow — and its mocked e2e — works end to
 * end; the backend's stub adapter rejects it (503) outside the mock environment.
 */
export const requestIdentityVerification = (): Promise<string> =>
  Promise.resolve("stub-verification-receipt");
