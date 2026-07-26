/** Whole years the shelter has been operating, from its start date to `now`.
 *  Null when there's no (valid) start date. */
export const operatingYears = (operatingSince: string | null, now: Date): number | null => {
  if (!operatingSince) return null;

  const start = new Date(operatingSince);

  if (Number.isNaN(start.getTime())) return null;

  let years = now.getFullYear() - start.getFullYear();
  const beforeAnniversary =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());

  if (beforeAnniversary) years -= 1;

  return Math.max(years, 0);
};
