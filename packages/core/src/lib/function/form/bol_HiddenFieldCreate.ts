import { findBolHiddenField } from '../helper/findBolHiddenField';

/**
 * Creates or updates a hidden field with the specified name and value.
 * @param fname - The name of the hidden field.
 * @param fvalue - The value to be set for the hidden field.
 * @returns A boolean indicating whether the operation was successful.
 */
export function bol_HiddenFieldCreate(fname: string, fvalue: string): boolean {
  // Check if the container element for hidden fields exists
  const r = findBolHiddenField();

  // If the container element is still not found, return false
  if (!r) return false;

  // Check if the hidden field already exists
  let e = document.getElementById(fname) as HTMLInputElement;
  if (e == undefined) {
    // If the hidden field doesn't exist, create it and set its properties
    e = document.createElement('input');
    e.id = fname;
    e.name = fname;
    e.type = 'hidden';
    e.className = 'form-control';
    e.setAttribute('value', fvalue);
    r.appendChild(e);
  } else {
    // If the hidden field already exists, update its value
    e.value = fvalue;
  }

  return true;
}
