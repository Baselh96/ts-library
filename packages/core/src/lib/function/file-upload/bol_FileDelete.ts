import { getField } from '../other-functions/getField';
import { bolc__Settings } from '../../class/bolc__Settings';

/**
 * This function is used to delete a file input field's value and update the files in the bolSettings
 * @param fieldId is the id for the to deleted field
 */
export function bol_FileDelete(bolSettings: bolc__Settings, fieldId?: string): void {
  // Check if fieldId is empty or not provided
  if (!fieldId || fieldId.length === 0) return;

  // Update files in bolSettings
  bolSettings.UpdateFiles(fieldId);

  // Get the field element with the specified fieldId
  const field = getField(fieldId);

  // Check if the field element exists
  if (field) {
    // Clear the value of the field by setting it to an empty string
    (field as HTMLInputElement | RadioNodeList).value = '';
  }
}
