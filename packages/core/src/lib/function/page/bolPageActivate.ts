import { InitForm } from '../../class/initForm';

export function bolPageActivate(pageNo: number) {
    // Check if pageNo is within the valid range
    if (pageNo < 1 || pageNo > InitForm.bolPage.max) {
      return; // Return early if the pageNo is invalid
    }
  
    // Mark the page as usable by setting the corresponding flag to true
    InitForm.bolSettings._usablePages[pageNo - 1] = true;
  
    try {
      // Attempt to show the button for the specified page
      InitForm.bolSteps.buttonShow(pageNo);
    } catch (err) {
      // eslint-disable-next-line no-console
    }
  }
  
