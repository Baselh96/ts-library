/**
 * Returns the alternative string for the given key,
 * if an alternative string is defined in `FieldNamesAlternative`.
 * @param key The key for which an alternative string should be found.
 * @param FieldNamesAlternative An array of alternative key-value pairs.
 * @returns The alternative string if one is defined, otherwise an empty string.
 */
export function getAlternative(
  key: string,
  FieldNamesAlternative: any
): string {
  if (!FieldNamesAlternative) return '';

  const alternative = FieldNamesAlternative.find(
    (item: any) => item[0] === key
  );
  return alternative ? alternative[1] : '';
}
