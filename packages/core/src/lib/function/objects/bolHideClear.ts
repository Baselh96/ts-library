import { bolClear } from './bolClear';
import { bolHide } from './bolHide';
import { bolShow } from './bolShow';
import { getField } from '../other-functions/getField';

export function bolHideClear(
  oname1: string,
  oname2?: string,
  val2Show?: string
): void {
  // Find the element with the specified oname1
  const element1 =
    document.getElementById(oname1) || (getField(oname1) as HTMLElement);

  // If the element is not found, return immediately
  if (!element1) {
    return;
  }

  // Check if the element is a div, fieldset, or oname2 is not provided
  const isContainerElement =
    element1.tagName.toLowerCase() === 'div' ||
    element1.tagName.toLowerCase() === 'fieldset';

  if (isContainerElement || !oname2) {
    bolHideAndClear(oname1);
    return;
  }

  // Check if the element is an HTMLInputElement of type checkbox
  if (element1 instanceof HTMLInputElement && element1.type === 'checkbox') {
    handleCheckboxInput(element1, oname2, val2Show);
  } else {
    if (val2Show === undefined) {
      // If val2Show is not provided, return immediately
      return;
    }
    if (
      element1 instanceof HTMLInputElement &&
      element1.value.toLowerCase() == val2Show.toLowerCase()
    ) {
      // If the value of the element matches val2Show (case-insensitive), show the element specified by oname2
      bolShow(oname2);
    } else {
      // If the value of the element does not match val2Show, hide and clear the element specified by oname2
      bolHideAndClear(oname2);
    }
  }
}

function handleCheckboxInput(
  checkbox: HTMLInputElement,
  oname2?: string,
  val2Show?: string
): void {
  if (checkbox.checked) {
    if (val2Show === undefined) {
      bolShow(oname2 || '');
    } else {
      bolHideAndClear(oname2);
    }
  } else {
    if (val2Show === undefined) {
      bolHideAndClear(oname2);
    } else {
      bolShow(oname2 || '');
    }
  }
}

/**
 * To Hide and clear the element
 */
function bolHideAndClear(elementId?: string): void {
  if (elementId) {
    bolHide(elementId);
    bolClear(elementId);
  }
}
