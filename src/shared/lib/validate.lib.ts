import { ZodSchema } from "zod";

export const validateWithZod =
  <T>(schema: ZodSchema<T>) =>
  (input: unknown): T | Error => {
    const parsed = schema.safeParse(input);
    return parsed.success
      ? parsed.data
      : new Error(parsed.error.issues.map((i) => i.message).join(", "));
  };

export const handleValidationResult = <T>(
  result: T | Error,
  onError: (err: Error) => void,
  onSuccess: (value: T) => void,
): void => {
  if (result instanceof Error) {
    onError(result);
    return;
  }
  onSuccess(result);
};
