import { HTMLInputsType } from "../../type/htmlInputsType";
import { bol_GetObjectType } from "../field-element/bol_GetObjectType";

/**
 * This function is used to reset the value of an HTML input field
 * @param field is the field that well be change
 */
export function ResetField(field: HTMLInputsType): void {
    // Get the type of the HTML input field
    const ndtype = bol_GetObjectType(field);
    
    // Reset the field based on its type
    if (ndtype == 'checkbox' || ndtype == 'radio') {
      // For checkboxes and radio buttons, uncheck them
      (field as HTMLInputElement).checked = false;
    } else if (ndtype == 'text' || ndtype == 'file' || ndtype == 'textarea' || ndtype == 'password') {
      // For text, file, textarea, and password inputs, clear the value
      field.value = '';
    } else if (ndtype == 'select') {
      // For select elements, reset the selected value and index
      field.value = '';
      (field as HTMLSelectElement).selectedIndex = -1;
    }
  }
  