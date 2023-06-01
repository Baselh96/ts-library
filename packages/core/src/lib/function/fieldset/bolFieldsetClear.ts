import { bolc__Object } from '../../class';

/**
 * This  function takes a button element as a parameter and performs actions to clear the inputs within a fieldset.
 */
export function bolFieldsetClear(Button: HTMLButtonElement) {
    // Extract the fieldset ID from the button's ID
    const fs_id = Button.id.substring(Button.id.indexOf('.') + 1);
    
    // Get the element with the extracted fieldset ID
    const e = document.getElementById(fs_id);
  
    // Check if the element exists
    if (!e) return;
  
    // Create a new bolc__Object instance with the element as an HTMLInputElement
    // and call the Clear() method to clear the inputs within the fieldset
    new bolc__Object(e as HTMLInputElement).Clear();
  
    //ToDo: Implement bolProject_Clear
    /* try {
      bolProject_Clear(bol_getObjectPage(e).id.substring(4), fs_id);
    } catch (err) {} */
  }
  
