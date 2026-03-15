export interface ValidationIssue {
  readonly message: string;
}

export type SafeParseResult<T> =
  | { readonly success: true; readonly data: T }
  | {
      readonly success: false;
      readonly error: { readonly issues: readonly ValidationIssue[] };
    };

const FAIL: unique symbol = Symbol("fail");

export interface Fail {
  readonly [FAIL]: true;
  readonly issues: readonly ValidationIssue[];
}

export const fail = (issues: readonly ValidationIssue[]): Fail => ({
  [FAIL]: true,
  issues,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFail = (value: any): value is Fail =>
  value !== null && typeof value === "object" && FAIL in value;

export class SchemaError extends Error {
  readonly issues: readonly ValidationIssue[];

  constructor(issues: readonly ValidationIssue[]) {
    super(issues.map((i) => i.message).join(", "));
    this.name = "SchemaError";
    this.issues = issues;
  }
}
