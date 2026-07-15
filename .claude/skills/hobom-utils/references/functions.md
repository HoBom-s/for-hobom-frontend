# hobom-utils — function catalog

All 52 exported functions, grouped by category. Each entry lists its signatures
(data-first and, where supported, data-last) and one terse example. Signatures
are simplified for readability — the source carries the full generic overloads.

**Convention key**

- **Dual** — accepts data-first `fn(data, …)` or data-last `fn(…) → (data) => …`.
  The data-last form is what you pass to `pipe`.
- **Unary / factory** — takes its argument directly; no separate data-last form.
- **Lazy** — fuses into a single pass when used inside `pipe` (`map`, `filter`,
  `forEach`, `tap`).

```ts
import { pipe, filter, map /* … */ } from "hobom-utils";
// or: import { Bom } from "hobom-utils"; Bom.filter(...)
```

---

## Collections (arrays / iterables)

### `map` — dual, lazy
Transform each element. Equivalent to `Array.prototype.map`.
```ts
map<T, U>(data: T[], cb: (item: T, i: number, arr: T[]) => U): U[];
map<T, U>(cb: (item: T, i: number, arr: T[]) => U): (data: T[]) => U[];
```
```ts
map([1, 2, 3], (n) => n * 2); // [2, 4, 6]
```

### `filter` — dual, lazy
Keep matching elements; narrows when given a type predicate.
```ts
filter<T>(data: T[], pred: (v: T, i: number, arr: T[]) => boolean): T[];
filter<T, S extends T>(pred: (v: T) => v is S): (data: T[]) => S[];
```
```ts
pipe(users, filter((u) => u.active));
values.filter(isDefined); // T[] with undefined removed
```

### `find` — dual
First element matching the predicate, else `undefined`. Narrows with a guard.
```ts
find<T>(data: T[], pred: (v: T, i: number, arr: T[]) => boolean): T | undefined;
find<T>(pred: (v: T) => boolean): (data: T[]) => T | undefined;
```
```ts
find(users, (u) => u.id === 7);
```

### `findIndex` — dual
Index of the first match, or `-1`.
```ts
findIndex<T>(data: T[], pred: (v: T, i: number, arr: T[]) => boolean): number;
findIndex<T>(pred: (v: T) => boolean): (data: T[]) => number;
```
```ts
findIndex([4, 8, 15], (n) => n > 10); // 2
```

### `reduce` — dual
Fold to a single value. Initial value is passed via the data-first `reduceImpl`
seed / the accumulator callback.
```ts
reduce<T, U>(data: T[], cb: (acc: U, cur: T, i: number, arr: T[]) => U): U;
reduce<T, U>(cb: (acc: U, cur: T, i: number, arr: T[]) => U): (data: T[]) => U;
```
```ts
reduce([1, 2, 3], (acc, n) => acc + n); // 6
```

### `forEach` — dual, lazy
Run a side effect per element; returns the (writable) data unchanged.
```ts
forEach<T>(data: T[], cb: (v: T, i: number, arr: T[]) => void): T[];
forEach<T>(cb: (v: T, i: number, arr: T[]) => void): (data: T[]) => T[];
```
```ts
pipe(rows, forEach((r) => log(r)));
```

### `every` — dual
True if all elements pass; narrows the array type with a guard.
```ts
every<T>(data: T[], pred: (v: T, i: number, arr: T[]) => boolean): boolean;
every<T, S extends T>(pred: (v: T) => v is S): (data: T[]) => data is S[];
```
```ts
every([2, 4, 6], (n) => n % 2 === 0); // true
```

### `some` — dual
True if any element passes.
```ts
some<T>(data: T[], pred: (v: T, i: number, arr: T[]) => boolean): boolean;
some<T>(pred: (v: T) => boolean): (data: T[]) => boolean;
```
```ts
some(users, (u) => u.isAdmin);
```

