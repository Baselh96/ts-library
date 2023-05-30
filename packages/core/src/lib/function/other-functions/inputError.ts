import { getInfieldErrorElement } from "./getInfieldErrorElement";
import { getLabelOfElement } from "./getLabelOfElement";

/*
  This routine displays an input error

  focusMode == 0: The focus goes to next element after error display
  focusMode == 1: The focus soes to bad element after error display

  clearMode == 0: The element is not changed after error display
  clearMode == 1: The bad element is cleared after error display
*/
export function InputError(
  element: HTMLElement,
  text: string,
  focusMode: number,
  clearMode: number
) {
  // Add error class to input element
  element.classList.add('input-with-error');

  // If a label is associated with the element, add error class to it
  const label = getLabelOfElement(element);
  if (label) label.classList.add('label-with-error');

  /*
	  If threre is a corresponding infield error element,
	  display error text here and do not leave field.
	*/
  const errelem = getInfieldErrorElement(element);
  if (errelem) {
    errelem.innerHTML = text;

    // On "focus mode", set cursor to affected field
    if (focusMode == 1) setTimeout(focusToElement, 200);

    return;
  }

  // Display error as alert
  alert(text);

  // On "clear mode" is set, reset field input
  if (clearMode == 1 && element instanceof HTMLInputElement) element.value = '';

  // On "focus mode", set cursor to affected field after error display
  if (focusMode == 1) setTimeout(focusToElement, 200);

  function focusToElement() {
    element.focus();
  }
}
