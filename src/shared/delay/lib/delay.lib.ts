export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const delayThen = <T>(ms: number, fn: () => Promise<T>): Promise<T> =>
  delay(ms).then(fn);
