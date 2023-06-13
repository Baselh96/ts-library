import { InitForm } from '../../class/initForm';
import { bolClear } from '../objects/bolClear';

/**
 * Deactivates the specified page by updating its usable and hiding the associated button.
 * @param pageNo - The number of the page to be deactivated.
 */
export function bolPageDeactivate(pageNo: number) {
  // Check if pageNo is within the valid range
  if (pageNo < 1 || pageNo > InitForm.bolPage.max) {
    return; // Return early if the pageNo is invalid
  }

  // Mark the page as not usable by setting the corresponding flag to false
  InitForm.bolSettings._usablePages[pageNo - 1] = false;

  try {
    // Attempt to hide the button for the specified page
    InitForm.bolSteps.buttonHide(pageNo);
  } catch (err) {
    // eslint-disable-next-line no-console
  }

  // Clear the object associated with the specified page
  bolClear('page' + pageNo);
}
