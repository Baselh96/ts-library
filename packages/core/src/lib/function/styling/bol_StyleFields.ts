import { bolc__Object } from '../../class/bolc__Object';
import { HTMLInputsType } from '../../type/htmlInputsType';
import { bolc__Settings } from '../../class/bolc__Settings';
import { bolc__Dialog } from '../../class';
/**
 * This function is used to style fields within a specific block or the entire page.
 * @param BlockOfFields is the name for the element which has other elements as block and which should be changed
 */
export function bol_StyleFields(bolSettings: bolc__Settings, bolDialog: bolc__Dialog, BlockOfFields?: string): void {
  // Get the fields based on the block identifier or the entire page
  const fields =
    !BlockOfFields || BlockOfFields === ''
      ? document.querySelectorAll('input, select, textarea')
      : document
          .getElementById(BlockOfFields)
          ?.querySelectorAll('input, select, textarea');

  // Check if there are no fields or the field collection is empty
  if (!fields || fields.length <= 0) return;

  // Iterate over each field element
  fields.forEach((e) => {
    // Create a new instance of bolc__Object passing the field element
    const myObj = new bolc__Object(bolSettings, e as HTMLInputsType);
    // Apply the styling to the field using the StyleIt method
    myObj.StyleIt(bolDialog);
  });
}
