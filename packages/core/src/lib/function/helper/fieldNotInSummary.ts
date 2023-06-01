import { bolc__Settings } from '../../class';

/**
 * Check if a given field should not be included in the summary section
 * @param field The field to check
 * @param bolSettings is an object of type bolc__Settings
 * @returns true if the field should not be included in the summary, false otherwise
 */
export function FieldNotInSummary(field: HTMLElement, bolSettings: bolc__Settings): boolean {
  if (!field ) return false;
  const fieldName = field.id.toLowerCase() || (field as any).name.toLowerCase();
  return bolSettings.fieldsNotInSummary.some((name) =>
    fieldName.includes(name.toLowerCase())
  );
}