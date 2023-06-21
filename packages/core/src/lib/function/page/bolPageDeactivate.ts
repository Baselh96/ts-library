import { bolc__Page } from '../../class';
import { InitForm } from '../../class/initForm';
import { bolClear } from '../objects/bolClear';

/**
 * Deactivates the specified page by updating its usable and hiding the associated button.
 * @param pageNo - The number of the page to be deactivated.
 */
export function bolPageDeactivate(initForm: InitForm, pageNo: number) {
  // Check if pageNo is within the valid range
  if (pageNo < 1 || pageNo > bolc__Page.getMax()) {
    return; // Return early if the pageNo is invalid
  }

  // Mark the page as not usable by setting the corresponding flag to false
  initForm.bolSettings._usablePages[pageNo - 1] = false;

  try {
    // Attempt to hide the button for the specified page
    initForm.bolSteps.buttonHide(pageNo);
  } catch (err) {
    // eslint-disable-next-line no-console
  }

  // Clear the object associated with the specified page
  bolClear(initForm.bolSettings, 'page' + pageNo);
}