### `flatMap` — dual
Map then flatten one level.
```ts
flatMap<T, U>(data: T[], cb: (item: T, i: number, arr: T[]) => U[]): U[];
flatMap<T, U>(cb: (item: T, i: number, arr: T[]) => U[]): (data: T[]) => U[];
```
```ts
flatMap([1, 2], (n) => [n, n * 10]); // [1, 10, 2, 20]
```

### `partition` — dual
Split into `[pass, fail]`. Narrows the passing side with a guard.
```ts
partition<T>(data: T[], pred: (v: T, i: number, arr: T[]) => boolean): [T[], T[]];
partition<T, S extends T>(pred: (v: T) => v is S): (data: T[]) => [S[], Exclude<T, S>[]];
```
```ts
partition([1, 2, 3, 4], (n) => n % 2 === 0); // [[2, 4], [1, 3]]
```

### `countBy` — dual
Count elements by the key each returns (skips `undefined` keys).
```ts
countBy<T, K extends PropertyKey>(data: T[], fn: (v: T, i: number, arr: T[]) => K | undefined): Record<K, number>;
countBy<T, K extends PropertyKey>(fn: (v: T) => K | undefined): (data: T[]) => Record<K, number>;
```
```ts
countBy(words, (w) => w[0]); // { a: 3, b: 1, … }
```

### `groupBy` — dual
Group into `Record<string, T[]>` by the returned key.
```ts
groupBy<T>(data: T[], fn: (item: T, i: number, arr: T[]) => string): Record<string, T[]>;
groupBy<T>(fn: (item: T) => string): (data: T[]) => Record<string, T[]>;
```
```ts
groupBy(users, (u) => u.team); // { alpha: [...], beta: [...] }
```

### `sortBy` — dual
Immutable sort by the returned `number | string` key (original not mutated).
```ts
sortBy<T>(data: T[], fn: (item: T) => number | string): T[];
sortBy<T>(fn: (item: T) => number | string): (data: T[]) => T[];
```
```ts
sortBy(users, (u) => u.age);
```

### `uniq` — unary
Dedupe by `===`, keeping first occurrence.
```ts
uniq<T>(data: T[]): T[];
```
```ts
uniq([1, 1, 2, 3, 3]); // [1, 2, 3]
```

### `uniqBy` — dual
Dedupe by a derived key, keeping first occurrence.
```ts
uniqBy<T, K>(data: T[], fn: (item: T) => K): T[];
uniqBy<T, K>(fn: (item: T) => K): (data: T[]) => T[];
```
```ts
uniqBy(users, (u) => u.id);
```

### `take` — dual
First `count` elements.
```ts
take<T>(data: T[], count: number): T[];
take<T>(count: number): (data: T[]) => T[];
```
```ts
take([1, 2, 3, 4], 2); // [1, 2]
```

### `drop` — dual
All but the first `count` elements.
```ts
drop<T>(data: T[], count: number): T[];
drop<T>(count: number): (data: T[]) => T[];
```
```ts
drop([1, 2, 3, 4], 2); // [3, 4]
```

### `first` — unary
First element (typed as the element type for non-empty tuples, else `T | undefined`).
```ts
first<T>(data: T[]): T | undefined;
```
```ts
first([10, 20]); // 10
```

### `last` — unary
Last element.
```ts
last<T>(data: T[]): T | undefined;
```
```ts
last([10, 20]); // 20
```

---

## Objects

### `pick` — dual
New object with only the given keys.
```ts
pick<T, K extends keyof T>(data: T, keys: readonly K[]): Pick<T, K>;
pick<T, K extends keyof T>(keys: readonly K[]): (data: T) => Pick<T, K>;
```
```ts
pick(user, ["id", "name"]);
```

### `omit` — dual
New object without the given keys.
```ts
omit<T, K extends keyof T>(data: T, keys: readonly K[]): Omit<T, K>;
omit<T, K extends keyof T>(keys: readonly K[]): (data: T) => Omit<T, K>;
```
```ts
omit(user, ["password"]);
```

### `keys` — unary
Own string keys (typed `(keyof T & string)[]`).
```ts
keys<T extends object>(data: T): (keyof T & string)[];
```
```ts
keys({ a: 1, b: 2 }); // ["a", "b"]
```

