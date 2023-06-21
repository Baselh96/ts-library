import { bolc__Page } from '../../class';
import { InitForm } from '../../class/initForm';

export function bolPageActivate(initForm: InitForm, pageNo: number) {
    // Check if pageNo is within the valid range
    if (pageNo < 1 || pageNo > bolc__Page.getMax()) {
      return; // Return early if the pageNo is invalid
    }
  
    // Mark the page as usable by setting the corresponding flag to true
    initForm.bolSettings._usablePages[pageNo - 1] = true;
  
    try {
      // Attempt to show the button for the specified page
      initForm.bolSteps.buttonShow(pageNo);
    } catch (err) {
      // eslint-disable-next-line no-console
    }
  }
  
