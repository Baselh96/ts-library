import { bolc__Settings } from '../../class';
import { Field } from '../../model/field.model';

/**
 * Check if a given field should not be included in the summary section
 * @param field The field to check
 * @param field is an object of type bolc__Settings
 * @returns true if the field should not be included in the summary, false otherwise
 */
export function FieldNotInSummary(field: Field, bolSettings: bolc__Settings): boolean {
  if (!field) return false;
  const fieldName = field.id.toLowerCase() || field.name.toLowerCase();
  return bolSettings.fieldsNotInSummary.some((name) =>
    fieldName.includes(name.toLowerCase())
  );
}