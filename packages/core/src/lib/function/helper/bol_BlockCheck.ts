import { InitForm } from '../../class/initForm';
import { checkFields } from './checkFields';

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
