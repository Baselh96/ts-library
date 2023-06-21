import { bolc__Dialog } from '../../class';
import { checkFields } from './checkFields';
import { bolc__Settings } from '../../class/bolc__Settings';

/**
 * function is responsible for performing block-level field
 * validation checks within a specified element
 * @param eleId is the ElementId of the page
 * @returns true, is the element is valid and false, if the element has a erroneous field
 */
export function bol_BlockCheck(bolSettings: bolc__Settings, bolDialog: bolc__Dialog, eleId: string): boolean {
  const element: HTMLElement | null = document.getElementById(eleId);

  if (!element) return false;

  // Reset the list of erroneous fields
  bolSettings._fdsError = [];

  // Get all input, select, and textarea fields within the element
  const fields = element.querySelectorAll('input, select, textarea');

  // Perform field validation checks
  checkFields(bolSettings, fields);

  if (bolSettings._fdsError.length > 0) {
    const ele =
      document.getElementById(bolSettings._fdsError[0].name) ||
      document.getElementsByName(bolSettings._fdsError[0].name)[0];

    // Show the error dialog
    bolDialog.ShowError();

    // Set focus to the first erroneous field (if applicable)
    if (bolSettings._modeError != 3) {
      ele.focus();
    }

    return false;
  }

  return true;
}
