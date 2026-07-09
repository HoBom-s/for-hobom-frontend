export interface OptionGroup<T> {
  group: string;
  options: T[];
}

/** Case-insensitive substring match on each option's label. */
export function filterOptions<T>(
  options: T[],
  inputValue: string,
  getOptionLabel: (option: T) => string,
): T[] {
  const query = inputValue.trim().toLowerCase();

  if (query === "") return options;

  return options.filter((option) => getOptionLabel(option).toLowerCase().includes(query));
}

/**
 * Bucket options by `groupBy`, preserving the order in which each group first
 * appears and the option order within it.
 */
export function groupOptions<T>(options: T[], groupBy: (option: T) => string): OptionGroup<T>[] {
  const groups: OptionGroup<T>[] = [];
  const byKey = new Map<string, OptionGroup<T>>();

  for (const option of options) {
    const key = groupBy(option);
    let bucket = byKey.get(key);

    if (!bucket) {
      bucket = { group: key, options: [] };
      byKey.set(key, bucket);
      groups.push(bucket);
    }

    bucket.options.push(option);
  }

  return groups;
}
