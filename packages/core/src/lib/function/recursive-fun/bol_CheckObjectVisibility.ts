/**
 * The function checks whether the element is visible or hidden
 * @param obj is the ELement to check.
 * @returns ture if the element is visible
 */
export function bol_CheckObjectVisibility(obj?: any): boolean | undefined {
  // If the object is undefined, return undefined
  if (!obj) return undefined;

  //ToDO: implement this function
  // If the object is a radio button, get the first element of the group
  /*  if (obj.type == 'radio' || obj.type == 'radiobutton')
    obj = getField(obj.name)[0]; */

  // Check if the object is hidden or has display set to none
  if (
    obj.style.visibility == 'hidden' ||
    obj.style.display == 'none' ||
    obj.type == 'hidden'
  ) {
    return false;
  }
  // If the object has a class of "page" or "bootstrap-page", it is visible
  else if (
    obj.getAttribute('class') === 'page' ||
    obj.getAttribute('class') == 'bootstrap-page'
  ) {
    return true;
  }
  // If not, check the parent node
  else {
    return bol_CheckObjectVisibility(obj.parentNode);
  }
}
