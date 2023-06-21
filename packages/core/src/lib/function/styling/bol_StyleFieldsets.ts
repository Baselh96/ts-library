import { bolc__Dialog, bolc__Settings } from '../../class';
import { bolc__Fieldset } from '../../class/bolc__Fieldset';

/**
 * This function is used to style fieldsets within a specific block or the entire page
 * @param BlockOfFields is the name for the element which has fieldsets elements as block and which should be changed
 */
export function bol_StyleFieldsets(
  bolSettings: bolc__Settings,
  bolDialog: bolc__Dialog,
  BlockOfFields?: string,
  bolProject_Refresh?: (id: string, fs_id?: string) => void
): void {
  // Get the fields based on the block identifier or the entire page
  const fields =
    !BlockOfFields || BlockOfFields === ''
      ? document
      : document.getElementById(BlockOfFields);

  // Check if there are no fields or the fields container is not found
  if (!fields) return;

  // Get a list of fieldset elements within the fields container
  const fslist = fields.getElementsByTagName('FIELDSET');

  // Iterate over each fieldset element
  for (let i = 0; i < fslist.length; i++) {
    // Create a new instance of bolc__Fieldset
    const fs = new bolc__Fieldset(bolSettings);
    // Set the fieldset element as the object
    fs._obj = fslist[i] as HTMLElement;
    // Apply the styling to the fieldset using the StyleIt method
    fs.StyleIt(bolDialog, bolProject_Refresh);
  }
}
