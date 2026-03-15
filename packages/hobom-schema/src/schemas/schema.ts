import { isFail, SchemaError } from "./types";
import type { Fail, SafeParseResult } from "./types";

export abstract class Schema<T> {
  declare readonly _output: T;

  /** @internal */
  abstract _parse(input: unknown): T | Fail;

  safeParse(input: unknown): SafeParseResult<T> {
    const result = this._parse(input);

    if (isFail(result)) {
      return { success: false, error: { issues: result.issues } };
    }

    return { success: true, data: result };
  }

  parse(input: unknown): T {
    const result = this._parse(input);

    if (isFail(result)) {
      throw new SchemaError(result.issues);
    }

    return result;
  }

  optional(): OptionalSchema<this> {
    return new OptionalSchema(this);
  }

  nullable(): NullableSchema<this> {
    return new NullableSchema(this);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class OptionalSchema<T extends Schema<any>> extends Schema<T["_output"] | undefined> {
  readonly #inner: T;

  constructor(inner: T) {
    super();
    this.#inner = inner;
  }

  _parse(input: unknown): T["_output"] | undefined | Fail {
    if (input === undefined) return undefined;

    return this.#inner._parse(input);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class NullableSchema<T extends Schema<any>> extends Schema<T["_output"] | null> {
  readonly #inner: T;

  constructor(inner: T) {
    super();
    this.#inner = inner;
  }

  _parse(input: unknown): T["_output"] | null | Fail {
    if (input === null) return null;

    return this.#inner._parse(input);
  }
}
