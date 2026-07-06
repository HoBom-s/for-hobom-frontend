// Matches any type-predicate function to infer its guarded type. The predicate
// parameter must be `any` (a narrower type breaks the `x is U` constraint).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InferGuardType<T, Fallback = never> = T extends (x: any, ...rest: any[]) => x is infer U
  ? U
  : Fallback;
