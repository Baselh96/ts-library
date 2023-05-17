import { bolc__Object } from '../../class';
import { InitForm } from '../../class/initForm';
import { FieldError } from '../../model/field-error.model';
import { HTMLInputsType } from '../../type/HTMLInputsType';
import { bol_CheckObjectVisibility } from '../recursive-fun/bol_CheckObjectVisibility';

/**
 * function is responsible for performing block-level field 
 * validation checks within a specified element
 * @param eleId is the ElementId of the page
 * @returns true, is the element is valid and false, if the element has a erroneous field
 */
export function bol_BlockCheck(eleId: string): boolean {
    const element: HTMLElement | null = document.getElementById(eleId);
  
    if (!element) return false;
  
    // Reset the list of erroneous fields
    InitForm.bolSettings._fdsError = [];
  
    // Get all input, select, and textarea fields within the element
    const fields = element.querySelectorAll('input, select, textarea');
  
    // Perform field validation checks
    checkFields(fields);
  
    if (InitForm.bolSettings._fdsError.length > 0) {
      const ele =
        document.getElementById(InitForm.bolSettings._fdsError[0].name) ||
        document.getElementsByName(InitForm.bolSettings._fdsError[0].name)[0];
  
      // Show the error dialog
      InitForm.bolDialog.ShowError();
  
      // Set focus to the first erroneous field (if applicable)
      if (InitForm.bolSettings._modeError != 3) {
        ele.focus();
      }
  
      return false;
    }
    
    return true;
  }
  

/**
 * This function iterates over a collection of fields and
 * performs validation checks based on their type and properties
 * @param fields is a collection of fields
 */
function checkFields(fields: NodeListOf<Element>): void {
  let radiogrp = '';

  for (let i = 0; i < fields.length; i++) {
    const obj = new bolc__Object(
      document.getElementById(fields[i].id) as HTMLInputsType
    );

    // Skip the field if it's not visible
    if (!bol_CheckObjectVisibility(obj._obj)) continue;

    // Skip the field if it's not required
    if (!obj.required) continue;

    // Skip the field if it's a button
    if (obj.type == 'button') continue;

    // Special handling for radio groups
    if (obj.type == 'radio') {
      if (obj.name != radiogrp) radiogrp = obj.name;
    } else radiogrp = '';

    switch (obj.type) {
      case 'radio':
        // ToDo: Implement the getField function and call radioCheckboxHandler accordingly
        // radioCheckboxHandler(this.getField(radiogrp).value == '', obj, true);
        break;
      case 'checkbox':
        // Call radioCheckboxHandler for checkboxes
        radioCheckboxHandler(
          !(obj._obj as HTMLInputElement).checked,
          obj,
          false
        );
        break;
      case 'text':
      case 'textarea':
      case 'password':
      case 'file':
        // Call otherHandler for text-based fields
        otherHandler(obj, 'error_text');
        break;
      case 'listbox':
      case 'select':
      case 'select-one':
      case 'select_multiple':
        // Call otherHandler for select-based fields
        otherHandler(obj, 'error_select');
        break;
      default:
      // Handle any other field types if necessary
    }
  }
}

/**
 * This method is for the switch in the checkFields function for the two object types
 * radio and checkbox
 * @param hasError to see if the Field has an Error
 * @param obj is the corresponding HTML element
 */
function radioCheckboxHandler(
  hasError: boolean,
  obj: bolc__Object,
  isRadio: boolean
): void {
  // Check if the field has an error
  if (hasError) {
    if (isRadio) {
      // For radio buttons, check if the error for the radio group already exists
      if (
        InitForm.bolSettings._fdsError.filter(
          (field) => field.name === obj.name
        ).length <= 0
      ) {
        // Add a new FieldError to the error list
        InitForm.bolSettings._fdsError.push(
          new FieldError(obj.id, obj.label || '')
        );
      }
    } else {
      // For checkboxes, add a new FieldError to the error list
      InitForm.bolSettings._fdsError.push(
        new FieldError(obj.id, obj.label || '')
      );
    }
  }

  // Check if the field's parent node exists
  if (obj._obj.parentNode) {
    // Update the color of the parent node based on the error status
    (obj._obj.parentNode as HTMLElement).style.color = hasError
      ? InitForm.bolSettings._colorErrorBg
      : 'inherit';
  }
}

/**
 * This method is for the switch in the checkFields function for the other object types
 * @param obj is the corresponding HTML element
 * @param msgString is the id for msgString for errors
 */
function otherHandler(obj: bolc__Object, msgString: string): void {
  // Check if the field is empty
  if (obj.isEmpty) {
    // Add a new FieldError to the error list
    InitForm.bolSettings._fdsError.push(
      new FieldError(obj.id, obj.label || '')
    );

    //ToDo: Implementation of the function InputError
    /* InputError(obj._obj, InitForm.bolSettings.GetMsgString(msgString), 0, 0); */
  } else {
    //ToDo: Implementation of the function clearInputError
    // Clear the input error for the field
    /* clearInputError(obj._obj); */
  }
}