### `values` — dual
Own values.
```ts
values<T extends object>(v: T): Values<T>;
values(): <T extends object>(v: T) => Values<T>;
```
```ts
values({ a: 1, b: 2 }); // [1, 2]
```

### `entries` — unary
`[key, value]` pairs.
```ts
entries<T extends object>(data: T): [keyof T & string, T[keyof T]][];
```
```ts
entries({ a: 1 }); // [["a", 1]]
```

### `mapValues` — dual
Transform each value, keeping keys.
```ts
mapValues<T, U>(data: T, fn: (v: T[keyof T], key: keyof T & string, data: T) => U): Record<keyof T & string, U>;
mapValues<T, U>(fn: (v: T[keyof T], key: keyof T & string, data: T) => U): (data: T) => Record<keyof T & string, U>;
```
```ts
mapValues({ a: 1, b: 2 }, (n) => n * 10); // { a: 10, b: 20 }
```

### `prop` — dual
Read a property by key. Handy as `map(prop("name"))`.
```ts
prop<T, K extends keyof T>(data: T, key: K): T[K];
prop<T, K extends keyof T>(key: K): (data: T) => T[K];
```
```ts
map(users, prop("name")); // string[]
```

---

## Guards (type predicates — unary)

Each narrows its argument's type. Ideal inside `filter`/`when`.

### `isArray`
```ts
isArray<T>(value: T | readonly unknown[]): value is readonly unknown[];
```
```ts
isArray(x) ? x.length : 0;
```

### `isDate`
```ts
isDate(v: unknown): v is Date;
```
```ts
isDate(v) && v.getTime();
```

### `isDefined`
Not `undefined` (keeps `null`).
```ts
isDefined<T>(value: T): value is Exclude<T, undefined>;
```
```ts
list.filter(isDefined);
```

### `isEmpty`
`""`, `[]`, empty `Map`/`Set`/object.
```ts
isEmpty(value: string): value is "";
isEmpty<T>(value: readonly T[]): value is [];
isEmpty(value: Map | Set | Record<string, unknown>): boolean;
```
```ts
isEmpty([]); // true
```

### `isFunction`
```ts
isFunction<T>(v: Function | T): v is ExactlyFunction<T>;
```
```ts
isFunction(x) && x();
```

### `isNotNull`
Not `null` (keeps `undefined`).
```ts
isNotNull<T>(value: T | null): value is T;
```
```ts
list.filter(isNotNull);
```

### `isNullish`
`null` or `undefined`.
```ts
isNullish<T>(v: T | null | undefined): v is null | undefined;
```
```ts
when(x, isNullish, constant(fallback));
```

### `isNumber`
```ts
isNumber<T>(v: T | number): v is number;
```
```ts
isNumber(x) && x.toFixed(2);
```

### `isString`
```ts
isString<T>(v: T | string): v is string;
```
```ts
isString(x) && x.trim();
```

### `isTruthy`
Excludes `0 | null | undefined | false | ""`.
```ts
isTruthy<T>(v: T): boolean; // narrows out falsy members
```
```ts
list.filter(isTruthy);
```

---

## Function / flow

### `pipe` — value-first composition
Threads a value through a chain of data-last operations, left to right. Fuses
adjacent lazy ops (`map`/`filter`/`forEach`/`tap`) into a single pass.
```ts
pipe<A, B>(value: A, op1: (input: A) => B): B;
pipe<A, B, C>(value: A, op1: (input: A) => B, op2: (input: B) => C): C;
// … up to 15 operations
```
```ts
pipe(
  users,
  filter((u) => u.active),
  sortBy((u) => u.age),
  map(prop("name")),
);
```

### `curry` — internal helper
Wraps an impl so it accepts both data-first and data-last calls (and optional
lazy evaluator). Used to build the dual helpers above; rarely called directly.
```ts
curry(impl, args, lazy?): unknown;
```

### `identity` — unary
Returns its input.
```ts
identity<T>(value: T): T;
```
```ts
map(xs, identity); // shallow copy passthrough
```

