export type InferGuardType<T, Fallback = never> = T extends (
  x: any,
  ...rest: any
) => x is infer U
  ? U
  : Fallback;
