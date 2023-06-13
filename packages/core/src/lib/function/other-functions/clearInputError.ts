import { getInfieldErrorElement } from "./getInfieldErrorElement";
import { getLabelOfElement } from "./getLabelOfElement";

/*
  Clear all kind of error displays of an input element.
  
  The error class is removed from the element itself
  The error class is removed from any corresponding labels
  The infield error diaplayis cleared, if there is any.
*/
export function clearInputError(element: HTMLElement) {
  // Remove erorr class from input element
  element.classList.remove('input-with-error');

  // If a label is associated with the input field, remove error class from it
  const label = getLabelOfElement(element);
  if (label) label.classList.remove('label-with-error');

  // If there is a corresponding infield error div, clear it
  const errelem = getInfieldErrorElement(element);
  if (errelem) errelem.innerHTML = '';

  if (element.hasAttribute('hasError'))
    element.setAttribute('hasError', 'false');
}