### `constant` — factory
Returns a function that always yields `v`.
```ts
constant<T>(v: T): (...args: unknown[]) => T;
```
```ts
when(x, isNullish, constant(0));
```

### `conditional` — data-first, returns an op
Runs the first matching `[when, then]` case. `conditional.defaultCase(fn?)`
provides a catch-all. Throws if nothing matches and no default is given.
```ts
conditional(data, case0, …case9): Return;
conditional(case0, …case9): (data) => Return; // for pipe
conditional.defaultCase(then?): Case;
```
```ts
conditional(
  n,
  [(x) => x < 0, () => "neg"],
  [(x) => x === 0, () => "zero"],
  conditional.defaultCase(() => "pos"),
);
```

### `when` — predicate-first
If `predicate(data)` holds, run `onTrue`; else return data unchanged (or run
`onFalse`). Two-arg form returns a `(data) => …` op for `pipe`.
```ts
when<T>(predicate, onTrue): (data: T) => …;
when<T>(predicate, { onTrue, onFalse }): (data: T) => …;
when<T>(data, predicate, onTrue, ...extraArgs): …;   // eager
```
```ts
pipe(input, when(isNullish, constant(42)));
when(x, (n) => n > 3, { onTrue: add(1), onFalse: (n) => n * 2 });
```

### `tap` — dual, lazy
Run a side effect on the value, return it unchanged. For debugging pipes.
```ts
tap<T>(data: T, fn: (item: T) => void): T;
tap<T>(fn: (item: T) => void): (data: T) => T;
```
```ts
pipe(result, tap(console.log));
```

### `not` — factory
Negates a predicate.
```ts
not<T>(predicate: (value: T) => boolean): (value: T) => boolean;
```
```ts
filter(users, not((u) => u.active)); // inactive users
```

---

## Math

### `add` — dual
Adds two numbers (or two bigints).
```ts
add(target: number, added: number): number;
add(target: number): (added: number) => number;
```
```ts
add(2, 3); // 5
map([1, 2, 3], add(10)); // [11, 12, 13]
```

### `subtract` — dual
Subtracts. Data-last form is `subtract(subtrahend) => (value) => …`.
```ts
subtract(value: number, subtrahend: number): number;
subtract(subtrahend: number): (value: number) => number;
```
```ts
subtract(10, 3); // 7
map([10, 20], subtract(5)); // [5, 15]
```

### `sum` — dual
Sum of a number/bigint iterable.
```ts
sum<T extends Iterable<number>>(data: T): number;
sum(): <T extends Iterable<number>>(data: T) => number;
```
```ts
sum([1, 2, 3]); // 6
pipe(nums, sum());
```

### `clamp` — dual
Clamp within inclusive `{ min?, max? }` bounds.
```ts
clamp(v: number, params: { min?: number; max?: number }): number;
clamp(params: { min?: number; max?: number }): (v: number) => number;
```
```ts
clamp(120, { min: 0, max: 100 }); // 100
map(scores, clamp({ min: 0, max: 100 }));
```

---

## PII masking (unary)

### `maskEmail`
Keeps the first local-part char and the full domain; single-char local → `*`;
no usable local part → fully masked.
```ts
maskEmail(email: string): string;
```
```ts
maskEmail("foxmon1524@gmail.com"); // "f*********@gmail.com"
```

### `maskName`
Reveals only first and last characters (counts by code point).
```ts
maskName(name: string): string;
```
```ts
maskName("홍길동"); // "홍*동"   maskName("남궁민수"); // "남**수"
```

### `maskPhone`
Strips non-digits, keeps leading prefix and last four digits; `<7` digits →
fully masked.
```ts
maskPhone(phone: string): string;
```
```ts
maskPhone("010-1234-1234"); // "010-****-1234"
```

---

## Misc

### `clone` — dual
Deep clone of the input.
```ts
clone<T>(data: T): T;
clone(): <T>(data: T) => T;
```
```ts
const copy = clone(state);
```
