import { bolc__Settings } from '../../class';
import { getAlternative } from './getAlternative';

/**
 * Returns the title of the field represented by the given element.
 * @param obj The element representing the field.
 * @returns The title of the field.
 */

export function bol_GetFieldTitle(bolSettings: bolc__Settings, obj: HTMLElement): string {
  // Radio buttons should have the same title as the first element in the group.
  if (
    obj instanceof HTMLInputElement &&
    (obj.type === 'radio' || obj.type === 'radiobutton')
  ) {
    obj = document.getElementsByName(obj.name)[0];
  }

  // Try to find an alternative name.
  let s =
    obj instanceof HTMLInputElement && bolSettings
      ? getAlternative(obj.name, bolSettings.FieldNamesAlternative)
      : '';

  // Use the field title if no alternative name was found.
  if (s.length === 0 && obj.title) {
    s = obj.title;
  }

  // Use the field ID if no field title or alternative label was found.
  if (s.length === 0) {
    s = obj.id;
  }

  return s;
}
