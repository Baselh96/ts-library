import { bol_BlockCheck } from "../helper/bol_BlockCheck";
/**
 * This function takes a button element as a parameter and performs some actions related to a fieldset.
 */
export function bolFieldsetCheck(Button: HTMLButtonElement): void {
    // Extract the fieldset ID from the button's ID
    const fs_id = Button.id.substring(Button.id.indexOf('.') + 1);
  
    // Get the element with the extracted fieldset ID
    const e = document.getElementById(fs_id);
  
    // Check if the element exists
    if (!e) return;
  
    // Call the bol_BlockCheck function with the element's ID
    bol_BlockCheck(e.id);
  
    //ToDo: Implement bolProject_Refresh
    /* try {
      bolProject_Refresh(bol_getObjectPage(e).id.substring(4), fs_id);
    } catch (err) {} */
  }
  
