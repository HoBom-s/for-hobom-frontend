import { curry } from "../curry/curry";

interface Params {
  readonly min?: number;
  readonly max?: number;
}

/**
 * Clamp the given value within the inclusive min and max bounds.
 *
 * @param v - The parameter of clamp.
 * @param params - The min max values.
 *
 * @category Number
 */
export function clamp(v: number, params: Params): number;
export function clamp(params: Params): (v: number) => number;
export function clamp(...args: ReadonlyArray<unknown>): unknown {
  return curry(clampImpl, args);
}

function clampImpl(v: number, params: Params): number {
  const { min, max } = params;

  if (min != null && v < min) {
    return min;
  }

  if (max != null && v > max) {
    return max;
  }

  return v;
}
