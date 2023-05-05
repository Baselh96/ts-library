import { Field } from '../../model/field.model';

/**
 * Check if a given field should not be included in the summary section
 * @param field The field to check
 * @returns true if the field should not be included in the summary, false otherwise
 */
export function FieldNotInSummary(field: Field): boolean {
  if (!field) return false;
  const fieldName = field.id.toLowerCase() || field.name.toLowerCase();
  return window.bolSettings.fieldsNotInSummary.some((name) =>
    fieldName.includes(name.toLowerCase())
  );
}