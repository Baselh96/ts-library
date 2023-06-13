import { findBolHiddenField } from "../helper/findBolHiddenField";

/**
 * Removes a hidden field with the specified name from the container element.
 * @param fname The name of the hidden field to be removed.
 * @returns A boolean indicating whether the operation was successful.
 */
export function bol_HiddenFieldRemove(fname: string): boolean {
    // Check if the container element for hidden fields exists
    const r = findBolHiddenField();
  
    // If the container element is still not found, return false
    if (!r) return false;
  
    // Find the hidden field element by its id
    const e = document.getElementById(fname);
  
    // If the hidden field element is not found, return false
    if (!e) return false;
  
    // Iterate over the child nodes of the container element
    for (let i = 0; i < r.childNodes.length; i++) {
      // Check if the current child node has the matching id
      if ((r.childNodes[i] as HTMLElement).id === fname) {
        // Remove the matching child node from the container element
        r.removeChild(r.childNodes[i]);
        break;
      }
    }
  
    // Return true to indicate successful removal
    return true;
  }
  