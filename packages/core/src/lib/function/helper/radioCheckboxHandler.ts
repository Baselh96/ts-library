import { bolc__Object, bolc__Settings } from '../../class';
import { FieldError } from '../../model/field-error.model';

/**
 * This method is for the switch in the checkFields function for the two object types
 * radio and checkbox
 * @param hasError to see if the Field has an Error
 * @param obj is the corresponding HTML element
 */
export function radioCheckboxHandler(
  bolSettings: bolc__Settings,
  hasError: boolean,
  obj: bolc__Object,
  isRadio: boolean
): void {
  // Check if the field has an error
  if (hasError) {
    if (isRadio) {
      // For radio buttons, check if the error for the radio group already exists
      if (
        bolSettings._fdsError.filter(
          (field) => field.name === obj.name
        ).length <= 0
      ) {
        // Add a new FieldError to the error list
        bolSettings._fdsError.push(
          new FieldError(obj.id, obj.label || '')
        );
      }
    } else {
      // For checkboxes, add a new FieldError to the error list
      bolSettings._fdsError.push(
        new FieldError(obj.id, obj.label || '')
      );
    }
  }

  // Check if the field's parent node exists
  if (obj._obj?.parentNode) {
    // Update the color of the parent node based on the error status
    (obj._obj.parentNode as HTMLElement).style.color = hasError
      ? bolSettings._colorErrorBg
      : 'inherit';
  }
}
