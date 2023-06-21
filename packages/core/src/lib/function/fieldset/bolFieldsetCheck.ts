import { bolc__Dialog, bolc__Settings } from '../../class';
import { bol_BlockCheck } from '../helper/bol_BlockCheck';
import { bol_getObjectPage } from '../recursive-fun/bol_getObjectPage';
/**
 * This function takes a button element as a parameter and performs some actions related to a fieldset.
 */
export function bolFieldsetCheck(
  bolSettings: bolc__Settings,
  bolDialog: bolc__Dialog,
  Button: HTMLButtonElement,
  bolProject_Refresh?: (id: string, fs_id?: string) => void
): void {
  // Extract the fieldset ID from the button's ID
  const fs_id = Button.id.substring(Button.id.indexOf('.') + 1);

  // Get the element with the extracted fieldset ID
  const e = document.getElementById(fs_id);

  // Check if the element exists
  if (!e) return;

  // Call the bol_BlockCheck function with the element's ID
  bol_BlockCheck(bolSettings, bolDialog, e.id);

  if (bolProject_Refresh)
    bolProject_Refresh(
      (bol_getObjectPage(e) as HTMLElement).id.substring(4),
      fs_id
    );
}
