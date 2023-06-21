import { IsTypeValid } from '../helper/isTypeValid';
import { getField } from '../other-functions/getField';
import { bolc__Settings } from '../../class/bolc__Settings';

/**
 * This method is used to get the ErrorCode from the Field corresponding to the passed fieldname.
 * @param fieldname is the name of the field to be changed
 * @returns is the error code
 */
export function bol_FileCheck(bolSettings: bolc__Settings, fieldname: string): number {
  let myError = 0; // Initialize error code
  let fSizes = 0; // Total file sizes

  const field = getField(fieldname) as HTMLInputElement; // Get the file field element

  if (!field) return 0; // Return 0 if the field is not found

  const fileCount = field.files?.length || 0; // Get the number of selected files

  for (let i = 0; i < fileCount; i++) {
    const file = field?.files?.[i]; // Get the current file

    const fieldSize = file ? file.size : 0; // Get the file size (or 0 if file is undefined)

    fSizes += fieldSize; // Add the file size to the total sizes

    // Check if file size exceeds the maximum allowed size
    if (
      (bolSettings.FileMaxSize as number) <
      fieldSize / 1024 / 1024
    ) {
      myError = fileCount > 1 ? 2 : 1; // Set appropriate error code (2 for multiple files, 1 for single file)
      break; // Exit the loop
    }

    // Check if file type is valid
    if (!IsTypeValid(bolSettings, file)) {
      myError = fileCount > 1 ? 4 : 3; // Set appropriate error code (4 for multiple files, 3 for single file)
      break; // Exit the loop
    }
  }

  // Check if total file sizes exceed the maximum allowed size
  if ((bolSettings.FileMaxSize as number) < fSizes / 1024 / 1024)
    myError = 5;

  if (myError === 0) {
    // Call the appropriate function to update files (replace with the actual function)
    bolSettings.UpdateFiles(fieldname, field?.files?.[0].name, fSizes);
  }

  return myError; // Return the error code
}
