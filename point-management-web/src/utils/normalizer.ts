/**
 * Safely extracts a value from an object using a prioritized list of possible keys.
 * Returns the defaultValue if none of the keys exist or if the value is null/undefined.
 */
export function getValueByKeys<T>(
  obj: object | null | undefined,
  keys: string[],
  defaultValue: T,
): T {
  if (!obj || typeof obj !== "object") return defaultValue;

  for (const key of keys) {
    const value = (obj as Record<string, any>)[key];
    if (value !== undefined && value !== null) {
      return value as T;
    }
  }

  return defaultValue;
}
