import { bolc__Object } from '../../class/bolc__Object';
import { InitForm } from '../../class/initForm';
import { FieldError } from '../../model/field-error.model';
import { HTMLInputsType } from '../../type/htmlInputsType';
import { clearInputError } from '../other-functions/clearInputError';
import { getField } from '../other-functions/getField';
import { InputError } from '../other-functions/inputError';
import { bol_CheckObjectVisibility } from '../recursive-fun/bol_CheckObjectVisibility';
import { radioCheckboxHandler } from './radioCheckboxHandler';

/**
 * This function iterates over a collection of fields and
 * performs validation checks based on their type and properties
 * @param fields is a collection of fields
 */
export function checkFields(fields: NodeListOf<Element>): void {
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
      case 'radio': {
        const field = getField(radiogrp) as RadioNodeList;
        if (field) radioCheckboxHandler(field.value == '', obj, true);
        break;
      }
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

    InputError(
      obj._obj as HTMLElement,
      InitForm.bolSettings.GetMsgString(msgString),
      0,
      0
    );
  } else {
    // Clear the input error for the field
    clearInputError(obj._obj as HTMLElement);
  }
}
