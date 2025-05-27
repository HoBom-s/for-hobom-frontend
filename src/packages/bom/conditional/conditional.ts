import { curryOn } from "../../core/curryOn";
import type { InferGuardType } from "../../core/types/inferGuardType";

type W<X> = (x: X) => boolean;
type Case<In, Out, When extends W<In> = W<In>> = readonly [
  when: When,
  then: (x: InferGuardType<When, In> & In) => Out,
];

const c = Object.assign(conditional, { defaultCase });
export { c as conditional };

/**
 * Executes a transformer function based on the first matching predicate,
 *
 * @param cases - A list of (up to 10) tuples, each defining a case.
 * @returns The output of the matched transformer
 *
 * @dataFirst
 *
 * @category Function
 */
function conditional<
  T,
  Fn0 extends (x: T) => boolean,
  Fn1 extends (x: T) => boolean,
  Fn2 extends (x: T) => boolean,
  Fn3 extends (x: T) => boolean,
  Fn4 extends (x: T) => boolean,
  Fn5 extends (x: T) => boolean,
  Fn6 extends (x: T) => boolean,
  Fn7 extends (x: T) => boolean,
  Fn8 extends (x: T) => boolean,
  Fn9 extends (x: T) => boolean,
  Return0,
  Return1 = never,
  Return2 = never,
  Return3 = never,
  Return4 = never,
  Return5 = never,
  Return6 = never,
  Return7 = never,
  Return8 = never,
  Return9 = never,
>(
  case0: Case<T, Return0, Fn0>,
  case1?: Case<T, Return1, Fn1>,
  case2?: Case<T, Return2, Fn2>,
  case3?: Case<T, Return3, Fn3>,
  case4?: Case<T, Return4, Fn4>,
  case5?: Case<T, Return5, Fn5>,
  case6?: Case<T, Return6, Fn6>,
  case7?: Case<T, Return7, Fn7>,
  case8?: Case<T, Return8, Fn8>,
  case9?: Case<T, Return9, Fn9>,
): (
  data: T,
) =>
  | Return0
  | Return1
  | Return2
  | Return3
  | Return4
  | Return5
  | Return6
  | Return7
  | Return8
  | Return9;
function conditional<
  T,
  Fn0 extends (x: T) => boolean,
  Fn1 extends (x: T) => boolean,
  Fn2 extends (x: T) => boolean,
  Fn3 extends (x: T) => boolean,
  Fn4 extends (x: T) => boolean,
  Fn5 extends (x: T) => boolean,
  Fn6 extends (x: T) => boolean,
  Fn7 extends (x: T) => boolean,
  Fn8 extends (x: T) => boolean,
  Fn9 extends (x: T) => boolean,
  Return0,
  Return1 = never,
  Return2 = never,
  Return3 = never,
  Return4 = never,
  Return5 = never,
  Return6 = never,
  Return7 = never,
  Return8 = never,
  Return9 = never,
>(
  data: T,
  case0: Case<T, Return0, Fn0>,
  case1?: Case<T, Return1, Fn1>,
  case2?: Case<T, Return2, Fn2>,
  case3?: Case<T, Return3, Fn3>,
  case4?: Case<T, Return4, Fn4>,
  case5?: Case<T, Return5, Fn5>,
  case6?: Case<T, Return6, Fn6>,
  case7?: Case<T, Return7, Fn7>,
  case8?: Case<T, Return8, Fn8>,
  case9?: Case<T, Return9, Fn9>,
):
  | Return0
  | Return1
  | Return2
  | Return3
  | Return4
  | Return5
  | Return6
  | Return7
  | Return8
  | Return9;
function conditional(...args: ReadonlyArray<unknown>): unknown {
  return curryOn(isCase, conditionalImpl, ...args);
}

function conditionalImpl<In, Out>(
  data: In,
  ...cases: ReadonlyArray<Case<In, Out>>
): Out {
  for (const [when, then] of cases) {
    if (when(data)) {
      return then(data);
    }
  }

  throw new Error("conditional failed !");
}

function isCase(maybeCase: unknown): maybeCase is Case<unknown, unknown> {
  return (
    Array.isArray(maybeCase) &&
    maybeCase.length === 2 &&
    typeof maybeCase[0] === "function" &&
    typeof maybeCase[1] === "function"
  );
}

function defaultCase(): Case<unknown, undefined>;
function defaultCase<In, Then extends (param: In) => unknown>(
  then: Then,
): Case<In, ReturnType<Then>>;
function defaultCase(
  then: (data: unknown) => unknown = trivialDefaultCase,
): Case<unknown, unknown> {
  return [acceptAnything, then];
}

const acceptAnything = () => true as const;
const trivialDefaultCase = (): undefined => undefined;
